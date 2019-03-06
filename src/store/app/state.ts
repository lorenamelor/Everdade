import { combineEpics } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { Selector } from '..';


export const selectLoginType: Selector<'professor' | 'aluno'> = ({ appState }) => appState.login;

// ACTIONS

const actionCreator = actionCreatorFactory('APP::STATE');
export const init = actionCreator('INIT');
export const loginType = actionCreator<'professor' | 'aluno'>('LOGIN_TYPE');


// STATE

export interface IState {
	initialized: boolean;
	login: 'professor' | 'aluno';
}

const INITIAL_STATE: IState = {
	initialized: false,
	login: 'professor',
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
	.build();

// EFFECTS

export const epics = combineEpics();
