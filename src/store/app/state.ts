import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { Epic, Selector } from '..';
import { apiRequestCourses, apiSignIn, apiSignUp } from '../../services/api';

// SELECTORS
export const selectLoginType: Selector<'professor' | 'aluno'> = ({ appState }) => appState.login;
export const selectCouses: Selector<[]> = ({ appState }) => appState.couses;
export const selectSignUpSuccess: Selector<boolean> = ({ appState }) => appState.signUpSuccess;
export const selectSignInSuccess: Selector<boolean> = ({ appState }) => appState.signInSuccess;


export interface IUserSignUp {curso?
	:string; email:string; login:string; nome: string; senha: string; tipo:string }

// ACTIONS
const actionCreator = actionCreatorFactory('APP::STATE');
export const init = actionCreator('INIT');
export const loginType = actionCreator<'professor' | 'aluno'>('LOGIN_TYPE');
export const requestCourses = actionCreator.async<undefined, any>('REQUEST_COURSES');
export const signUp = actionCreator.async<IUserSignUp, any, any>('SIGN_UP');
export const signIn = actionCreator.async<{login: string, senha: string}, any, any>('SIGN_IN');


// STATE
export interface IState {
	initialized: boolean;
	login: 'professor' | 'aluno';
	couses: [];
	isSignUp: boolean;
	signUpSuccess: boolean;
	isSignIn: boolean;
	signInSuccess: boolean;
}

const INITIAL_STATE: IState = {
	initialized: false,
	login: 'professor',
	couses: [],
	isSignUp: false,
	signUpSuccess: false,
	isSignIn: false,
	signInSuccess: false,
};

// REDUCER

export default reducerWithInitialState(INITIAL_STATE)
	.case(init, (state: IState) => ({
		...state,
		initialized: true,
	}))
	.case(loginType,(state:IState, type) => ({
		...state,
		login: type,
	}))
	.case(requestCourses.done, (state: IState, { result: courses }) => ({
		...state,
		courses,
	}))
	.cases([signUp.started, signUp.done, signUp.failed], (state: IState) => ({
		...state,
		isSignUp: !state.isSignUp
	}))
	.case(signUp.done, (state: IState) => ({
		...state,
		signUpSuccess: true

	}))	.cases([signIn.started, signIn.done, signIn.failed], (state: IState) => ({
		...state,
		isSignIn: !state.isSignIn
	}))
	.case(signIn.done, (state: IState) => ({
		...state,
		signInSuccess: true

	}))
	.build();

// EFFECTS
const requestCoursesEpic: Epic = (action$) => action$.pipe(
	filter(requestCourses.started.match),
	mergeMap(() => from(apiRequestCourses()).pipe(
		map((courses) => {console.log('courses', courses); return (requestCourses.done({ result: courses }))},
		catchError((error) => of(requestCourses.failed({ error }))),
	)),
));

const signUpEpic: Epic = (action$) => action$.pipe(
	filter(signUp.started.match),
	mergeMap(({payload}) => from(apiSignUp(payload)).pipe(
		map(({ data }) => signUp.done({ params: { ...payload }, result: { data }})),
		catchError((error) => of(signUp.failed({ params: { ...payload }, error }))),
	)),
);

const signInEpic: Epic = (action$) => action$.pipe(
	filter(signIn.started.match),
	mergeMap(({payload}) => from(apiSignIn(payload)).pipe(
		map(({ data }) => signIn.done({ params: { ...payload }, result: { data }})),
		catchError((error) => of(signIn.failed({ params: { ...payload }, error }))),
	)),
);

export const epics = combineEpics(
	requestCoursesEpic,
	signUpEpic,
	signInEpic,
);
