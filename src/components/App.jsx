import { Component } from 'react'
import  { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import { getImg } from './fetch/getImg';

import css from '../style/styles.module.css'

import { Searchbar } from './Search/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from "components/Button/Button";
import { Modal } from './Modal/Modal';


export class App extends Component {
  state ={
    img: [],
    loading: false,
    error: null,
    search: '',
    page: 1,
    totalImg: null,
    isModalOpen: false,
    imgInModal: null,

  }
  componentDidUpdate(_, prevState){
    const { search, page} = this.state;


    if (prevState.search !== search || prevState.page !== page) {
     
      this.setState({ loading: true });
      getImg(search, page)

        .then(data => {
          if(data.hits.length<=0){
            this.setState({img:[]})
            toast('не вірний запит')
            return
          }
          this.setState(({ img }) => ({
            img: [...img, ...data.hits],
          }));
          this.setState({ totalImg: data.totalHits });
         
        })

        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleSabmit=({ search }) => {
    this.setState({ search: search.trim(), img: [], page: 1 });
    document.querySelector('input').value = '';
  };
  

  handleMore=()=>{
    this.setState(prevState =>{
      return{
        page: prevState.page +1
      }
    })
  }

  openModal = (image) => {
   this.setState({
    isModalOpen: true, 
    imgInModal: image,})
  }

  closeModal=()=>{
    const {isModalOpen} =this.state
    this.setState({
      isModalOpen: !isModalOpen, 
      imgInModal: null,

    })
  }
  render(){
    const {isModalOpen, img, loading, imgInModal, totalImg} =this.state
    const {handleSabmit, openModal, handleMore, closeModal} =this
  return (
    <div className={css.App}>
      <Toaster
      toastOptions={{
        duration: 1000,
        style: {
          width: '150px',
          background: '#363636',
          color: '#fffa',
        }}}
      />
       <Searchbar onSubmit={handleSabmit} />

       <ImageGallery
        img={img}
        openModal={openModal}
        /> 

       {loading  && (<Loader className={css.Loader}/>)}

       {img.length < totalImg  && <Button onClick={handleMore}/>}

       {isModalOpen && (
       <Modal onClose={closeModal}>
        <img src={imgInModal} alt={img.tags} width='400' />
       </Modal>)}

    </div>
  )}
}
 
