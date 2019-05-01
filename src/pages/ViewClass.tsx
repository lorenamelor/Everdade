import Btn from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import { listJF } from '../assets/mock';


import * as React from 'react';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';
import { IRootState } from 'src/store';
import {
  requestClassById, selectClassById,
} from 'src/store/app/class';
import { selectLoginType } from 'src/store/app/state';
import styled from 'styled-components';
import { ExpansionPanel, H1, KeepJF, Modal, NavigationBar } from '../components';

interface IState {
  open: boolean;
}

interface IProps {
  match: any;
}

class ViewClass extends React.PureComponent<IMapStateToProps & IMapDispatchToProps & IProps, IState> {
  public state = {
    open: false,
  };

  public componentDidMount() {
    console.log(this.props)
    const { match: { params } } = this.props;

    this.props.requestClassById(params.idClass);
  }

  public handleOpen = () => {
    this.setState({ open: true });
  };

  public handleClose = () => {
    this.setState({ open: false });
  };
  public render() {
    const { loginType, classById } = this.props;
    console.log('classByIdview', classById)

    if (!sessionStorage.getItem('userData')) { return <Redirect to="/" /> }
    return (
       <>
        {classById.turma && classById.alunos &&
         <ViewClassWrap>
            <NavigationBar max returnUrl='/home' />
            <div>
              <H1>{classById.turma[0].nome}</H1>
              <Card className='card'>
                <div>
                  <p>Disciplina: <span>{classById.turma[0].disciplina}</span></p>
                  <p>Unidade: <span>{classById.turma[0].unidade}</span></p>
                  <p>Curso: <span>{classById.turma[0].curso}</span></p>
                </div>
                <div>
                  <p>Alunos:
                <ul>
                      {classById.alunos.map((aluno: { id_aluno: string | number | undefined; nome: string; }) => {
                        return <li key={aluno.id_aluno}>{aluno.nome}</li>;
                      }
                      )}
                    </ul>
                  </p>
                </div>
              </Card>
              <div className='title-jf'>
                <span><H1>Julgamento de Fatos</H1></span>
                {loginType === 'professor' ? <Button onClick={this.handleOpen}>Cadastrar JF</Button> : null}
              </div>
              <ExpansionPanel items={listJF} buttons type='jf' onClickEdit={this.handleOpen} />
            </div>
            <Modal openModal={this.state.open} handleClose={this.handleClose} description={<KeepJF />} width='85%' />
          </ViewClassWrap>
        }
      </>
    );
  }
}

interface IMapStateToProps {
  loginType: 'professor' | 'aluno' | null;
  classById: any;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  loginType: selectLoginType(state),
  classById: selectClassById(state),

});

interface IMapDispatchToProps {
  requestClassById: (idTurma: number | string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  requestClassById: (idTurma: number | string) => dispatch(requestClassById.started(idTurma)),
})

// STYLE
const ViewClassWrap = styled.div`
  margin-bottom: 30px;
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

const Button = styled(Btn)`
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewClass);
