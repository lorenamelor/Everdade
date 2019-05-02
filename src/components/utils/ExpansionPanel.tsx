import * as React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Tooltip from '@material-ui/core/Tooltip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { IRootState } from 'src/store';
import { selectLoginType } from 'src/store/app/state';
import styled from 'styled-components';
import { ActionsButtons, InfoFact, InfoJF, InfoTeam } from '../'

interface IProps {
  buttons?: boolean;
  items: any;
  type: string;
  onClickEdit?: () => void;
  handleDelete?: any;
}

class ExpansionPanels extends React.Component<IProps & IMapStateToProps> {
  public state = {
    expanded: 1,
  };

  public handleIdItem = (idItem: number | string) => {
    this.setState({ idItem });
  };
  
  public render() {
    const { expanded } = this.state;
    const { buttons, type, items, loginType, onClickEdit, handleDelete } = this.props;

    return (
      <div>
        
        {map(items, (item: any) => {
          if (type === 'jf' && loginType === 'aluno' && item.status === 'Em criação') {
            return null
          }
          else {
            
            return (
              <ExpansionPanelWrap key={item.id_jf} expanded={expanded === item.id_jf} onChange={this.handleChange(item.id_jf)}>
                <ExpansionPanelSummary className='summary' expandIcon={<ExpandMoreIcon />}>
                  <p>
                    {type === 'jf'
                      ? <Tooltip title={item.status} placement="bottom">
                        <Highlighter color={this.handleColorHighlight(item.status!)} />
                      </Tooltip>
                      : null}
                    {item.nome}
                  </p>
                  {buttons ? <ActionsButtons viewUrl='/jf' onClickEdit={onClickEdit} openModal={()=> ({})} idItem={item.id_jf} handleIdItem={this.handleIdItem} handleDelete={handleDelete} /> : null}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {this.handleInfo(type, item)}
                </ExpansionPanelDetails>
              </ExpansionPanelWrap>
            )
          }
        })}
      </div>
    );
  }

  public handleInfo = (type: string, item: any) => {
    switch (type) {
      case 'jf':
        return <InfoJF item={item} />
      case 'fact':
        return <InfoFact item={item} />
      case 'team':
        return <InfoTeam item={item} />
      default:
        return null;
    }
  }

  public handleChange = (panel: any) => (event: any, expanded: any) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  public handleColorHighlight = (status: string) => {
    switch (status) {
      case 'Finalizado':
        return '#DB4437'
      case 'Em execucao':
        return '#0F9D58'
      case 'Em criacao':
        return '#00BBD3'
      case 'Em preparacao':
        return '#FFCD40'
      default:
        return undefined;
    }
  }
}

// STYLE
const ExpansionPanelWrap = styled(ExpansionPanel)`
  p {
    color: #636363;
    margin: 5px;
    display:flex;
  }
  .summary{
    >div{
    display:flex;
    justify-content:space-between;
    }
  }
`
const Highlighter = styled.div`
  background: ${(props: any) => props.color};
  width: 10px;
  height: 10px;
  border-radius: 100%;
  align-self: center;
  margin-right: 10px;
`


interface IMapStateToProps {
  loginType: 'professor' | 'aluno' | null;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  loginType: selectLoginType(state),
});

export default connect(mapStateToProps)(ExpansionPanels);
