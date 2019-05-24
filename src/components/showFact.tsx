import { fromS } from "hh-mm-ss";
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import {
  Button, H1
} from '../components';
import { IRootState } from '../store';
import { requestStudentsForTeam, selectStudentsList, teamRegistration } from '../store/app/team';


interface IProps {
  facts: any;
  maxTime: string;
  closeModal: () => void;
  idJf: string | number;
}

class ShowFacts extends React.Component<IMapDispatchToProps & IMapStateToProps & IProps> {

  public state = {
    time: 0,
    isOn: false,
    start: 0,
    currentFact: 0,
    answers: [],
  }

  public componentDidMount() {
   this.startTimer();
  }

  public componentDidUpdate() {
    const { facts, maxTime } = this.props;
    const { time, currentFact} = this.state;
    if(time === (Number(maxTime)*1000) && currentFact < facts.length ){
      this.setState({time: 0, currentFact: currentFact + 1 })
    }
   }

   public reply = (idFato: number, resposta: string) => () => {
    const { answers, currentFact } = this.state;
    const { facts, closeModal, idJf } = this.props;

    if(currentFact === facts.length-1){
      console.log('state', this.state, idJf);
      return closeModal();
    }
    const arrayAnswers: Array<{idFato: number, resposta: string}> = [...answers];
    const res = {idFato, resposta}
    arrayAnswers.push(res);
    this.setState({
      answers: arrayAnswers,
      time: 0,
      currentFact: currentFact + 1,
    })
   }

  public startTimer = () => {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    
    setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }
  public render() {
    const { facts } = this.props;
    const { currentFact, time } = this.state;
    return (
      <Wrap>
        <Header><H1>{`Fato ${currentFact+1}`}</H1><H1>{fromS(time/1000, 'hh:mm:ss')}</H1></Header>
        <Text>{facts[currentFact].texto_fato}</Text>
        <ButtonContainer>
          <Button delet handleClick={this.reply(facts[currentFact].id_fato, 'f')}>F</Button>
          <Button handleClick={this.reply(facts[currentFact].id_fato, 'v')}>V</Button>
        </ButtonContainer>
      </Wrap>
    );
  }
}


interface IMapStateToProps {
  studentsList: any;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  studentsList: selectStudentsList(state),
});


interface IMapDispatchToProps {
  requestStudentsForTeam: (idClass: number | string, idJf: number | string) => void;
  teamRegistration: (payload: any) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  requestStudentsForTeam: (idClass: number | string, idJf: number | string) => dispatch(requestStudentsForTeam.started({ idClass, idJf })),
  teamRegistration: (payload: any) => dispatch(teamRegistration.started(payload))
})


// STYLE
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Text = styled.div`
  display: flex;
  text-align: justify;
  align-items: center;
  color: #636363;
  padding: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 20%;
`;

export default connect(mapStateToProps, mapDispatchToProps)(ShowFacts);

