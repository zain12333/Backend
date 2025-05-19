import { set } from "mongoose";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppcontextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);


   const getAuthState = async () => {
    try {
      const {data} = await axios.get(backendurl + '/api/auth/isloggedin')

      if (data.success) {
        setIsLoggedin(true);
        getuserData();
      }
      // data.success ? setIsLoggedin(data.isLoggedin) : toast.error(data.message)

    } catch (error) {
      toast.error(error.message);
      }
      }
  
  const getuserData = async () => {
    try {
      const {data} = await axios.get(backendurl + '/api/auth/is-auth')
      data.success ? setUserData(data.UserData) : toast.error(data.message)

    } catch (error) {
      toast.error(error.message);
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
