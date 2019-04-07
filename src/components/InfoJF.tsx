import * as React from 'react';

import { AnswerFact, Button, Modal } from '../components';

import { connect } from 'react-redux';
import { IRootState } from 'src/store';
import { selectLoginType } from 'src/store/app/state';
import styled from 'styled-components';

interface IProps {
  item: any;
}

interface IState {
  open: boolean;
}

class InfoJS extends React.PureComponent<IProps & IMapStateToProps, IState> {
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
    const { item, loginType } = this.props;
    return (
      <Details>
        <div>
          <p>Status: <span> {item.status}</span></p>
          <p>Turma: <span> {item.turma}</span></p>
        </div>
        <div>
          <p>Tempo de exibição dos fatos: <span> {item.time}min</span></p>
          <p>Membros por equipe: <span> {item.membros}</span></p>
        </div>
        <div>
          <p>Qtd de fatos: <span> {item.qtdFatos}</span></p>
          <p>Qtd de equipes: <span> {item.qtdEquipes}</span></p>
        </div>
        <div>
          {item.status === 'Em execução' && loginType !== 'professor'
          ? <Button handleClick={this.handleOpen}>Responder</Button> 
          : null}
        </div>
        <Modal openModal={this.state.open} handleClose={this.handleClose} description={<AnswerFact />} width='450px'/>
      </Details>
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
const Details = styled.div`
    display:flex;
    flex-direction: wrap;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-right: 50px;
    flex-grow: 1;
    > div{
      display:flex;
      flex-direction: column;
      >p {
      color: #636363;
        span{
          color: #A6A6A6;
        }
      }
      :last-child{
        color: #FFF;
        flex-direction: column-reverse;
      }
    }
`


export default connect(mapStateToProps)(InfoJS);
