import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cursos } from '../assets/mock'
import { Button } from '../components';

import {
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField
} from '@material-ui/core';
import { Form, Formik, } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  type: Yup.string()
  .required("Tipo é obrigatório"),
  name: Yup.string()
    .required("Nome é obrigatório"),
  course: Yup.string().when('type', {
    is:(val) => val === 'aluno',
    then: Yup.string().required("Curso é obrigatório"),
    otherwise: Yup.string().notRequired(),
  }),
  login: Yup.string()
    .required("Login é obrigatório")
    .min(5, "Login deve conter no mínimo 5 caracteres"),
  email: Yup.string()
    .email("Email inválido")
    .required("Email é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatório")
    .matches(/[a-zA-Z]/, 'Deve conter letras')
    .matches(/[0-9]/,'Deve conter números'),
  confirmPassword: Yup.string()
    .required("Confirmar senha é obrigatório")
    .oneOf([Yup.ref("password")], "As senhas não conferem")
});

// tslint:disable-next-line:no-empty-interface
interface IProps { }

class FormSignUp extends React.Component<IProps> {
  public render() {
    return (
      <Wrap>
        <Formik
          initialValues={{
            type: 'aluno',
            name: '',
            email: '',
            course: '',
            login: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          // tslint:disable-next-line:jsx-no-lambda
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched, values: { type, name, course, email, password, login, confirmPassword }, handleChange,
            isValid,
            setFieldTouched }) => {

            const change = (nameInput: any, e: any) => {
              e.persist();
              handleChange(e);
              setFieldTouched(nameInput, true, false);
            };

            return (
              <Form>
                <RadioGroup
                  aria-label="position"
                  name="type"
                  value={type}
                  onChange={change.bind(null, "type")}
                  row
                >
                  <RadioButtom
                    value="aluno"
                    control={<Radio color="primary" />}
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
                  id="standard-name"
                  className='input'
                  name='name'
                  label="Name"
                  margin="normal"
                  value={name}
                  helperText={touched.name ? errors.name : ""}
                  error={touched.name && Boolean(errors.name)}
                  onChange={change.bind(null, "name")}
                  InputProps={{
                    startAdornment:
                      <InputAdornment position="start">
                        <img src={require('../assets/icons/name.png')} />
                      </InputAdornment>,
                  }}
                />
                <TextField
                  id="standard-name"
                  className='input'
                  name='email'
                  label="Email"
                  margin="normal"
                  value={email}
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                  onChange={change.bind(null, "email")}
                  InputProps={{
                    startAdornment:
                      <InputAdornment position="start">
                        <img src={require('../assets/icons/email.png')} />
                      </InputAdornment>,
                  }}
                />
                {type === 'aluno' ?
                  < TextField
                    id="standard-select-currency"
                    className='input'
                    name='course'
                    select
                    label="Curso"
                    value={course}
                    margin="normal"
                    helperText={touched.course ? errors.course : ""}
                    error={touched.course && Boolean(errors.course)}
                    onChange={change.bind(null, "course")}
                    InputProps={{
                      startAdornment:
                        <InputAdornment position="start">
                          <img src={require('../assets/icons/course.png')} />
                        </InputAdornment>,
                    }}
                  >
                    {cursos.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  : null
                }
                <TextField
                  id="standard-name"
                  className='input'
                  name='login'
                  label="Login"
                  margin="normal"
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
                <div id="passwords">
                  <TextField
                    className='password'
                    name='password'
                    label="Password"
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={change.bind(null, "password")}
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    InputProps={{
                      startAdornment:
                        <InputAdornment position="start">
                          <img src={require('../assets/icons/password.png')} />
                        </InputAdornment>,
                    }}
                  />
                  <TextField
                    className='password'
                    name='confirmPassword'
                    label="Confirmar senhar"
                    type="password"
                    margin="normal"
                    value={confirmPassword}
                    onChange={change.bind(null, "confirmPassword")}
                    helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    InputProps={{
                      startAdornment:
                        <InputAdornment position="start">
                          <img src={require('../assets/icons/password.png')} />
                        </InputAdornment>,
                       
                    }}
                  />
                </div>
                <Button type="submit" width="60%">Cadastrar</Button>
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
  width: 50%;
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
    .password{
      width: 48%;
      margin-top: 0px;
      margin-bottom: 10px;
    }
    #passwords{
      display: flex;
      justify-content: space-between;
    }
    

    @media (max-width: 1000px){
			#logo{
				display: none;
			}

      .password{
      width: 100%;
      margin-top: 0px;
      margin-bottom: 10px;
      }
      #passwords{
          display: unset;
    }
		}
`

const RadioButtom = styled(FormControlLabel)`
  .MuiRadio-colorPrimary-12.MuiRadio-checked-10 {
    color: #249A90;
  } 
`


export default FormSignUp;
