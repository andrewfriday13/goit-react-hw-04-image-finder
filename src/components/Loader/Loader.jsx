import { ColorRing } from 'react-loader-spinner'

export const Loader = ()=>{
 return <ColorRing
    visible={true}
    height="150"
    width="150"
    ariaLabel="blocks-loading"
    wrapperStyle={{
      marginTop: '50px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
    wrapperClass="blocks-wrapper"
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
 
}