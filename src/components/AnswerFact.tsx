import * as React from 'react';
import styled from 'styled-components';
import { Button, H1 } from '../components'

// tslint:disable-next-line:no-empty-interface
interface IProps { }

class KeepJF extends React.Component<IProps> {
  public render() {

    return (
      <Wrap>
        <H1>Fato 1</H1>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu ex arcu.
          Proin sodales volutpat purus non lobortis. Ut a leo id lectus rutrum malesuada.
          Sed a arcu et augue sollicitudin tristique. Morbi tincidunt est sit amet turpis varius suscipit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <span>
          <Button delet>F</Button>
          <Button>V</Button>
        </span>
      </Wrap>
    );
  }
}

// STYLE
const Wrap = styled.div`
  >p {
    color: #636363;
    text-align: justify;
    align-self: center;
  }
  >span{
    display: flex;
    justify-content: center;
    align-self: center;
    >Button{
      margin-left:5px;
    }
  }
`

export default KeepJF;
