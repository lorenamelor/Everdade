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
        <p>Qtd de membros: <span>{item.qtdMembros}</span></p>
        <p>Líder: <span>{item.lider}</span></p>
      </div>
      <hr />
      <div className='footer'>
        <div><img src={hits} /><p>Acertos: <span>{item.acertos}</span></p></div>
        <div><img src={mistakes} /><p>Erros: <span>{item.erros}</span></p></div>
        <QuickList text='VER MEMBROS' list={item.membros}/>
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
