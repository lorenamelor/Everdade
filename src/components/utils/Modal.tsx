import Modal from '@material-ui/core/Modal';
import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  handleClose: () => void;
  openModal: boolean;
  description: any;
  width: any;
}

class SimpleModal extends React.Component<IProps> {
  public render() {
    const { openModal, handleClose, description, width } = this.props;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openModal}
        onClose={handleClose}
      >
        <ModalWrap width={width}>
          {description}
        </ModalWrap>
      </Modal>
    );
  }
}

// STYLE
const ModalWrap = styled.div`
    max-width: 85%;
    width: ${(props: any) => props.width};
    max-height:85%;
    background-color: #FFF;
    border-radius: 5px;
    box-shadow: 3px 3px 15px;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);  
    background-color: #FAFAFA;
`
export default SimpleModal;
