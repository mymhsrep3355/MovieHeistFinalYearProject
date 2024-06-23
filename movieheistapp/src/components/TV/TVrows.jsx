import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TVitems from './TVitems.jsx'
const TVrows = ({title, url}) => {
  const [TVshows, setTVshows] = useState({});
  useEffect(() =>{
    axios.get(url).then((response) => setTVshows(response.data.results));
  }, []);
  console.log(TVshows);
  return (
    <>
    <h1 className=' text-xl font-sans md:text-xl p-4 capitalize'>{title}</h1>
    <div className='relative flex items-center'>
      <div
      id={`scroll-slider`}
      className='w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'
      >{Array.isArray(TVshows) && TVshows?.map((show) => (
          <TVitems
          key={show.id}
          show={show}
          >
        </TVitems>
      ))}</div>
    </div>
    </>
  )
}

export default TVrows