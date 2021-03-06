import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { ActionsObservable, combineEpics, createEpicMiddleware, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';

/* **************************** */
//  REDUCERS AND EPICS IMPORTS  //
/* **************************** */

import classReducer, { epics as classEpics} from './app/class';
import jfReducer, { epics as jfEpics} from './app/jf';
import teamReducer, {epics as teamEpics} from './app/team';

import { epics as notificationsEpics } from './app/notifications';
import appStateReducer, { epics as appStateEpics, init, IState as IAppStateState } from './app/state';

/* *************************** */
//       STORE INTERFACE       //
/* *************************** */

export interface IRootState {
	appState: IAppStateState,
	classReducer: any,
	jfReducer: any,
	teamReducer: any,
}

/* *************************** */
//      COMBINED REDUCERS      //
/* *************************** */

const rootReducer = combineReducers({
	appState: appStateReducer,
	classReducer,
	jfReducer,
	teamReducer,
});

/* ************************** */
//       COMBINED EPICS       //
/* ************************** */

const rootEpic = combineEpics(
	appStateEpics,
	notificationsEpics,
	classEpics,
	jfEpics,
	teamEpics,
);

/* ************************** */
//        TYPE EXPORTS        //
/* ************************** */

export type Epic = (action$: ActionsObservable<Action<any>>, state$: StateObservable<IRootState>) => Observable<Action<any>>;
export type Selector<Value, Props = any> = (state: IRootState, props?: Props) => Value;

/* ************************** */
//          ENHANCERS         //
/* ************************** */

const epicMiddleware = createEpicMiddleware<Action<any>, Action<any>, IRootState, any>();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(epicMiddleware)),
)

export default store;

epicMiddleware.run(rootEpic);

store.dispatch(init());
