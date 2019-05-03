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
  handleDelete: (idItem: string | number) => void;
}


class ActionsButtons extends React.Component<Iprops & IMapStateToProps> {

  public handleEdit = (props: Iprops) => () => {
    props.openModal();
    props.handleIdItem(props.idItem);
  }
    
  public render(){
  const viewIcon = require('../../assets/icons/view-icon.png');
  const editIcon = require('../../assets/icons/edit-icon.png');
  const deletIcon = require('../../assets/icons/delet-icon.png');
   return (
    <span>
      <Link to={`${this.props.viewUrl}/${this.props.idItem}`}>
        <Button background={'#096F66'}>
          <img src={viewIcon} />
        </Button>
      </Link>
      {this.props.loginType === 'professor' ?
        <>
        <Button background={'#00BBD3'} onClick={this.handleEdit(this.props)}>
          <img src={editIcon} />
        </Button>
        <Button background={'#DB4437'} onClick={() => this.props.handleDelete(this.props.idItem)}>
          <img src={deletIcon} />
        </Button>
        </>
        : null}
    </span>
  );
}
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
