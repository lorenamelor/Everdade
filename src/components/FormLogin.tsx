import { Form, Formik, } from 'formik';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { Dispatch } from 'redux';
import { IRootState } from 'src/store';
import styled from 'styled-components';

import { InputAdornment, TextField } from '@material-ui/core';
import { selectSignInSuccess, signIn } from 'src/store/app/state';
import { Button } from '../components'

class FormLogin extends React.Component<IMapDispatchToProps & IMapStateToProps>{
  public render() {
    const { signInSuccess } = this.props;

    if (signInSuccess ||  sessionStorage.getItem('userData')) { return <Redirect to="/home" /> }
    return (
      <Wrap>
        <Formik
          initialValues={{
            login: '',
            senha: '',
          }}
          onSubmit={values => {
            console.log(values);
            this.props.signIn(values)
          }}
        >
          {({ values: { senha, login }, handleChange, isValid, setFieldTouched }) => {
            const change = (nameInput: any, e: any) => {
              e.persist();
              handleChange(e);
              setFieldTouched(nameInput, true, false);
            };
            return (
              <Form>
                <TextField
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
                  name='senha'
                  label="Password"
                  margin="normal"
                  type="password"
                  value={senha}
                  onChange={change.bind(null, "senha")}
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
  width: 70%;
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

// REDUX ACTIONS
interface IMapDispatchToProps {
  signIn: (payload: { login: string, senha: string }) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  signIn: (payload) => dispatch(signIn.started(payload))
})

// REDUX STATE
interface IMapStateToProps {
  signInSuccess: boolean;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  signInSuccess: selectSignInSuccess(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);

