import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import styled from 'styled-components';
import { cursos, unidades } from '../assets/mock'
import { Button, H1 } from '../components'

// tslint:disable-next-line:no-empty-interface
interface IProps {}

class KeepJF extends React.Component<IProps> {
  public render() {
    return (
      <Wrap>
        <div>
          <H1>Cadastrar Turma</H1>
          <Card id='card'>
            <TextField
              id="standard-name"
              className='input'
              label="Disciplina"
              margin="normal"
            />

            <TextField
              id="standard-select-currency"
              className='input'

              select
              label="Curso"
              margin="normal"
            >
              {cursos.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="select-class"
              className='input'
              select
              label="Unidade"
              margin="normal"
            >
              {unidades.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="select-class"
              className='input'
              select
              label="Alunos"
              margin="normal"
            >
              {['Maria Beatriz', 'João Miguel'].map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Card>
        </div>
        <Button>Salvar</Button>
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  >Button{
    float: right;
  }
  #card{    
    padding:10px;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
  .input{
    margin: 0 5px 15px 5px;
    width:47%;
    @media (max-width: 800px){
      width:98%;
    }
  }  
}
`



export default KeepJF;
