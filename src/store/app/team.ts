import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { Epic, Selector } from '..';
import {
  apiDeleteTeam,
  apiRequestStudentsForTeam,
  apiRequestTeamByUserAndJF,
  apiTeamRegistration
} from '../../services/api';
import { getUser } from './state';

// SELECTORS
export const selectTeamList: Selector<[]> = ({ teamReducer }) => teamReducer.teamList;
export const selectStudentsList: Selector<[]> = ({ teamReducer }) => teamReducer.studentsList;
export const selectIsTeamRegistration: Selector<boolean> = ({ teamReducer }) => teamReducer.isTeamRegistration;

// ACTIONS
const actionCreator = actionCreatorFactory('APP::TEAM');
export const requestTeamByUserAndJF = actionCreator.async<any, any, any>('REQUEST_TEAM_BY_USER_AND_JF');
export const teamRegistration = actionCreator.async<any, any, any>('TEAM_REGISTRATION');
export const deleteTeam = actionCreator.async<any, any, any>('DELETE_TEAM');
export const requestStudentsForTeam = actionCreator.async<any, any, any>('REQUEST_STUDENTS_FOR_TEAM');
export const setIsTeamRegistration = actionCreator('IS_TEAM_REGISTRATION');

// STATE
export interface IState {
  teamList: [],
  studentsList: [],
  isTeamRegistration: boolean,
}

const INITIAL_STATE: IState = {
  teamList: [],
  studentsList: [],
  isTeamRegistration: false,
};

// REDUCER
export default reducerWithInitialState(INITIAL_STATE)
  .case(requestTeamByUserAndJF.done, (state: IState, { result: teamList }) => ({
    ...state,
    teamList,
  }))
  .case(requestStudentsForTeam.done, (state: IState, { result: studentsList }) => ({
    ...state,
    studentsList,
  }))
  .cases([teamRegistration.done, deleteTeam.done, setIsTeamRegistration], (state: IState) => ({
    ...state,
    isTeamRegistration: !state.isTeamRegistration,
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

  const requestStudentsForTeamEpic: Epic = (action$) => action$.pipe(
    filter(requestStudentsForTeam.started.match),
    mergeMap(({ payload }) => from(apiRequestStudentsForTeam(payload)).pipe(
      map((studentsList) => (requestStudentsForTeam.done({ result: studentsList.alunos })),
        catchError((error) => of(requestStudentsForTeam.failed({ error }))),
      )),
    ));

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
  requestStudentsForTeamEpic,
  // requestTeamByUserAndJFEpic2,
  // requestTeamByUserAndJFEpic3,
  TeamRegistrationEpic,
  deleteTeamEpic,
);
