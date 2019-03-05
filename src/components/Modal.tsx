import * as React from 'react';
// tslint:disable-next-line:ordered-imports
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';

interface IProps {
  handleClose: () => void;
  openModal: boolean;
  description: any;
}

class SimpleModal extends React.Component<IProps> {
  public render() {
    const { openModal, handleClose, description } = this.props;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openModal}
        onClose={handleClose}
      >
        <ModalWrap>
          {description}
        </ModalWrap>
      </Modal>
    );
  }
}

const ModalWrap = styled.div`
    max-width: 85%;
    width:85%;
    max-height:85%;
    background-color: #FFF;
    border-radius: 5px;
    box-shadow: 3px 3px 15px;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);  
`
export default SimpleModal;
