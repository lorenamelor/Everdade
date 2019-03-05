import * as React from 'react';

import styled from 'styled-components';

// tslint:disable-next-line:no-empty-interface
interface Iprops {
  item: any;
 }

const InfoJS: React.SFC<Iprops> = ({item}) => {
  return (
    <Details>
      <div>
        <p>Status: <span>{item.status}</span></p>
        <p>Turma: <span>{item.turma}</span></p>
      </div>
      <div>
        <p>Tempo de exibição dos fatos: <span>{item.time}min</span></p>
        <p>Membros por equipe: <span>{item.membros}</span></p>
      </div>
      <div>
        <p>Qtd de fatos: <span>{item.qtdFatos}</span></p>
        <p>Qtd de equipes: <span>{item.qtdEquipes}</span></p>
      </div>
    </Details>
  );
}

const Details = styled.div`
    display:flex;
    flex-direction: wrap;
    justify-content: space-between;
    padding-right: 50px;
    flex-grow: 1;
    p {
    color: #636363;
    }
    span{
      color: #A6A6A6;
    }
    div{
      display:flex;
      flex-direction: column;
    }
`


export default InfoJS;
