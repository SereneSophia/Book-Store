import React from 'react'
import { Link } from 'react-router-dom'
import bookPic from '../assets/awardbooks.png'

const PromoBanner = () => {
  return (
    <div className='mt-16 py-12 bg-teal-100 px-4 lg:px-24'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-12'>
            <div className='md:w-1/2'>
                <h2 className='text-4xl font-bold mb-6 leading-snug'>Become a verified seller with premium accesses!</h2>
                <p className='mb-6'>(Do this only if you have <span className='font-bold'>logged into your NonoBook account</span>! Otherwise you can't buy premium but you still have access to premium subscripton page)</p>
                <Link to="/premium-subscription" className='block'><button className='bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300'>Get Premium</button></Link>
            </div>

            <div>
                <img src={bookPic} alt="" className='w-96'/>
            </div>
        </div>
    </div>
  )
}

export default PromoBanner