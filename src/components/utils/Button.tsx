import Btn from '@material-ui/core/Button';

import * as React from 'react';
import styled from 'styled-components';

interface IProps{
  handleClick?: any;
  children: string;
  delet?: boolean;
  type?: string,
  width?: string,
}

const Button: React.SFC<IProps> = ({handleClick, delet, children, width, type}) => {
  return (
    <ButtonStyled delet={delet} onClick={handleClick} type={type}  width={width}>{children}</ButtonStyled>
  );
}

// STYLE
const ButtonStyled = styled(Btn) `
 &&{ 
   background-color: ${(props: any) => props.delet ? '#DB4437' : '#096F66' };
   width: ${(props: any) => props.width ? props.width : 'auto' };
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
