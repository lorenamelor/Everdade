import Btn from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { listJF } from '../assets/mock'

import * as React from 'react';
import styled from 'styled-components';
import { ExpansionPanel, H1, KeepJF,Modal, NavigationBar } from '../components';

// tslint:disable-next-line:no-empty-interface
interface IProps{

}
interface IState{
  open: boolean;
}

class ViewClass extends React.PureComponent<IProps,IState> {
  public state = {
    open: false,
  };

  public handleOpen = () => {
    this.setState({ open: true });
  };

  public handleClose = () => {
    this.setState({ open: false });
  };

  public render() {
    return (
      <ViewClassWrap>
        <NavigationBar max returnUrl='/home'/>
        <div>
          <H1>Turma exemplo</H1>
          <Card className='card'>
            <div>
              <p>Código: <span>1</span></p>
              <p>Disciplina: <span>Projeto de SI</span></p>
              <p>Unidade: <span>Barreiro</span></p>
            </div>
            <div>
              <p>Alunos:
                <ul>
                  <li>Maria Joana</li>
                  <li>João Fagundes</li>
                  <li>Antonieta Pereira</li>
                </ul>
              </p>
            </div>
          </Card>
          <div className='title-jf'>
            <span><H1>Julgamento de Fatos</H1></span>
            <Button onClick={this.handleOpen}>Cadastrar JF</Button>
          </div>
          <ExpansionPanel items={listJF} buttons type='jf'/>
        </div>
        <Modal openModal={this.state.open} handleClose={this.handleClose} description={<KeepJF/>}/> 
      </ViewClassWrap>
    );
  }
}

const ViewClassWrap = styled.div`
  > div:last-child{
    padding-left: 25px;
    padding-right: 25px;
    >.card{
      padding: 5px 15px;
      display: flex;
      flex-direction: wrap;
      justify-content: space-between;
      @media (max-width: 450px){
        flex-direction: column;
        p:last-child{
          margin-top: 0;
        }
      }
      p{
        color: #636363;
        >span, ul{
          color: #A6A6A6;
        }
      }
      div{
        flex-grow: 2;
      }
    }
    > .title-jf{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const Button = styled(Btn) `
 &&{ 
   background-color: #096F66;
   color: #FFF;
   min-height: 30px;
   align-items: center;
   line-height: unset;

   :hover{
    background-color: #096F66;
   }
 }
`

export default ViewClass;
