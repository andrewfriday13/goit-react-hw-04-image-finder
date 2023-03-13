import {Component} from "react"
import PropTypes from 'prop-types';

import css from '../../style/styles.module.css'
export class Searchbar extends Component {
  state ={
    search: ' ',
  }

  handleChange = ({target}) => {
    const {name,value} =target
    this.setState({[name]: value})

  }


  handleSubmit=(event)=>{
    event.preventDefault()
    this.props.onSubmit({...this.state})
    this.setState({search: ' '})

  }


 render(){
  const {handleSubmit, handleChange } = this
  const {search} = this.state
  return (
  <header className={css.searchbar}>
  <form className={css.SearchForm}
    onSubmit={handleSubmit}>
    <input
    className={css['SearchForm_input']}
      img={search}
      onChange={handleChange}
      type="text"
      autoComplete="off"
      autoFocus
      name="search"
      placeholder="Search images and photos"
    />
     <button type="submit" className={css['SearchForm-button']}>
      <span>Search</span>
    </button>
  </form>
</header>
 )
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}