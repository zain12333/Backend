import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import axios from 'axios'

const backendurl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const Resetpassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isotpsubmitted, setIsOtpSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Send reset OTP to email
  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${backendurl}/api/auth/send-reset-otp`, { email });
      setIsEmailSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // 2. OTP form (skip verify-reset-otp, just show new password form after OTP input)
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setIsOtpSubmitted(true);
  };

  // 3. Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${backendurl}/api/auth/reset-password`, { email, otp, newPassword });
      setLoading(false);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
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
      {/* 1. Email form */}
      {!isEmailSent && (
        <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text:sm' onSubmit={handleSendEmail}>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
          <p className='text-center mb-6 text-indigo-300 '>Enter your registered email address</p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt='' className='w-3 h-3'/>
            <input type="email" placeholder='Email id' className='bg-transparent outline-none text-white'
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          {error && <div className='text-red-400 text-center mb-2'>{error}</div>}
          <button type='submit' className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3' disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      )}

      {/* 2. OTP form (skip verify-reset-otp, just show new password form after OTP input) */}
      {!isotpsubmitted && isEmailSent && (
        <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text:sm' onSubmit={handleOtpSubmit}>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
          <p className='text-center mb-6 text-indigo-300 '>Enter the 6-digit code sent to your email id</p>
          <input
            type='text'
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className='w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white outline-none text-center tracking-widest text-lg'
            placeholder='Enter OTP'
            maxLength={6}
            required
          />
          {error && <div className='text-red-400 text-center mb-2'>{error}</div>}
          <button
            type='submit'
            className='w-full py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all disabled:opacity-60'
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      )}

      {/* 3. New password form (calls /reset-password with email, otp, newPassword) */}
      {isotpsubmitted && isEmailSent && (
        <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text:sm' onSubmit={handleResetPassword}>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
          <p className='text-center mb-6 text-indigo-300 '>Enter the new password below</p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt='' className='w-3 h-3'/>
            <input type="password" placeholder='New password' className='bg-transparent outline-none text-white'
              value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6} />
          </div>
          {error && <div className='text-red-400 text-center mb-2'>{error}</div>}
          <button type='submit' className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3' disabled={loading}>
            {loading ? 'Resetting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  )
}

export default Resetpassword
