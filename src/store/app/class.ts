import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { Epic, Selector } from '..';
import { apiClassEdit,
				apiClassRegistration,
				apiDeleteClass,
				apiRequestClassById,
				apiRequestClassByUserId,
				apiRequestStudents,
				apiRequestUnits,
} from '../../services/api';
import { deleteJF, JFEdit, JFRegistration } from './jf';
import { getUser } from './state';

// SELECTORS
export const selectUnits: Selector<[]> = ({ classReducer }) => classReducer.units;
export const selectStudents: Selector<[]> = ({ classReducer }) => classReducer.students;
export const selectIsClassRegistration: Selector<boolean> = ({ classReducer }) => classReducer.isClassRegistration;
export const selectClassById: Selector<IClass> = ({ classReducer }) => classReducer.classById;
export const selectClassByUserId: Selector<IClass> = ({ classReducer }) => classReducer.classByUserId;

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
export const requestClassByUserId = actionCreator.async<any, any, any>('REQUEST_CLASS_BY_USER_ID');
export const requestUnits = actionCreator.async<undefined, any>('REQUEST_UNIT');
export const requestStudents = actionCreator.async<any, any, any>('REQUEST_STUDENTS');
export const classRegistration = actionCreator.async<any, any, any>('CLASS_REGISTRATION');
export const requestClassById = actionCreator.async<any, any, any>('REQUEST_CLASS_BY_ID');
export const classEdit = actionCreator.async<any, any, any>('CLASS_EDIT');
export const deleteClass = actionCreator.async<any, any, any>('DELETE_CLASS');


// STATE
export interface IState {
	units: [];
	students: [];
	isClassRegistration: boolean;
	classById: {};
	classByUserId: {},
	currentIdClass: any,
}

const INITIAL_STATE: IState = {
	units: [],
	students: [],
	isClassRegistration: false,
	classById: {},
	classByUserId: [],
	currentIdClass: null,
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
	.case(requestClassById.done, (state: IState, { params: idTurma, result: classById }) => ({
		...state,
		classById,
		currentIdClass: idTurma.payload,
	}))
	.case(requestClassByUserId.done, (state: IState, { result: classByUserId }) => ({
		...state,
		classByUserId,
	}))
	.build();

// EFFECTS

const requestClassByUserIdEpic: Epic = (action$) => action$.pipe(
	filter(requestClassByUserId.started.match),
	mergeMap(() => from(apiRequestClassByUserId(getUser('id_usuario'))).pipe(
		map((classByUserId) => (requestClassByUserId.done({ result: classByUserId })),
		catchError((error) => of(requestClassByUserId.failed({ error }))),
	)),
));

const requestClassByUserIdEpic2: Epic = (action$) => action$.pipe(
	filter(deleteClass.done.match),
	mergeMap(() => from(apiRequestClassByUserId(getUser('id_usuario'))).pipe(
		map((classByUserId) => (requestClassByUserId.done({ result: classByUserId })),
		catchError((error) => of(requestClassByUserId.failed({ error }))),
	)),
));

const requestClassByUserIdEpic3: Epic = (action$) => action$.pipe(
	filter(classEdit.done.match),
	mergeMap(() => from(apiRequestClassByUserId(getUser('id_usuario'))).pipe(
		map((classByUserId) => (requestClassByUserId.done({ result: classByUserId })),
		catchError((error) => of(requestClassByUserId.failed({ error }))),
	)),
));

const requestClassByUserIdEpic4: Epic = (action$) => action$.pipe(
	filter(classRegistration.done.match),
	mergeMap(() => from(apiRequestClassByUserId(getUser('id_usuario'))).pipe(
		map((classByUserId) => (requestClassByUserId.done({ result: classByUserId })),
		catchError((error) => of(requestClassByUserId.failed({ error }))),
	)),
));

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
		map((classById) => (requestClassById.done({ params: idTurma , result: classById })),
		catchError((error) => of(requestClassById.failed({ error }))),
	)),
));

const requestClassByIdEpic2: Epic = (action$, state$) => action$.pipe(
	filter(JFRegistration.done.match),
	mergeMap(() => from(apiRequestClassById(state$.value.classReducer.currentIdClass)).pipe(
		map((classById) => (requestClassById.done({ params: {idTurma: { payload: state$.value.classReducer.currentIdClass}}  , result: classById })),
		catchError((error) => of(requestClassById.failed({ error }))),
	)),
));

const requestClassByIdEpic3: Epic = (action$, state$) => action$.pipe(
	filter(deleteJF.done.match),
	mergeMap(() => from(apiRequestClassById(state$.value.classReducer.currentIdClass)).pipe(
		map((classById) => (requestClassById.done({ params: {idTurma: { payload: state$.value.classReducer.currentIdClass}}  , result: classById })),
		catchError((error) => of(requestClassById.failed({ error }))),
	)),
));

const requestClassByIdEpic4: Epic = (action$, state$) => action$.pipe(
	filter(JFEdit.done.match),
	mergeMap(() => from(apiRequestClassById(state$.value.classReducer.currentIdClass)).pipe(
		map((classById) => (requestClassById.done({ params: {idTurma: { payload: state$.value.classReducer.currentIdClass}}  , result: classById })),
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


const deleteClassEpic: Epic = (action$) => action$.pipe(
	filter(deleteClass.started.match),
	mergeMap((idTurma) => from(apiDeleteClass(idTurma.payload)).pipe(
		map(({ data }) => deleteClass.done({ params: { idTurma }, result: { data }})),
		catchError((error) => of(deleteClass.failed({ params: { idTurma }, error }))),
	)),
);

export const epics = combineEpics(
	requestUnitsEpic,
	requestStudentsEpic,
	classRegistrationEpic,
	requestClassByIdEpic,
	classEditEpic,
	requestClassByUserIdEpic,
	requestClassByUserIdEpic2,
	requestClassByUserIdEpic3,
	requestClassByUserIdEpic4,
	deleteClassEpic,
	requestClassByIdEpic2,
	requestClassByIdEpic3,
	requestClassByIdEpic4,
);
