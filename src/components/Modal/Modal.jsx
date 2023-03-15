import { useEffect} from "react"
import PropTypes from 'prop-types';
import css from '../../style/styles.module.css'

import { createPortal } from "react-dom"

const modalRoot =document.querySelector('#modal-root')


export const Modal = ({ onClose, children }) => {
  const closeModal = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const pressKey = ({ code }) => {
      if (code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', pressKey);
    return () => {
      document.removeEventListener('keydown', pressKey);
    };
  }, [onClose]);

  return(
    createPortal(<div className={css.Overlay} onClick={closeModal }
   >
    <div className={css.Modal}>{children}</div>
    </div>, modalRoot)
  )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

