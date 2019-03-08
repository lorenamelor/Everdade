import * as React from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'src/store';
import { selectLoginType } from 'src/store/app/state';
import styled from 'styled-components';
import { Button } from '../components';
import { QuickList } from '../components/'
interface IProps {
  item: any;
}

const InfoTeam: React.SFC<IProps & IMapStateToProps> = ({ item, loginType }) => {
  const mistakes = require('../assets/icons/mistakes-icon.png')
  const hits = require('../assets/icons/hits-icon.png')
  const realHits = require('../assets/icons/real-hits-icon.png')
  const ratedHits = require('../assets/icons/rated-hits-icon.png')

  return (
    <Details answer={item.resposta}>
      <div className='info'>
        <div>
          <p>Qtd de membros: <span>{item.qtdMembros}</span></p>
          <p>Líder: <span>{item.lider}</span></p>
        </div>
        <div>
          <div><img src={hits} /><p>Acertos: <span>{item.acertos}</span></p></div>
          <div><img src={mistakes} /><p>Erros: <span>{item.erros}</span></p></div>
          <div><img src={ratedHits} /><p>Acertos Nominais: <span>{item.acertosNominais}</span></p></div>
          <div><img src={realHits} /><p>Acertos Reais: <span>{item.acertosReais}</span></p></div>
        </div>
      </div>
      <div className='actionsButtons'>
        <QuickList text='VER MEMBROS' list={item.membros} />
        {loginType !== 'professor' ? <Button delet>SAIR DA EQUIPE</Button> : null}
      </div>
    </Details>
  );
}

interface IMapStateToProps {
  loginType: 'professor' | 'aluno';
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  loginType: selectLoginType(state),
});

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
        >p{
          margin-right:5%;
        }
      }
      >div:last-child{
        display: flex;
        justify-content: space-between;
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
export default connect(mapStateToProps)(InfoTeam);
