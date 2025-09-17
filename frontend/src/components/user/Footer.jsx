import React from 'react'

const Footer = () => {
  return (
    <div className='h-25 bg-[#F06E00] relative'>
      <div className='absolute flex flex-col items-center cursor-pointer left-1/2 -translate-x-1/2 -translate-y-1/2  -top-0'>
      <img className=' w-20 bg-white h-20 rounded-full p-2' src="https://www.goodsmile.com/img/common/face.svg?202406" alt="" />
      <p className='text-lg font-semibold text-white'>Back to top</p>
      </div>
     
    </div>
  )
}

export default Footer