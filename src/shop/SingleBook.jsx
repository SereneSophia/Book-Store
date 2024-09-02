import React from 'react'
import { useLoaderData } from 'react-router-dom'

const SingleBook = () => {
    const {id, title, image_url} = useLoaderData();
  return (
    <div className='mt-28 px-4 lg:px-24 '>
        <img src={image_url} alt='' className='h-96'/>
        <h2>{title}</h2>
    </div>
  )
}

export default SingleBook