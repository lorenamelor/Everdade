import { toast } from 'react-toastify';
import { combineEpics } from 'redux-observable';
import { Epic } from '../';


import { css } from 'glamor';
import { filter, mapTo, tap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { classEdit, classRegistration, deleteClass } from './class';
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
  tap(() => toatSuccess("Usuário cadastrado!")),
  mapTo(showToast())
)

const signUpErrorEpic: Epic = (action$) => action$.pipe(
  filter(signUp.failed.match),
  tap(() => toast.error("Usuário já cadastrado")),
  mapTo(showToast())
)

const signInErrorEpic: Epic = (action$) => action$.pipe(
  filter(signIn.failed.match),
  tap(() => toast.error("Dados de acesso inválidos")),
  mapTo(showToast())
)

const classRegistrationSuccessEpic: Epic = (action$) => action$.pipe(
  filter(classRegistration.done.match),
  tap(() => toatSuccess("Turma cadastrada!")),
  mapTo(showToast())
)

const classEditSuccessEpic: Epic = (action$) => action$.pipe(
  filter(classEdit.done.match),
  tap(() => toatSuccess("Turma Editada!")),
  mapTo(showToast())
)

const classEditErrorEpic: Epic = (action$) => action$.pipe(
  filter(classEdit.failed.match),
  tap(() => toast.error("Hove um erro ao editar a turma")),
  mapTo(showToast())
)

const deleteClassEpic: Epic = (action$) => action$.pipe(
  filter(deleteClass.done.match),
  tap(() => toatSuccess("Turma deletada!")),
  mapTo(showToast())
)


export const epics = combineEpics(
  signUpSuccessEpic,
  signInErrorEpic,
  signUpErrorEpic,
  classRegistrationSuccessEpic,
  classEditSuccessEpic,
  classEditErrorEpic,
  deleteClassEpic,
);