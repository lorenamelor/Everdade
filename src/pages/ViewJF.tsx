
import Card from '@material-ui/core/Card';

import * as React from 'react';
import styled from 'styled-components';
import { listFacts, listJF, listTeam } from '../assets/mock'
import { ExpansionPanel, H1, InfoJF, NavigationBar } from '../components';

class ViewJF extends React.PureComponent {

  public render() {
    return (
      <ViewJFWrap>
        <NavigationBar max returnUrl='/turma'/>
        <div>
          <H1>Julgamento de fatos sobre casos de uso</H1>
          <Card className='card'><InfoJF item={listJF[0]}/></Card>
          <div className='body'>
            <div>
              <H1>Fatos</H1>
              <ExpansionPanel items={listFacts} type='fact' />
            </div>
            <div>
              <H1>Equipes</H1>
              <ExpansionPanel items={listTeam} type='team' />
            </div>
          </div>
        </div>
      </ViewJFWrap>
    );
  }
}

const ViewJFWrap = styled.div`
  >div:last-child{
    padding-left: 25px;
    padding-right: 25px;
    .body{
      display:flex;
      >div{
        flex-grow: 1;
        width:50%;
        :first-child{
          margin-right:5px;
        }
        :last-child{
          margin-left:5px;
        }
      }
    }
  }
  .card{
    padding:10px 20px;
  }
`;


export default ViewJF;
