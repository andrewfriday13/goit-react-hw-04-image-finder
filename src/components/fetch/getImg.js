import axios from 'axios';

// export const getImg = async(serchImg, page)=>{

//   const BASE_URL =`https://pixabay.com/api/`
//   const KEY_API = `33041126-3ffd63b5fde94b48036de795f`
 
//  return fetch(`${BASE_URL}?key=${KEY_API}&q=${serchImg}&page=${page}&per_page=3`)

// }

export const getImg = async (serchImg, page) => {
  const BASE_URL =`https://pixabay.com/api/`
  const KEY_API = `33041126-3ffd63b5fde94b48036de795f`
  const response = await axios.get(
    `${BASE_URL}?key=${KEY_API}&q="${serchImg}"&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );

  return response.data;
};
