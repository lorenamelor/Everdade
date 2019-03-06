import Btn from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import styled from 'styled-components';
import { listItems } from '../assets/mock'
import { Button, H1 } from '../components'

// tslint:disable-next-line:no-empty-interface
interface IProps {}

class KeepJF extends React.Component<IProps> {
  public render() {
    const addIcon = require('../assets/icons/add-icon.png')
    const deletIcon = require('../assets/icons/delet-icon.png')
    return (
      <Wrap>
        <div>
          <H1>Cadastrar Julgamento de Fatos</H1>
          <KeepJFWrap>
            <TextField
              id="standard-name"
              className='input'
              label="Nome"
              margin="normal"
            />

            <TextField
              id="standard-select-currency"
              className='input'

              select
              label="Status"
              margin="normal"
            >
              {['Criação', 'Preparação', 'Execução', 'Finalizado'].map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="select-class"
              className='input'
              select
              label="Turma"
              margin="normal"
            >
              {listItems.map(option => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="standard-name"
              className='input-small'
              label="Membros"
              margin="normal"
              type="number"
            />

            <TextField
              id="standard-name"
              className='input-small'
              label="Tempo/fato"
              margin="normal"
              type="number"
            />
          </KeepJFWrap>
          <div className='facts'>
            <H1>Fatos</H1>
            <KeepFacts>
              <TextField
                id="outlined-multiline-flexible"
                label="Fato"
                multiline
                rowsMax="4"
                rows="4"
                className='inputMultiline'
                margin="normal"
                variant="outlined"
              />
              <div>
                <TextField
                  id="standard-name"
                  className='input-small'
                  label="Resposta"
                  margin="normal"
                />

                <TextField
                  id="standard-name"
                  className='input-small'
                  label="Ordem"
                  margin="normal"
                  type="number"
                />
              </div>
            </KeepFacts>
            <span className='actions-buttons'>
              <ButtonSmall background={'#096F66'}>
                <img src={addIcon} />
              </ButtonSmall>
              <ButtonSmall background={'#DB4437'}>
                <img src={deletIcon} />
              </ButtonSmall>
            </span>
          </div>
        </div>
        <Button>Salvar</Button>
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  >div:first-child{
      overflow-y: scroll;
      height: 80vh;
      margin-bottom:10px;
  }
  >Button{
    float: right;
  }
  .actions-buttons{
    margin-right: 10px;
    display:flex;
    flex-direction: row-reverse;
  }
`

const KeepJFWrap = styled(Card) `
    padding:10px;
    align-items: center;
    justify-content: center;
    margin: 10px;
  .input{
    margin: 0 5px 15px 5px;
    width:47%;
    @media (max-width: 800px){
      width:98%;
    }
  }  
  .input-small{
    margin: 0 5px 10px 5px;
    
    width: 22%;
    @media (max-width: 800px){
      width:45%;
    }
    @media (max-width: 370px){
      width:98%;
    }
  }
`

const KeepFacts = styled(Card) `
    padding:10px;
    align-items: center;
    justify-content: center;
    display:flex;
    margin: 10px;
    .inputMultiline{
      width: 100%;
      margin-left: 5px;
      margin-right: 30px;
    }
    >.div {
      display:flex;
      flex-direction: column;
    }
    .input-small{
      margin: 0 5px 10px 5px;
    }
 
`

const ButtonSmall = styled(Btn) `
  &&{
    background-color: ${(props: any) => props.background};
    width: 20px;
    min-width: 26px;
    height: 25px;
    margin: 0 1px;

    @media (max-width: 700px){
      margin: 1px 1px;
    }
    :hover{
      background-color: ${(props: any) => props.background};
    }
}
`
export default KeepJF;
