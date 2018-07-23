import React from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';


const errorHandler = (WrappedComponent) => {
  return (props) => {
    return (
      <Aux>
        <Modal>
        code broke.
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default errorHandler;
