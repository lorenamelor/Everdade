import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { Epic, Selector } from '..';
import { apiRequestUnits } from '../../services/api';

// SELECTORS
export const selectUnits: Selector<[]> = ({ classReducer }) => classReducer.units;


export interface IUserSignUp {curso?
	:string; email:string; login:string; nome: string; senha: string; tipo:string }

// ACTIONS
const actionCreator = actionCreatorFactory('APP::STATE');
export const requestUnits = actionCreator.async<undefined, any>('REQUEST_UNIT');

// STATE
export interface IState {
	units: [];
}

const INITIAL_STATE: IState = {
	units: [],
};

// REDUCER
export default reducerWithInitialState(INITIAL_STATE)
	.case(requestUnits.done, (state: IState, { result: units }) => ({
		...state,
		units,
	}))
	.build();

// EFFECTS
const requestUnitsEpic: Epic = (action$) => action$.pipe(
	filter(requestUnits.started.match),
	mergeMap(() => from(apiRequestUnits()).pipe(
		map((units) => (requestUnits.done({ result: units })),
		catchError((error) => of(requestUnits.failed({ error }))),
	)),
));

export const epics = combineEpics(
	requestUnitsEpic,
);
