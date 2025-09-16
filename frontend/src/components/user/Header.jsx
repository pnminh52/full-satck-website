import React from 'react'

const Header = () => {
  return (
    <div className='h-16 flex items-center justify-between sm:px-20 px-4 md:px-8 border-b border-gray-300'>
      <img className='w-30' src="https://www.goodsmile.com/img/common/logo.svg" alt="" />
      <ul className='flex items-center gap-4'>
        <li>Search</li>
        <li>Cart</li>
        <li>Login</li>
      </ul>
    </div>
  )
}

export default Header