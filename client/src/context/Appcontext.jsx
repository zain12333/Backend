import axios from 'axios';
import { set } from "mongoose";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axiosPrivate from '../utils/axiosPrivate';
import axiosPublic from '../utils/axiosPublic';


export const AppContext = createContext();

export const AppcontextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthState = async () => {
    try {
      const {data} = await axiosPrivate.get(backendurl + '/api/auth/is-auth')
      if (data.success) {
        setIsLoggedin(true);
        getuserData();
      }
      } catch (error) {
      if (error.response && error.response.status !== 401) {
        toast.error(error.response?.data?.message || 'Auth check failed');
      }
    }
  }

  const getuserData = async () => {
    try {
      const {data} = await axiosPrivate.get(backendurl + '/api/user/data')
      
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        // Not logged in, don't show error
        setUserData(false);
      } else if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Network');
      }
    }
  }
  

      useEffect(() => {
        getAuthState();
      }, []);
  
  const value = {
    backendurl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getuserData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
export default AppcontextProvider;
