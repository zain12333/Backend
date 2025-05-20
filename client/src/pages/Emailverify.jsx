import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Emailverify = () => {
  const navigate = useNavigate();
  const { backendurl, userData, getuserData } = useContext(AppContext);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        backendurl + '/api/auth/verify-account',
        { otp, userid: userData && userData._id },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success('Account verified successfully!');
        getuserData && getuserData();
        navigate('/');
      } else {
        toast.error(data.message || 'Verification failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
         <img
               onClick={() => navigate('/')}
               src={assets.logo}
               alt="background"
               className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
             />
     <form onSubmit={handleSubmit} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text:sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-300 '>Enter the 6-digit code sent to your email id</p>
        <input
          type='text'
          value={otp}
          onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className='w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white outline-none text-center tracking-widest text-lg'
          placeholder='Enter OTP'
          maxLength={6}
        />
        <button
          type='submit'
          className='w-full py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all disabled:opacity-60'
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

    </div>
  )
}

export default Emailverify
