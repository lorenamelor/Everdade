import * as React from 'react';

import Card from '@material-ui/core/Card';
import styled from 'styled-components';

// tslint:disable-next-line:no-empty-interface
interface Iprops {
  item?: any;
}

const Topics: React.SFC<Iprops> = ({ item }) => {
  const starIcon = require('../assets/icons/star-icon.png')
  const studyIcon = require('../assets/icons/study-icon.png')

  return (
    <TopicsWrap>
      <div>
        <p><img src={starIcon} /> BOM DESEMPENHO: </p>
        <ul>
          <li>Lorem ipsum dolor sit amet, consectetur elit</li>
          <li>Lorem ipsum dolor sit amet, consectetur elit</li>
          <li>Lorem ipsum dolor sit amet, consectetur elit</li>
          <li>Lorem ipsum dolor sit amet, consectetur elit</li>
          <li>Lorem ipsum dolor sit amet, consectetur elit</li>
        </ul>
      </div>
      <hr />
      <div>
        <p><img src={studyIcon} /> ESTUDE MAIS: </p>
        <ul>
          <li>Lorem ipsum dolor sit amet, consectetur elit</li>
          <li>Lorem ipsum dolor sit amet, consectetur elit</li>
          <li>Lorem ipsum dolor sit amet, consectetur elit</li>
        </ul>
      </div>
    </TopicsWrap>
  );
}

const TopicsWrap = styled(Card) `
   display: flex;
   color: #636363;
   padding: 10px 30px;
   >div{
     width:50%;
   }
   li{
    margin-bottom: 5px;
   }
   hr{
    border-left: #A6A6A6 solid 2px;
    margin: 10px 30px;
   }
   p{
    align-items: center;
    display: flex;
    img{
      padding-right:5px;
    }
   }

   @media (max-width: 600px){
     display: block;
      >div {
        width:100%
      }
    }
`

export default Topics;
