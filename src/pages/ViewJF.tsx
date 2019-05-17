
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';

import * as React from 'react';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';
import { IRootState } from 'src/store';
import { requestJFById, selectJFById } from 'src/store/app/jf';
import { selectLoginType } from 'src/store/app/state';
import { requestTeamByUserAndJF, selectTeamList } from 'src/store/app/team';
import styled from 'styled-components';
import {
  Button, /*Topics,*/
  CreateTeam, ExpansionPanel, H1, InfoJF, Modal, NavigationBar
} from '../components';

interface IProps {
  match: any;
  history: any;
}
class ViewJF extends React.PureComponent<IMapStateToProps & IMapDispatchToProps & IProps> {
  public state = {
    open: false,
  };

  public componentDidMount() {
    const { match: { params } } = this.props;
    this.props.requestJFById(params.idJF);
    this.props.requestTeamByUserAndJF(params.idJF);
  }

  public handleOpen = () => {
    this.setState({ open: true });
  };

  public handleClose = () => {
    this.setState({ open: false });
  };
  public render() {
    const { loginType, JFById, teamList } = this.props;
    console.log('teamList', teamList)
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
                      <ExpansionPanel type='team' items={teamList} />
                    </>
                    :
                    <>
                      {teamList.length > 0
                        ? 
                        <>
                          <H1>Equipe</H1>
                          <ExpansionPanel type='team' items={teamList} />
                        </>
                        : <>
                          <div id='header'>
                            <H1>Equipe</H1>
                            <Button handleClick={this.handleOpen}>CRIAR EQUIPE</Button>
                          </div>
                          <Card id='cardTeam'>Você não possui uma equipe</Card>
                        </>
                      }
                      {/* <H1>Topicos</H1> */}
                      {/* <Topics /> */}
                    </>
                  }
                </div>
                <div>
                  <H1>Fatos</H1>
                  <ExpansionPanel type='fact' items={JFById.fatos} />
                </div>
              </div>
            </>
          }
        </div>
        <Modal openModal={this.state.open} handleClose={this.handleClose} description={<CreateTeam />} width='50%' />
      </ViewJFWrap >
    );
  }
}

interface IMapStateToProps {
  loginType: 'professor' | 'aluno' | null;
  JFById: any;
  teamList: any;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  loginType: selectLoginType(state),
  JFById: selectJFById(state),
  teamList: selectTeamList(state),
});


interface IMapDispatchToProps {
  requestJFById: (idJf: number | string) => void;
  requestTeamByUserAndJF: (idJf: number | string) => void;

}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  requestJFById: (idJf: number | string) => dispatch(requestJFById.started(idJf)),
  requestTeamByUserAndJF: (idJf: number | string) => dispatch(requestTeamByUserAndJF.started(idJf)),
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewJF);
