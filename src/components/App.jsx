import { useEffect, useState } from 'react'
import  { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import { getImg } from './fetch/getImg';

import css from '../style/styles.module.css'

import { Searchbar } from './Search/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from "components/Button/Button";
import { Modal } from './Modal/Modal';

 
 export const App=()=>{
  const [img, setImg] = useState([])
  const[loading, setLoading] = useState(false)
  const[search, setSearch] = useState('')
  const[page, setPage] = useState(1)
  const [totalImg, setTotalImg] = useState(null)
  const[isModalOpen, setIsModalOpen] = useState(false)
  const[imgInModal, setImgInModal] = useState()
  const [btnMore, setBtnMore] = useState(false)

 useEffect(()=>{
  setLoading(true)
  getImg(search, page)
    .then(data => {
      if(data.hits.length===0){
        setImg([])
        console.log('sdf')
        toast('не вірний запит')
       setBtnMore(false)
        return
      }
      setBtnMore(true)
      setImg([img, ...data.hits])
      setTotalImg(data.totalHits)
    })
    .catch(error => toast(error.message))
    .finally(() =>setLoading(false));
    return()=>{console.log('трот')}
 }, [search, page])

  const handleSabmit=({ search }) => {
    setSearch(search.trim())
    setImg([])
    setPage(1)
    document.querySelector('input').value = '';
  };
  const handleMore=()=>{
    console.log('sd')
    setPage(prevPage => prevPage + 1)
  }
  const openModal = (image) => {
     setIsModalOpen(true)
     setImgInModal(image)
   }
   const onClose=()=>{
    setIsModalOpen(!isModalOpen)
    setImgInModal(null)
  }
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
         {(img.length < totalImg && btnMore )&& (<Button onClick={handleMore}/>)}
         {isModalOpen && (
         <Modal onClose={onClose}>
          <img src={imgInModal} alt={img.tags} width='400' />
         </Modal>)}
  
      </div>
    )
  }