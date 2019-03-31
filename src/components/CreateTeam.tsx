import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import styled from 'styled-components';
import { Button, H1 } from '../components'


class KeepJF extends React.Component {
  public render() {
    return (
      <Wrap>
        <div>
          <H1>Criar Equipe</H1>
          <Card id='card'>
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

// STYLE
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
    width:98%;
  }  
}
`
export default KeepJF;
