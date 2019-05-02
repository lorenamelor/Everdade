import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { Epic, Selector } from '..';
import { apiDeleteJF,
				apiJFEdit,
				apiJFRegistration,
				apiRequestJFByClassId,
				apiRequestJFById,
} from '../../services/api';
// import { getUser } from './state';

// SELECTORS
export const selectIsJFRegistration: Selector<boolean> = ({ jfReducer }) => jfReducer.isJFRegistration;
export const selectJFById: Selector<IClass> = ({ jfReducer }) => jfReducer.JFById;
export const selectJFByClassId: Selector<IClass> = ({ jfReducer }) => jfReducer.JFByClassId;

export interface IUserSignUp {curso?
	:string; email:string; login:string; nome: string; senha: string; tipo:string }

export interface IClass {
	curso_id_curso: string,
	disciplina: string,
	id_turma: string,
	nome: string,
	professor_id_professor: string,
	unidade_id_unidade: string,
}

// ACTIONS
const actionCreator = actionCreatorFactory('APP::STATE');
export const requestJFByClassId = actionCreator.async<any, any, any>('REQUEST_JF_BY_CLASS_ID');
export const JFRegistration = actionCreator.async<any, any, any>('JF_REGISTRATION');
export const requestJFById = actionCreator.async<any, any, any>('REQUEST_JF_BY_ID');
export const JFEdit = actionCreator.async<any, any, any>('JF_EDIT');
export const deleteJF = actionCreator.async<any, any, any>('DELETE_CLASS');


// STATE
export interface IState {
	isJFRegistration: boolean;
	JFById: {};
	JFByClassId: [],
}

const INITIAL_STATE: IState = {
	isJFRegistration: false,
	JFById: {},
	JFByClassId: [],
};

// REDUCER
export default reducerWithInitialState(INITIAL_STATE)
	.cases([JFRegistration.started,
		JFRegistration.done, 
		JFRegistration.failed,
		JFEdit.started, 
		JFEdit.done, 
		JFEdit.failed], (state: IState) => ({
		...state,
		isJFRegistration: !state.isJFRegistration,
	}))
	.case(requestJFById.done, (state: IState, { result: JFById }) => ({
		...state,
		JFById,
	}))
	.case(requestJFByClassId.done, (state: IState, { result: JFByClassId }) => ({
		...state,
		JFByClassId,
	}))
	.build();

// EFFECTS

const requestJFByClassIdEpic: Epic = (action$, state$) => action$.pipe(
	filter(requestJFByClassId.started.match),
	mergeMap(() => from(apiRequestJFByClassId(state$.value.classReducer.currentIdClass)).pipe(
		map((JFByClassId) => (requestJFByClassId.done({ result: JFByClassId })),
		catchError((error) => of(requestJFByClassId.failed({ error }))),
	)),
));

const requestJFByClassIdEpic2: Epic = (action$, state$) => action$.pipe(
	filter(deleteJF.done.match),
	mergeMap(() => from(apiRequestJFByClassId(state$.value.classReducer.currentIdClass)).pipe(
		map((JFByClassId) => (requestJFByClassId.done({ result: JFByClassId })),
		catchError((error) => of(requestJFByClassId.failed({ error }))),
	)),
));

// const requestJFByClassIdEpic3: Epic = (action$) => action$.pipe(
// 	filter(JFEdit.done.match),
// 	mergeMap(() => from(apiRequestJFByClassId(1)).pipe(
// 		map((JFByClassId) => (requestJFByClassId.done({ result: JFByClassId })),
// 		catchError((error) => of(requestJFByClassId.failed({ error }))),
// 	)),
// ));

/************************************************** */
const JFRegistrationEpic: Epic = (action$) => action$.pipe(
	filter(JFRegistration.started.match),
	mergeMap(({payload}) => from(apiJFRegistration(payload)).pipe(
		map(({ data }) => JFRegistration.done({ params: { ...payload }, result: { data }})),
		catchError((error) => of(JFRegistration.failed({ params: { ...payload }, error }))),
	)),
);

const requestJFByIdEpic: Epic = (action$) => action$.pipe(
	filter(requestJFById.started.match),
	mergeMap((idJF) => from(apiRequestJFById(idJF.payload)).pipe(
		map((JFById) => (requestJFById.done({ result: JFById })),
		catchError((error) => of(requestJFById.failed({ error }))),
	)),
));

const JFEditEpic: Epic = (action$) => action$.pipe(
	filter(JFEdit.started.match),
	mergeMap(({payload}) => from(apiJFEdit(payload)).pipe(
		map(({ data }) => JFEdit.done({ params: { ...payload }, result: { data }})),
		catchError((error) => of(JFEdit.failed({ params: { ...payload }, error }))),
	)),
);


const deleteJFEpic: Epic = (action$) => action$.pipe(
	filter(deleteJF.started.match),
	mergeMap((idJF) => from(apiDeleteJF(idJF.payload)).pipe(
		map(({ data }) => deleteJF.done({ params: { idJF }, result: { data }})),
		catchError((error) => of(deleteJF.failed({ params: { idJF }, error }))),
	)),
);

export const epics = combineEpics(
	JFRegistrationEpic,
	requestJFByIdEpic,
	JFEditEpic,
	requestJFByClassIdEpic,
	requestJFByClassIdEpic2,
	// requestJFByClassIdEpic3,
	deleteJFEpic,
);
