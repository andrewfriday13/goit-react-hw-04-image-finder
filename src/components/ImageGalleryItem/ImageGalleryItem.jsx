import PropTypes from 'prop-types';
import css from '../../style/styles.module.css'



export const ImageGalleryItem =({webformatURL, largeImageURL,openModal, tags})=>{
  return(
    <li className={css.ImageGalleryItem} >
  <img 
  className={css['ImageGalleryItem-image']}
  src={webformatURL} 
  alt={tags} 
  width='200'
  onClick={()=>{openModal(largeImageURL)}} />
</li>
  )
}

ImageGalleryItem.propTypes ={
  // id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  tags: PropTypes.string,
}