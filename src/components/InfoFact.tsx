import * as React from 'react';

import styled from 'styled-components';
import QuickList from '../components/QuickList'

interface IProps {
  item: any;
}

const InfoJS: React.SFC<IProps> = ({ item }) => {
  const mistakes = require('../assets/icons/mistakes-icon.png')
  const hits = require('../assets/icons/hits-icon.png')

  return (
    <Details answer={item.resposta}>
      <div>
        <p>Tópico: <span>{item.topic}</span></p>
        <p>Resposta: <span className='answer'>{item.resposta ? 'V' : 'F'}</span></p>
      </div>
      <p className='fact'>{item.fact}</p>
      <hr />
      <div className='footer'>
        <div><img src={hits} /><p>Acertos: <span>{item.acertos}</span></p></div>
        <div><img src={mistakes} /><p>Erros: <span>{item.erros}</span></p></div>
        <QuickList text='VER EQUIPE' list={item.equipes}/>
      </div>
    </Details>
  );
}

const Details = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 0px;
    padding-top: 0px;
    padding-right: 10px;
    flex-grow: 1;
    div{
      display:flex;
      justify-content: space-between;
    }
    p {
    color: #636363;
    text-align: justify;
      >span{
        color: #A6A6A6;
      }
    }
    hr{
      width: 100%;
      border-top: 1px solid #A6A6A6;
      list-style-type: none;
    }
    .answer{
      color: ${(props: any) => props.answer ? '#009688' : '#DB4437'}
    }
    .fact{
      padding-top: 10px;
    }
    .footer{
      >div{
        align-items:center;
        >img{
          margin-right:3px;
          align-self: center;
          height: 15px;
        }
      }
    }
`

export default InfoJS;
