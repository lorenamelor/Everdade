import * as React from 'react';
import { connect } from 'react-redux';

import Btn from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

import { IRootState } from 'src/store';
import { selectLoginType } from '../../store/app/state';


interface Iprops {
  viewUrl: string;
  onClickEdit?: () => void;
  openModal: () => void;
  idItem: number | string;
  handleIdItem: (idItem: string | number) => void;
}

const handleAction = (props: Iprops) => () => {
  props.openModal();
  props.handleIdItem(props.idItem);
}

const ActionsButtons: React.SFC<Iprops & IMapStateToProps> = (props) => {
  const viewIcon = require('../../assets/icons/view-icon.png');
  const editIcon = require('../../assets/icons/edit-icon.png');
  const deletIcon = require('../../assets/icons/delet-icon.png');

   return (
    <span>
      <Link to={props.viewUrl}>
        <Button background={'#096F66'}>
          <img src={viewIcon} />
        </Button>
      </Link>
      {props.loginType === 'professor' ?
        <>
        <Button background={'#00BBD3'} onClick={handleAction(props)}>
          <img src={editIcon} />
        </Button>
        <Button background={'#DB4437'}>
          <img src={deletIcon} />
        </Button>
        </>
        : null}
    </span>
  );
}

interface IMapStateToProps {
  loginType: 'professor' | 'aluno' | null;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  loginType: selectLoginType(state),
});


// STYLE
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
export default connect(mapStateToProps)(ActionsButtons);
