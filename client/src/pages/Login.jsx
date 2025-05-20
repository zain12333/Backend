// import { assert } from 'console';  so this is reason that not show the result  in the website
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext} from '../context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosPublic from '../utils/axiosPublic';


const Login = () => {
  const navigate = useNavigate();
  const { backendurl, setIsLoggedin, getuserData, userData } = useContext(AppContext);

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    try {

      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendurl}/api/auth/register`, {
          name,
          email,
          password,
      });

        if (data.success) {
          alert('Account Created Successfully');
          setIsLoggedin(true);
          getuserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axiosPublic.post(`${backendurl}/api/auth/login`, {
          email,
          password,
        },{ withCredentials: true } 
      );

        if (data.success) {
        toast.success('Logged in Successfully');
        setIsLoggedin(true);
        console.log(userData , 'userData')
        getuserData(); 
        console.log(userData , 'userData')
        // Wait for state to update, then navigate
        navigate('/');
      } else {
        toast.error(data.message);
      }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="background"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-center text-white mb-3">
          {state === 'Login' ? 'Login' : 'Create Account'}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
        </p>

        <form onSubmit={onsubmitHandler}>
          {state === 'Sign Up' && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="person" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none w-full"
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="mail" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your Email"
              required
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="lock" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="bg-transparent outline-none w-full"
            />
          </div>

          <p
            onClick={() => navigate('/resetpassword')}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forget Password
          </p>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-900 text-white font-medium"
          >
            {state}
          </button>
        </form>

        {state === 'Sign Up' ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-blue-400 cursor-pointer underline"
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
