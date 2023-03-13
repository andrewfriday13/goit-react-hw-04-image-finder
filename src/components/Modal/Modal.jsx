import {Component} from "react"
import PropTypes from 'prop-types';
import css from '../../style/styles.module.css'

import { createPortal } from "react-dom"

const modalRoot =document.querySelector('#modal-root')
export class Modal extends Component{

  componentDidMount(){

    document.addEventListener('keydown', this.closeModal)
  }

  componentWillUnmount(){
    document.removeEventListener('keydown',this.closeModal)
  }

  closeModal = ({code, target, currentTarget}) =>{
    if(code === 'Escape' || target === currentTarget) {
     this.props.onClose()
    }
  }

 render(){
  const {closeModal} = this
  return(
    createPortal(<div className={css.Overlay} onClick={closeModal }
   >
    <div className={css.Modal}>{this.props.children}</div>
    </div>, modalRoot)
  )
 }
}


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}