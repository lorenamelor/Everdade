import * as React from 'react';
import styled from 'styled-components';

function H1(props: any) {
  return (
    <H1Wrap>
      {props.children}
    </H1Wrap>
  );
}

// STYLE
const H1Wrap = styled.h1`
	color: #444444;
	font-size: 30px;
`;

export default H1;
