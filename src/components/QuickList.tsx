import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import { map } from 'lodash';
import * as React from 'react';
import styled from 'styled-components';
import { Button } from './';

interface IProps {
  text: string;
  list: any;
}
interface IState {
  open: boolean;
}

class QuickList extends React.Component<IProps, IState> {
  public state = {
    open: false,
  };

  public handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  public handleClickAway = () => {
    this.setState({
      open: false,
    });
  };

  public render() {
    const { text, list } = this.props;
    const { open } = this.state;

    return (
      <QuickListWrap>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <div>
            <Button onClick={this.handleClick}>{text}</Button>
            {open ? (
              <Paper className='paper'>
                {map(list, (item) =>
                  <p>{item}</p>
                )}
              </Paper>
            ) : null}
          </div>
        </ClickAwayListener>
      </QuickListWrap>
    );
  }
}

const QuickListWrap = styled.div`
 position: 'relative';
  .paper{
    display: flex;
    height: auto;
    max-height:150px;
    bottom: 60px;
    right: 8px;
    position: absolute;
    flex-direction: column;
    width: 150px;
    z-index: 2;
    justify-content: unset;
    overflow-y: scroll;
    padding: 10px;
  };
  p{
    margin: 2px;
    color: #636363;
  }
`

export default QuickList;
