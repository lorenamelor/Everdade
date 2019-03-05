import * as React from 'react';

import Btn from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import styled from 'styled-components';


const Button = styled(Btn) `
  &&{
    background-color: ${(props: any) => props.background};
    width: 20px;
    min-width: 26px;
    height: 25px;
    margin: 0 1px;

    @media (max-width: 700px){
      margin: 1px 1px;
    }
    :hover{
      background-color: ${(props: any) => props.background};
    }
}
`

interface Iprops {
  viewUrl: string
}

const ActionsButtons: React.SFC<Iprops> = ({ viewUrl }) => {
  const viewIcon = require('../assets/icons/view-icon.png')
  const editIcon = require('../assets/icons/edit-icon.png')
  const deletIcon = require('../assets/icons/delet-icon.png')

  return (
    <span>
      <Link to={viewUrl}>
        <Button background={'#096F66'}>
          <img src={viewIcon} />
        </Button>
      </Link>
      <Button background={'#00BBD3'}>
        <img src={editIcon} />
      </Button>
      <Button background={'#DB4437'}>
        <img src={deletIcon} />
      </Button>
    </span>
  );
}


export default ActionsButtons;
