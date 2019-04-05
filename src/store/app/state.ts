import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mapTo, mergeMap, tap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { Epic, Selector } from '..';
import { apiRequestCourses, apiSignIn, apiSignUp } from '../../services/api';

// SELECTORS
export const selectLoginType: Selector<'professor' | 'aluno'> = ({ appState }) => appState.login;
export const selectCourses: Selector<[]> = ({ appState }) => appState.courses;
export const selectSignUpSuccess: Selector<boolean> = ({ appState }) => appState.signUpSuccess;
export const selectSignInSuccess: Selector<boolean> = ({ appState }) => appState.signInSuccess;
export const selectIsSignUp: Selector<boolean> = ({ appState }) => appState.isSignUp;
export const selectIsSignOut: Selector<boolean> = ({ appState }) => appState.signOutSuccess;


export interface IUserSignUp {curso?
	:string; email:string; login:string; nome: string; senha: string; tipo:string }

// ACTIONS
const actionCreator = actionCreatorFactory('APP::STATE');
export const init = actionCreator('INIT');
export const loginType = actionCreator<'professor' | 'aluno'>('LOGIN_TYPE');
export const requestCourses = actionCreator.async<undefined, any>('REQUEST_COURSES');
export const signUp = actionCreator.async<IUserSignUp, any, any>('SIGN_UP');
export const signIn = actionCreator.async<{login: string, senha: string}, any, any>('SIGN_IN');
export const signOut = actionCreator.async<undefined, any, any>('SIGN_OUT');


// STATE
export interface IState {
	initialized: boolean;
	login: 'professor' | 'aluno';
	courses: [];
	isSignUp: boolean;
	signUpSuccess: boolean;
	isSignIn: boolean;
	signInSuccess: boolean;
	signOutSuccess: boolean;
}

const INITIAL_STATE: IState = {
	initialized: false,
	login: 'professor',
	courses: [],
	isSignUp: false,
	signUpSuccess: false,
	isSignIn: false,
	signInSuccess: false,
	signOutSuccess: false,
};

// REDUCER

export default reducerWithInitialState(INITIAL_STATE)
	.case(init, (state: IState) => ({
		...state,
		initialized: true,
		// login: sessionStorage.getItem('userData') ? sessionStorage.getItem('userData').tipo : null,
	}))
	.case(loginType,(state:IState, type) => ({
		...state,
		login: type,
	}))
	.case(requestCourses.done, (state: IState, { result: courses }) => ({
		...state,
		courses,
	}))
	.cases([signUp.started, signUp.failed], (state: IState) => ({
		...state,
		isSignUp: !state.isSignUp
	}))
	.case(signUp.done, (state: IState) => ({
		...state,
		signUpSuccess: true,
		isSignUp: !state.isSignUp

	}))	.cases([signIn.started, signIn.failed], (state: IState) => ({
		...state,
		isSignIn: !state.isSignIn
	}))
	.case(signIn.done, (state: IState) => ({
		...state,
		signInSuccess: true,
		isSignIn: !state.isSignIn,
	}))
	.case(signOut.done, (state: IState) => ({
		...state,
		signOutSuccess: true,
		isSignIn: !state.isSignIn

	}))
	.case(signOut.done, (state: IState) => ({
		...state,
		signOutSuccess: true,
	}))
	.build();

// EFFECTS
const requestCoursesEpic: Epic = (action$) => action$.pipe(
	filter(requestCourses.started.match),
	mergeMap(() => from(apiRequestCourses()).pipe(
		map((courses) => (requestCourses.done({ result: courses })),
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
		map(({ data }) => {
			if(data.userData){
				sessionStorage.setItem('userData', JSON.stringify(data.userData[0]))
			}
			return signIn.done({ params: { ...payload }, result: { data }})}),
		catchError((error) => of(signIn.failed({ params: { ...payload }, error }))),
	)),
);

const signOutEpic: Epic = (action$) => action$.pipe(
  filter(signOut.started.match),
  tap(() => {
		sessionStorage.removeItem('userData');
  }),
  mapTo(signOut.done({})),
);

export const epics = combineEpics(
	requestCoursesEpic,
	signUpEpic,
	signInEpic,
	signOutEpic,
);
