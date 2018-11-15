import React, {Component} from 'react';
import styled             from 'styled-components';
import PropTypes          from 'prop-types';

const Wrapper = styled.div`
 
`;

class Modal extends Component {
  render() {
    return (this.props.status ?
      <Wrapper className={`${this.props.status ? 'modal is-active' : 'modal'}`}>
        <div className="modal-background"/>
        {this.props.contentModal}
        <button className="modal-close is-large" onClick={() => this.props.handelModalClose(this.props.nameModal)} aria-label="close"/>
      </Wrapper> : null
    );
  }
}

Modal.propTypes = {
  status: PropTypes.bool.isRequired,
  nameModal: PropTypes.string.isRequired,
  contentModal: PropTypes.node.isRequired,
  handelModalClose: PropTypes.func.isRequired,
};


export default Modal;