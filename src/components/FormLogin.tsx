import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../components'

import {InputAdornment, TextField} from '@material-ui/core';
import { Form, Formik, } from 'formik';
import { Link } from 'react-router-dom'

// tslint:disable-next-line:no-empty-interface
interface IProps { }

class FormLogin extends React.Component<IProps> {
  public render() {
    return (
      <Wrap>
        <Formik
          initialValues={{
            login: '',
            password: '',
          }}
          // tslint:disable-next-line:jsx-no-lambda
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ values: {password, login}, handleChange, isValid, setFieldTouched }) => {

            const change = (nameInput: any, e: any) => {
              e.persist();
              handleChange(e);
              setFieldTouched(nameInput, true, false);
            };

            return (
              <Form>            
               <TextField
                  id="standard-name"
                  className='input'
                  name='login'
                  label="Login"
                  margin="normal"
                  value={login}
                  onChange={change.bind(null, "login")}
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
                  <TextField
                    className='input'
                    name='password'
                    label="Password"
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={change.bind(null, "password")}
                    InputProps={{
                      startAdornment:
                        <InputAdornment position="start">
                          <img src={require('../assets/icons/password.png')} />
                        </InputAdornment>,
                    }}
                  />               
                <Button type="submit" width="60%">Entrar</Button>
                <p>Não possui uma conta? <Link to="/signup" id="link">Cadastrar</Link></p>
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
    width:70%;
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
    

    @media (max-width: 1000px){
			#logo{
				display: none;
			}
    }
`

export default FormLogin;
