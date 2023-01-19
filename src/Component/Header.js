import React from 'react'
import {BsFacebook} from 'react-icons/bs'
const Header = () => {
  return (
    <div className='grid grid-cols-3 bg-slate-600'>
        {/* left */}
        <div>
            <BsFacebook className='h-6 w-6'/>
        </div>
        {/* Center */}
        <div>
            <input/>
        </div>
        {/* right */}
        <div>
            logo
        </div>
    </div>
  )
}

export default Header