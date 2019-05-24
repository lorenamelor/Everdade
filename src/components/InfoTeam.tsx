import * as React from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import styled from 'styled-components';
import { Button } from '../components';
import { QuickList } from '../components/'
import { IRootState } from '../store';
import { selectLoginType } from '../store/app/state';
import { deleteTeam, setIsTeamRegistration } from '../store/app/team';
interface IProps {
  item: any;
}

class InfoTeam extends React.Component<IProps & IMapStateToProps & IMapDispatchToProps>  {
  
   public delete = (id: any) => () => {
    this.props.deleteTeam(id);
    this.props.setIsTeamRegistration();
  }

  public render(){
  // const mistakes = require('../assets/icons/mistakes-icon.png')
  // const hits = require('../assets/icons/hits-icon.png')
  // const realHits = require('../assets/icons/real-hits-icon.png')
  // const ratedHits = require('../assets/icons/rated-hits-icon.png')

  const { item, loginType} = this.props;
  return (
    <Details>
      <div className='info'>
        <div>
          <p>Qtd de membros: <span>{item.equipe[0].tamanho}</span></p>
          <p>Líder: <span>{item.equipe[0].id_lider}</span></p>
        </div>
        {/* <div>
          <div><img src={hits} /><p>Acertos: <span>{item.acertos}</span></p></div>
          <div><img src={mistakes} /><p>Erros: <span>{item.erros}</span></p></div>
          <div><img src={ratedHits} /><p>Acertos Nominais: <span>{item.acertosNominais}</span></p></div>
          <div><img src={realHits} /><p>Acertos Reais: <span>{item.acertosReais}</span></p></div>
        </div> */}
      </div>
      <div className='actionsButtons'>
        <QuickList text='VER MEMBROS' list={item.alunos} />
        {loginType !== 'professor' &&
         <Button delet handleClick={this.delete(item.equipe[0].id_equipe)}>SAIR DA EQUIPE</Button> 
        }
      </div>
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

interface IMapDispatchToProps {
  deleteTeam: (idTeam: number | string) => void;
  setIsTeamRegistration: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  deleteTeam: (idTeam: number | string) => dispatch(deleteTeam.started(idTeam)),
  setIsTeamRegistration: () => dispatch(setIsTeamRegistration()),

})
// STYLE
const Details = styled.div`
    display:flex;
    width:100%;

    p {
      color: #636363;
      >span{
        color: #A6A6A6;
      }
    }

    >.info{
      display:flex;
      flex-direction: column;
      flex-grow:2;
      margin-right: 5%;
      flex-wrap: wrap;
      >div:first-child{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        >p{
          margin-right:15px;
        }
      }
      >div:last-child{
        display: flex;
        /* justify-content: space-between; */
        flex-grow:2;
        margin-left: 10px;
        flex-wrap: wrap;
        >div{
          display: flex;
          img{
            margin-right:3px;
            align-self: center;
            height: 15px;
          }
        }
      }
    }
    >.actionsButtons{
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }

    @media (max-width: 630px){
      flex-direction: column;
      .actionsButtons{
        margin-top:3%;
        display: flex;
        flex-direction: initial;
        justify-content: flex-end;
        >Button{
          margin-left:2%;
        }
      }
    }
`
export default connect(mapStateToProps, mapDispatchToProps)(InfoTeam);
