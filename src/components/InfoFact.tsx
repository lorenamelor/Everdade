import * as React from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'src/store';
import { selectLoginType } from 'src/store/app/state';
import styled from 'styled-components';
import { QuickList } from '../components/'

interface IProps {
  item: any;
}

const InfoJS: React.SFC<IProps & IMapStateToProps> = ({ item, loginType }) => {
  const mistakes = require('../assets/icons/mistakes-icon.png')
  const hits = require('../assets/icons/hits-icon.png')

  return (
    <Details answer={item.resposta_correta} teamAnswer={item.respostaEquipe}>
      <div>
        <p>Tópico: <span>{item.topico}</span></p>
        {loginType === 'professor' 
          ? <p>Resposta: <span className='answer'>{item.resposta_correta === 'v' ? 'Verdadeiro' : 'Falso'}</span></p>
          : <p>Resposta da equipe: <span className='teamAnswer'>{item.respostaEquipe ? 'V' : 'F'}</span></p>
        }
      </div>
      {(loginType === 'professor' || item.status === 'Finalizado') &&
      <p className='fact'>{item.texto_fato}</p>
      }
      {loginType === 'professor' ?
        <>
        <hr />
        <div className='footer'>
          <div>
            <div><img src={hits} /><p>Acertos: <span>{item.acertos}</span></p></div>
            <div><img src={mistakes} /><p>Erros: <span>{item.erros}</span></p></div>
          </div>
          {loginType !== 'professor' &&
            <QuickList text='VER EQUIPE' list={item.equipes} />
          }
        </div>
        </>
        : null}
    </Details>
  );
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
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 0px;
    padding-top: 0px;
    padding-right: 10px;
    flex-grow: 1;
    
    >div{
      :first-child{
        >p{
            margin-right: 5%;
        }
      }
      display:flex;
      flex-wrap: wrap;
    }
    p {
    color: #636363;
    text-align: justify;
      >span{
        color: #A6A6A6;
        margin-left: 5px;
      }
    }
    hr{
      width: 100%;
      border-top: 1px solid #A6A6A6;
      list-style-type: none;
    }
    .answer{
      color: ${(props: any) => props.answer === 'v' ? '#009688' : '#DB4437'}
    }
    .teamAnswer{
      color: ${(props: any) => props.teamAnswer === 'v' ? '#009688' : '#DB4437'}
    }
    .fact{
      /* padding-top: 10px; */
      margin-right: 0;
    }
    .footer{
      flex-wrap: wrap;
      display:flex;
      justify-content: space-between;
      >div{
        display: flex;
        flex-wrap: wrap;
        :first-child{
          flex-grow: 0.3;
          >div{
            margin-right:10%;
          }
        }
        >div{
          align-items:center;
          display: flex;
          >img{
            margin-right:3px;
            align-self: center;
            height: 15px;
          }
        }
      }

      @media (max-width: 400px){
        >div:last-child{
          margin-top: 3%;
          width:100%;
          flex-direction: row-reverse;
          display: flex;
        }
      }
    }
`
export default connect(mapStateToProps)(InfoJS);
