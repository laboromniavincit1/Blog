import { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import authService from './appwrite/auth/auth';
import {login, logout} from './store/authSlice'
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrenUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .finally(setLoading(false))
  },[])



  return !loading ? <></> :null
  // return (
  //   <>
  //   </>
  // );
}

export default App;
