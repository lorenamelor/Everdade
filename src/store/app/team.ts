import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { Epic, Selector } from '..';
import {
  apiDeleteTeam,
  apiRequestTeamByUserAndJF,
  apiTeamRegistration,
} from '../../services/api';
import { getUser } from './state';

// SELECTORS
export const selectTeamList: Selector<[]> = ({ teamReducer }) => teamReducer.teamList;

// ACTIONS
const actionCreator = actionCreatorFactory('APP::TEAM');
export const requestTeamByUserAndJF = actionCreator.async<any, any, any>('REQUEST_TEAM_BY_USER_AND_JF');
export const teamRegistration = actionCreator.async<any, any, any>('TEAM_REGISTRATION');
export const deleteTeam = actionCreator.async<any, any, any>('DELETE_TEAM');


// STATE
export interface IState {
  teamList: {},
}

const INITIAL_STATE: IState = {
  teamList: {},
};

// REDUCER
export default reducerWithInitialState(INITIAL_STATE)
  .case(requestTeamByUserAndJF.done, (state: IState, { result: teamList }) => ({
    ...state,
    teamList,
  }))
  .build();


// EFFECTS
const requestTeamByUserAndJFEpic: Epic = (action$) => action$.pipe(
  filter(requestTeamByUserAndJF.started.match),
  mergeMap((jfId) => from(apiRequestTeamByUserAndJF(getUser('id_usuario'), jfId.payload)).pipe(
    map((teamList) => (requestTeamByUserAndJF.done({ result: teamList })),
      catchError((error) => of(requestTeamByUserAndJF.failed({ error }))),
    )),
  ));

// const requestTeamByUserAndJFEpic2: Epic = (action$) => action$.pipe(
//   filter(teamRegistration.done.match),
//   mergeMap((jfId) => from(apiRequestTeamByUserAndJF(getUser('id_usuario'), jfId.payload)).pipe(
//     map((teamList) => (requestTeamByUserAndJF.done({ result: teamList })),
//       catchError((error) => of(requestTeamByUserAndJF.failed({ error }))),
//     )),
//   ));

// const requestTeamByUserAndJFEpic3: Epic = (action$) => action$.pipe(
//   filter(deleteTeam.done.match),
//   mergeMap((jfId) => from(apiRequestTeamByUserAndJF(getUser('id_usuario'), jfId.payload)).pipe(
//     map((teamList) => (requestTeamByUserAndJF.done({ result: teamList })),
//       catchError((error) => of(requestTeamByUserAndJF.failed({ error }))),
//     )),
//   ));

const TeamRegistrationEpic: Epic = (action$) => action$.pipe(
  filter(teamRegistration.started.match),
  mergeMap(({ payload }) => from(apiTeamRegistration(payload)).pipe(
    map(({ data }) => teamRegistration.done({ params: { ...payload }, result: { data } })),
    catchError((error) => of(teamRegistration.failed({ params: { ...payload }, error }))),
  )),
);

const deleteTeamEpic: Epic = (action$) => action$.pipe(
  filter(deleteTeam.started.match),
  mergeMap((idTeam) => from(apiDeleteTeam(getUser('id_usuario'), idTeam.payload)).pipe(
    map(({ data }) => deleteTeam.done({ params: { idTeam }, result: { data } })),
    catchError((error) => of(deleteTeam.failed({ params: { idTeam }, error }))),
  )),
);

export const epics = combineEpics(
  requestTeamByUserAndJFEpic,
  // requestTeamByUserAndJFEpic2,
  // requestTeamByUserAndJFEpic3,
  TeamRegistrationEpic,
  deleteTeamEpic,
);
