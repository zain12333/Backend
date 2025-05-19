import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setUserData, setIsLoggedin } = useContext(AppContext);
  return (
    <div className='w-full flex justify-between items-center  p-4 sm:p-6 sm:px-24 absolute top-0 '>
        <img src={assets.logo} alt="logo" className='w-28 h-20 sm:w-32'/>
        {userData ?
        <div className='w-8 h-8 justify-center items-center flex rounded-full bg-gray-900 text-gray-100 font-semibold relative group'>
          {userData.name[0].toUpperCase()}
        </div>
        :   <button  onClick={()=>navigate('/login')} className='flex items-center gap-2 border border-gray-50   rounded-full px-6 py-2 text-gray-800   hover:bg-gray-100
        transition-all'>Login<img src={assets.arrow_icon} alt=''/></button>
        }
    </div>
  )
}

export default Navbar
