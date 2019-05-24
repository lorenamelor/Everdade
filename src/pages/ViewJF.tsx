
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';

import * as React from 'react';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import {
  Button, CreateTeam, ExpansionPanel, H1, InfoJF, Modal, NavigationBar
} from '../components';
import ShowFact from '../components/showFact';
import { IRootState } from '../store';
import { requestJFById, selectJFById } from '../store/app/jf';
import { selectLoginType } from '../store/app/state';
import { requestTeamByUserAndJF, selectTeamList, setIsTeamRegistration, selectIsTeamRegistration } from '../store/app/team';

interface IProps {
  match: any;
  history: any;
}
class ViewJF extends React.PureComponent<IMapStateToProps & IMapDispatchToProps & IProps> {
  public state = {
    open: false,
    answerFacts: false,
  };

  public componentDidMount() {
    const { match: { params } } = this.props;
    this.props.requestJFById(params.idJF);
  }

  public componentDidUpdate(oldProps: any) {
    console.log('this.props.isTeamRegistration', this.props.isTeamRegistration);
    if(this.props.isTeamRegistration === true){
      const { match: { params } } = this.props;
      this.props.requestJFById(params.idJF);
      console.log('chamou novamente')
      this.props.setIsTeamRegistration();
    }
  }

  public handleOpen = (modal: string) => () => {
    this.setState({ [modal]: true });
  };

  public handleClose = (modal: string) => () => {
    this.setState({ [modal]: false });
  };

  public render() {

    const { loginType, JFById, match: { params : { idJF } } } = this.props;

    if (!sessionStorage.getItem('userData')) { return <Redirect to="/" /> }
    return (
      <ViewJFWrap>
        <NavigationBar max returnUrl={() => this.props.history.goBack()} />
        <div>
          {JFById.jf && JFById.jf[0] &&
            <>
              <H1>{JFById.jf[0].nome}</H1>
              <Card className='card'><InfoJF item={JFById.jf[0]} /></Card>
              <div className='body'>
                <div>
                  {loginType === 'professor' ?
                    <>
                      <div id='header'>
                        <H1>Equipes</H1>
                      </div>
                      <ExpansionPanel type='team' items={JFById.equipes} />
                    </>
                    :
                    <>
                      {JFById.equipes.length > 0
                        ? 
                        <>
                          <H1>Equipe</H1>
                          <ExpansionPanel type='team' items={JFById.equipes} />
                        </>
                        : <>
                          <div id='header'>
                            <H1>Equipe</H1>
                            <Button handleClick={this.handleOpen('open')}>CRIAR EQUIPE</Button>
                          </div>
                          <Card id='cardTeam'>Você não possui uma equipe</Card>
                        </>
                      }
                      {/* <H1>Topicos</H1> */}
                      {/* <Topics /> */}
                    </>
                  }
                </div>
                {(loginType === 'professor' ||
                 ((loginType === 'aluno' || loginType === 'lider') && 
                 JFById.jf[0].status === 'Finalizado'))
                  ?  <div>
                      <H1>Fatos</H1>
                      <ExpansionPanel type='fact' items={JFById.fatos} />
                    </div>
                  : ((loginType === 'aluno' || loginType === 'lider') && 
                  JFById.jf[0].status === 'Em execucao') 
                  ?
                    <div style={{alignItems: 'center', display: 'flex'}}>
                      <H1>Fatos</H1>
                      <ContainerFact>
                        <Button handleClick={this.handleOpen('answerFacts')}>RESPONDER FATOS</Button>
                      </ContainerFact>
                    </div>
                  : null
               }
               
              </div>
              <Modal openModal={this.state.answerFacts} handleClose={this.handleClose('answerFacts')} description={<ShowFact facts={JFById.fatos} idJf={idJF} maxTime={JFById.jf[0].tempo_max_exib} closeModal={this.handleClose('answerFacts')}/>} width='50%' />
              <Modal openModal={this.state.open} handleClose={this.handleClose('open')} description={<CreateTeam idJf={idJF} maxStudents={JFById.jf[0].quantidade_alunos_equipe} idClass={JFById.jf[0].turma_id_turma1} closeModal={this.handleClose('open')}/>} width='50%' />
            </>
          }
        </div>
      </ViewJFWrap >
    );
  }
}

interface IMapStateToProps {
  loginType: 'professor' | 'aluno' | null;
  JFById: any;
  teamList: any;
  isTeamRegistration: boolean;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  loginType: selectLoginType(state),
  JFById: selectJFById(state),
  teamList: selectTeamList(state),
  isTeamRegistration: selectIsTeamRegistration(state),
});


interface IMapDispatchToProps {
  requestJFById: (idJf: number | string) => void;
  requestTeamByUserAndJF: (idJf: number | string) => void;
  setIsTeamRegistration: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  requestJFById: (idJf: number | string) => dispatch(requestJFById.started(idJf)),
  requestTeamByUserAndJF: (idJf: number | string) => dispatch(requestTeamByUserAndJF.started(idJf)),
  setIsTeamRegistration: () => dispatch(setIsTeamRegistration()),
})

// STYLE
const ViewJFWrap = styled.div`
  >div:last-child{
    padding-left: 25px;
    padding-right: 25px;
    .body{
      >div{
        :first-child{
          margin-right:5px;
        }
        :last-child{
          margin-left:5px;
        }
      }
    }
  }
  #header{
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .card{
    padding:10px 20px;
  }
  #cardTeam{
    display: flex;
    justify-content: center;
    color: #636363;
    padding:30px;
  }
`;

const ContainerFact = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default connect(mapStateToProps, mapDispatchToProps)(ViewJF);
