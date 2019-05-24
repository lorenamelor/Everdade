import { Form, Formik, } from 'formik';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import { IRootState } from '../store';
import styled from 'styled-components';
import * as Yup from 'yup';

import { FormControlLabel, InputAdornment, MenuItem, Radio, RadioGroup, TextField } from '@material-ui/core';
import { IUserSignUp, requestCourses, selectCourses, selectIsSignUp, selectSignUpSuccess, signUp } from '../store/app/state';
import { Button } from '../components';

// validate form
const SignupSchema = Yup.object().shape({
  tipo: Yup.string()
    .required("Tipo é obrigatório"),
  nome: Yup.string()
    .required("Nome é obrigatório"),
  idCurso: Yup.string().when('tipo', {
    is: (val) => val === 'aluno',
    then: Yup.string().required("Curso é obrigatório"),
    otherwise: Yup.string().notRequired(),
  }),
  login: Yup.string()
    .required("Login é obrigatório")
    .min(5, "Login deve conter no mínimo 5 caracteres"),
  email: Yup.string()
    .email("Email inválido")
    .required("Email é obrigatório"),
  senha: Yup.string()
    .required("Senha é obrigatório")
    .matches(/[a-zA-Z]/, 'Deve conter letras')
    .matches(/[0-9]/, 'Deve conter números'),
  confirmarSenha: Yup.string()
    .required("Confirmar senha é obrigatório")
    .oneOf([Yup.ref("senha")], "As senhas não conferem")
});

class FormSignUp extends React.Component<IMapStateToProps & IMapDispatchToProps> {
  public componentDidMount() {
		this.props.requestCourses();
  }
  
  public render() {
    const { signUpSuccess, courses, isSignUp } = this.props;

    if(signUpSuccess) { return <Redirect to="/" /> }
    return (
      <Wrap>
        <Formik
          initialValues={{
            tipo: 'aluno',
            nome: '',
            email: '',
            idCurso: '',
            login: '',
            senha: '',
            confirmarSenha: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => this.props.signUp(values)}
        >
          {({ errors, touched, values: { tipo, nome, idCurso, email, senha, login, confirmarSenha }, 
           handleChange, setFieldTouched }) => {
            const change = (nameInput: any, e: any) => {
              e.persist();
              handleChange(e);
              setFieldTouched(nameInput, true, false);
            };

            return (
              <Form>
                <RadioGroup
                  aria-label="position"
                  name="tipo"
                  value={tipo}
                  onChange={change.bind(null, "tipo")}
                  row
                >
                  <RadioButtom
                    value="aluno"
                    control={<Radio color="primary"/>}
                    label={<p><img id="study" src={require('../assets/icons/study.png')} /> Aluno</p>}
                    labelPlacement="end"
                  />
                  <RadioButtom
                    value="professor"
                    control={<Radio color="primary" />}
                    label={<p><img id="teacher" src={require('../assets/icons/teacher.png')} /> Professor</p>}
                    labelPlacement="end"
                  />
                </RadioGroup>
                <TextField
                  className='input'
                  name='nome'
                  label="Nome"
                  value={nome}
                  helperText={touched.nome ? errors.nome : ""}
                  error={touched.nome && Boolean(errors.nome)}
                  onChange={change.bind(null, "nome")}
                  InputProps={{
                    startAdornment:
                      <InputAdornment position="start">
                        <img src={require('../assets/icons/name.png')} />
                      </InputAdornment>,
                  }}
                />
                <TextField
                  className='input'
                  name='email'
                  label="Email"
                  value={email}
                  helperText={!touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                  onChange={change.bind(null, "email")}
                  InputProps={{
                    startAdornment:
                      <InputAdornment position="start">
                        <img src={require('../assets/icons/email.png')} />
                      </InputAdornment>,
                  }}
                />
                {tipo === 'aluno' ?
                  < TextField
                    className='input'
                    name='idCurso'
                    select
                    label="Curso"
                    value={idCurso}
                      helperText={touched.idCurso ? errors.idCurso : ""}
                    error={touched.idCurso && Boolean(errors.idCurso)}
                    onChange={change.bind(null, "idCurso")}
                    InputProps={{
                      startAdornment:
                        <InputAdornment position="start">
                          <img src={require('../assets/icons/course.png')} />
                        </InputAdornment>,
                    }}
                  >
                  {!(courses.length > 0) 
                  ? <MenuItem>Selecione um curso</MenuItem>
                  : courses.map((option:{id_curso: string, nome: string}) => (
                      <MenuItem key={option.id_curso} value={option.id_curso}>
                        {option.nome}
                      </MenuItem>
                    ))}
                  </TextField>
                  : null
                }
                <TextField
                  className='input'
                  name='login'
                  label="Login"
                  value={login}
                  onChange={change.bind(null, "login")}
                  helperText={touched.login ? errors.login : ""}
                  error={touched.login && Boolean(errors.login)}
                  InputProps={{
                    startAdornment:
                      <InputAdornment position="start">
                        <img src={require('../assets/icons/login.png')} />
                      </InputAdornment>,
                  }}
                  inputProps={{
                    maxLength: 10,
                  }}
                />
                <div id="senhas">
                  <TextField
                    className='senha'
                    name='senha'
                    label="Senha"
                    type="password"
                    value={senha}
                    onChange={change.bind(null, "senha")}
                    helperText={touched.senha ? errors.senha : ""}
                    error={touched.senha && Boolean(errors.senha)}
                    InputProps={{
                      startAdornment:
                        <InputAdornment position="start">
                          <img src={require('../assets/icons/password.png')} />
                        </InputAdornment>,
                    }}
                  />
                  <TextField
                    className='senha'
                    name='confirmarSenha'
                    label="Confirmar senhar"
                    type="password"
                      value={confirmarSenha}
                    onChange={change.bind(null, "confirmarSenha")}
                    helperText={touched.confirmarSenha ? errors.confirmarSenha : ""}
                    error={touched.confirmarSenha && Boolean(errors.confirmarSenha)}
                    InputProps={{
                      startAdornment:
                        <InputAdornment position="start">
                          <img src={require('../assets/icons/password.png')} />
                        </InputAdornment>,

                    }}
                  />
                </div>
                <Button type="submit" width="60%" loading={isSignUp}>Cadastrar</Button>
                <p>Ja possui uma conta? <Link to="/" id='link'>Fazer Login</Link></p>
              </Form>
            )
          }}
        </Formik>
      </Wrap >
    );
  }
}

// STYLE
const Wrap = styled.div`
  width: 70%;
  display:flex;
  align-items: center;
  text-align: center;
  align-self: center;
  
  .input{
    margin-bottom: 10px;
    margin-top:0;
    width:100%;
  }
  p{
   color: #757575;
  }
  #link{
    color: #249A90;
    text-decoration: none;
    :hover{
    text-decoration: underline;
    }
  }
  #study{
      width: 22px;
  }
  #teacher{
    width: 26px;
  }
  .senha{
    width: 48%;
    margin-top: 0px;
    margin-bottom: 10px;
  }
  #senhas{
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 1000px){
    #logo{
      display: none;
    }
    .senha{
      width: 100%;
      margin-top: 0px;
      margin-bottom: 10px;
    }
    #senhas{
      display: unset;
    }
  }
`

const RadioButtom = styled(FormControlLabel)`
  .MuiRadio-colorPrimary-12.MuiRadio-checked-10 {
    color: #249A90;
  } 
`

// REDUX ACTIONS
interface IMapDispatchToProps {
  requestCourses: () => void;
  signUp: (payload: IUserSignUp) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  requestCourses: () => dispatch(requestCourses.started()),
  signUp: (payload) => dispatch(signUp.started(payload)),
})

// REDUX STATE
interface IMapStateToProps {
  courses: [];
  signUpSuccess: boolean;
  isSignUp: boolean;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  courses: selectCourses(state),
  signUpSuccess: selectSignUpSuccess(state),
  isSignUp: selectIsSignUp(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSignUp);


