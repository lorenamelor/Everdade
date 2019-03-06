
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';

import * as React from 'react';
import { IRootState } from 'src/store';
import { selectLoginType } from 'src/store/app/state';
import styled from 'styled-components';
import { listFacts, listJF, listTeam } from '../assets/mock'
import { ExpansionPanel, H1, InfoJF, NavigationBar, Topics } from '../components';
import { Start } from '../pages';

class ViewJF extends React.PureComponent<IMapStateToProps> {

  public render() {

    const { loginType } = this.props;
    return (
      <ViewJFWrap>
        <NavigationBar max returnUrl='/turma' />
        <Start />
        <div>
          <H1>Julgamento de fatos sobre casos de uso</H1>
          <Card className='card'><InfoJF item={listJF[0]} /></Card>
          <div className='body'>
            <div>
              <H1>{loginType === 'professor' ? 'Equipes' : 'Equipe'}</H1>
              <ExpansionPanel type='team' items={loginType === 'professor' ? listTeam : [listTeam[0]]} />
              {loginType !== 'professor' ?
                <>
                <H1>Topicos</H1>
                <Topics />
                </>
                : null
              }
            </div>
            <div>
              <H1>Fatos</H1>
              <ExpansionPanel type='fact' items={listFacts} />
            </div>
          </div>
        </div>
      </ViewJFWrap >
    );
  }
}

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
  .card{
    padding:10px 20px;
  }
`;

interface IMapStateToProps {
  loginType: 'professor' | 'aluno';
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  loginType: selectLoginType(state),
});

export default connect(mapStateToProps)(ViewJF);
