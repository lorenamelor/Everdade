
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';

import * as React from 'react';
import { Redirect } from 'react-router';
import { IRootState } from 'src/store';
import { selectLoginType } from 'src/store/app/state';
import styled from 'styled-components';
import { listFacts, listJF, listTeam } from '../assets/mock'
import { Button, CreateTeam, ExpansionPanel, H1, InfoJF, Modal, NavigationBar, Topics } from '../components';

class ViewJF extends React.PureComponent<IMapStateToProps> {
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

    const { loginType } = this.props;
    if (!sessionStorage.getItem('userData')) { return <Redirect to="/" /> }
    return (
      <ViewJFWrap>
        <NavigationBar max returnUrl='/turma' />
        <div>
          <H1>Julgamento de fatos sobre casos de uso</H1>
          <Card className='card'><InfoJF item={listJF[0]} /></Card>
          <div className='body'>
            <div>
              {loginType === 'professor' ?
                <>
                  <div id='header'>
                    <H1>Equipes</H1>
                  </div>
                  <ExpansionPanel type='team' items={listTeam} />
                </>
                :
                <>
                  <div id='header'>
                    <H1>Equipe</H1>
                    <Button handleClick={this.handleOpen}>CRIAR EQUIPE</Button>
                  </div>
                  <Card id='cardTeam'>Você não possui uma equipe</Card>
                  <H1>Topicos</H1>
                  <Topics />
                </>
              }
            </div>
            <div>
              <H1>Fatos</H1>
              <ExpansionPanel type='fact' items={listFacts} />
            </div>
          </div>
        </div>
        <Modal openModal={this.state.open} handleClose={this.handleClose} description={<CreateTeam />} width='50%' />
      </ViewJFWrap >
    );
  }
}

interface IMapStateToProps {
  loginType: 'professor' | 'aluno' | null;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  loginType: selectLoginType(state),
});

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

export default connect(mapStateToProps)(ViewJF);
