import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import Login from './components/Login'
import Home from './container/Home'
import { fetchUser } from './utils/fetchUser'

export const App = () => {

const navigate = useNavigate();

useEffect(() => {
  const user = fetchUser();

  if (!user) navigate('/login');
}, []);

  return (
    <Routes>
      <Route path='login' element={<Login />}/>
      <Route path='/*' element={<Home />}/>
    </Routes>
  )
}

export default App
