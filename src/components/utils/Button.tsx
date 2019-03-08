import Btn from '@material-ui/core/Button';

import * as React from 'react';
import styled from 'styled-components';

interface IProps{
  handleClick?: any;
  children: string;
  delet?: boolean;
}

const Button: React.SFC<IProps> = ({handleClick, delet, children}) => {
  return (
    <ButtonStyled delet={delet} onClick={handleClick}>{children}</ButtonStyled>
  );
}

// STYLE
const ButtonStyled = styled(Btn) `
 &&{ 
   background-color: ${(props: any) => props.delet ? '#DB4437' : '#096F66' };
   color: #FFF;
   min-height: 30px;
   align-items: center;
   line-height: unset;

   :hover{
    background-color: ${(props: any) => props.delet ? '#DB4437' : '#096F66' };
   }
 }
`
export default Button;
