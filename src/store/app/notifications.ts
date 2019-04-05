import { toast } from 'react-toastify';
import { combineEpics } from 'redux-observable';
import { Epic } from '../';

import { css } from 'glamor';
import { filter, mapTo, tap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { signIn, signUp } from './state';

const actionCreator = actionCreatorFactory('APP::NOTIFICATION');
export const showToast = actionCreator('SHOW_TOAST');

const toatSuccess = (msg: any) => toast.success(msg, {
  className: css({
    background: '#249A90',
  })
})

const signUpSuccessEpic: Epic = (action$) => action$.pipe(
  filter(signUp.done.match),
  tap(() => toatSuccess("Usuário cadastrado !")),
  mapTo(showToast())
)

const signUpErrorEpic: Epic = (action$) => action$.pipe(
  filter(signUp.failed.match),
  tap(() => toast.error("Usuário já cadastrado !")),
  mapTo(showToast())
)

const signInErrorEpic: Epic = (action$) => action$.pipe(
  filter(signIn.failed.match),
  tap(() => toast.error("Dados de acesso inválidos !")),
  mapTo(showToast())
)

export const epics = combineEpics(
  signUpSuccessEpic,
  signInErrorEpic,
  signUpErrorEpic,
);