import Btn from '@material-ui/core/Button';

import * as React from 'react';
import styled from 'styled-components';

interface IProps{
  onClick?: () => void;
  children: string;
}

const Button: React.SFC<IProps> = ({onClick, children}) => {

  return (
    <ButtonStyled onClick={onClick}>{children}</ButtonStyled>
  );

}

const ButtonStyled = styled(Btn) `
 &&{ 
   background-color: #096F66;
   color: #FFF;
   min-height: 30px;
   align-items: center;
   line-height: unset;

   :hover{
    background-color: #096F66;
   }
 }
`

export default Button;
