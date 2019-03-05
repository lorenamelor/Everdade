import * as React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { map } from 'lodash';
import styled from 'styled-components';

import { ActionsButtons, InfoFact, InfoJF, InfoTeam } from '../components/'

interface IProps {
  buttons?: boolean;
  items: any;
  type: string;
}


class ExpansionPanels extends React.Component<IProps> {
  public state = {
    expanded: null,
  };

  public render() {
    const { expanded } = this.state;
    const { buttons, type, items } = this.props;

    return (
      <div>
        {map(items, (item: any) =>
          <ExpansionPanelWrap key={item.cod} expanded={expanded === item.cod} onChange={this.handleChange(item.cod)}>
            <ExpansionPanelSummary className='summary' expandIcon={<ExpandMoreIcon />}>
              <p>{item.name}</p>
              {buttons ? <ActionsButtons viewUrl='/jf' /> : null}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {this.handleInfo(type,item)}
            </ExpansionPanelDetails>
          </ExpansionPanelWrap>
        )}
      </div>
    );
  }

  public handleInfo = (type:string, item:any) => {
    switch (type) {
      case 'jf':
        // tslint:disable-next-line:no-unused-expression
        return <InfoJF item={item}/>
      case 'fact':
      return <InfoFact item={item}/>
      case 'team':
        return <InfoTeam item={item}/>
      default:
        return null;
    }
  }

  public handleChange = (panel: any) => (event: any, expanded: any) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
}

const ExpansionPanelWrap = styled(ExpansionPanel) `
  p {
    color: #636363;
    margin: 5px;
  }
  .summary{
    >div{
    display:flex;
    justify-content:space-between;
    }
  }
`


export default ExpansionPanels;
