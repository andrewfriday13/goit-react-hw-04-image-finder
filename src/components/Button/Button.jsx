import PropTypes from 'prop-types';
import css from '../../style/styles.module.css'

export const Button =({onClick})=>{
    
    return(
        <div >
            <button  className={css.Button} onClick={onClick} type="button"> more</button>
        </div>
    )
  
}
Button.propTypes={
    onClick: PropTypes.func.isRequired,
}
