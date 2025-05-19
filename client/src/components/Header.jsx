import React, { useContext } from 'react'; // ✅ Add useContext here
import { assets } from '../assets/assets';
import { AppContext } from '../context/Appcontext';
// import axios from 'axios';

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img src={assets.header_img} alt="header" className='w-36 h-36 rounded-full mb-6' />
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
        Hey {userData ? userData.name : 'Developer'}!
        <img className='w-8 aspect-square' src={assets.hand_wave} alt='' />
      </h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb'>Welcome to our App</h2><br />
      <p>Let's start with a quick product tour and you'll be up and running in no time.</p><br />
      <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-400 transition-all'>Get Started</button>
    </div>
  );
};

export default Header;
