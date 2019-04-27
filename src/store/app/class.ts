import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { Epic, Selector } from '..';
import { apiClassEdit,
				apiClassRegistration,
				apiRequestClassById,
				apiRequestStudents,
				apiRequestUnits } from '../../services/api';

// SELECTORS
export const selectUnits: Selector<[]> = ({ classReducer }) => classReducer.units;
export const selectStudents: Selector<[]> = ({ classReducer }) => classReducer.students;
export const selectIsClassRegistration: Selector<boolean> = ({ classReducer }) => classReducer.isClassRegistration;
export const selectClassById: Selector<IClass> = ({ classReducer }) => classReducer.classById;



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
export const requestUnits = actionCreator.async<undefined, any>('REQUEST_UNIT');
export const requestStudents = actionCreator.async<any, any, any>('REQUEST_STUDENTS');
export const classRegistration = actionCreator.async<any, any, any>('CLASS_REGISTRATION');
export const requestClassById = actionCreator.async<any, any, any>('REQUEST_CLASS_BY_ID');
export const classEdit = actionCreator.async<any, any, any>('CLASS_EDIT');



// STATE
export interface IState {
	units: [];
	students: [];
	isClassRegistration: boolean;
	classById: {};
}

const INITIAL_STATE: IState = {
	units: [],
	students: [],
	isClassRegistration: false,
	classById: {},
};

// REDUCER
export default reducerWithInitialState(INITIAL_STATE)
	.case(requestUnits.done, (state: IState, { result: units }) => ({
		...state,
		units,
	}))
	.case(requestStudents.done, (state: IState, { result: students }) => ({
		...state,
		students,
	}))
	.cases([classRegistration.started,
		classRegistration.done, 
		classRegistration.failed,
		classEdit.started, 
		classEdit.done, 
		classEdit.failed], (state: IState) => ({
		...state,
		isClassRegistration: !state.isClassRegistration,
	}))
	.case(requestClassById.done, (state: IState, { result: classById }) => ({
		...state,
		classById,
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

const requestStudentsEpic: Epic = (action$) => action$.pipe(
	filter(requestStudents.started.match),
	mergeMap((idCourse) => from(apiRequestStudents(idCourse.payload)).pipe(
		map((students) => (requestStudents.done({ result: students })),
		catchError((error) => of(requestStudents.failed({ error }))),
	)),
));

const classRegistrationEpic: Epic = (action$) => action$.pipe(
	filter(classRegistration.started.match),
	mergeMap(({payload}) => from(apiClassRegistration(payload)).pipe(
		map(({ data }) => classRegistration.done({ params: { ...payload }, result: { data }})),
		catchError((error) => of(classRegistration.failed({ params: { ...payload }, error }))),
	)),
);

const requestClassByIdEpic: Epic = (action$) => action$.pipe(
	filter(requestClassById.started.match),
	mergeMap((idTurma) => from(apiRequestClassById(idTurma.payload)).pipe(
		map((classById) => (requestClassById.done({ result: classById.turma[0] })),
		catchError((error) => of(requestClassById.failed({ error }))),
	)),
));

const classEditEpic: Epic = (action$) => action$.pipe(
	filter(classEdit.started.match),
	mergeMap(({payload}) => from(apiClassEdit(payload)).pipe(
		map(({ data }) => classEdit.done({ params: { ...payload }, result: { data }})),
		catchError((error) => of(classEdit.failed({ params: { ...payload }, error }))),
	)),
);


export const epics = combineEpics(
	requestUnitsEpic,
	requestStudentsEpic,
	classRegistrationEpic,
	requestClassByIdEpic,
	classEditEpic,
);
