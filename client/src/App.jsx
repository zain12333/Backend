import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Emailverify from './pages/Emailverify'
import Resetpassword from './pages/Resetpassword'
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Emailverification" element={<Emailverify />} />
        <Route path="/Resetpassword" element={<Resetpassword />} />
      </Routes>

    </>
  )
}

export default App
