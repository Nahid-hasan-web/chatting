import Lottie from 'lottie-react'
import React, { useState } from 'react'
import animation from '../assets/Animation - 1702995691105.json'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import '../firebase.config'
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSSProperties } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useDispatch } from 'react-redux';
import {userLoginInfo} from '../Slices/CounterSlice'
const Login = () => {
  // ============ firebase all codes 
  const auth = getAuth();
  const dispatch = useDispatch()
  const navigaet  = useNavigate()
  // ================ ustate hooks part start
 const  [email , setEmail] = useState('')
 const [password , setPassword] = useState('')
 const [show , setShow] = useState(true)
 const [loading , setLoading] = useState(false)
//  ================ errors part start 
const [emailError , setEmailError] = useState('')
const [passwordError , setPasswordError] = useState('')
// ============= functions part start 
const handelShow = ()=>{
    setShow(!show)
}
const handelEmail = (e)=>{
      setEmail(e.target.value)
}
const handelPassword = (e)=>{
  setPassword(e.target.value)
}

const handelSubmit  =(e)=>{
   e.preventDefault() 
   if(email !== ''){
    setEmailError('')
   }
   if(email == ''){
    setEmailError('Please Enter your email')
   }
   if(password !== ''){
    setPasswordError('')
   }
   if(password == ''){
    setPasswordError('Please enter your password')
   }

else{
  setLoading(true);

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    setLoading(false);
    localStorage.setItem('users' , JSON.stringify(user))
    navigaet('/Home')
    dispatch(userLoginInfo(user))
    console.log(user)
    toast.success('login Success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setLoading(false);
    if(errorCode){
      toast.error('ID NOT FOUND', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  });



}

}


  return (



    <>
     <ToastContainer />
      <div className="main_auth">
          <div className="login_animation">
            <Lottie animationData={animation}/>
          </div>
          <div className="loginFrom">
            <div className="mainForm">
            <form onSubmit={handelSubmit}>
              <h1>Log-IN</h1>
              {/* ------- email  part start ----------- */}
              <h3>Email</h3>
              <input onChange={handelEmail} type="email"  placeholder='Please Enter your email'/>
              <p className='error'>{emailError}</p>

              {/* --------- password part start ------------ */}
              <h3>Password</h3>
              <div className="password_part relative">
              {
                show?
                <IoMdEyeOff  onClick={handelShow}  className='text-lg text-blue-400 absolute top-[50%] translate-y-[-50%] right-3'/>
                  :
                <IoMdEye onClick={handelShow} className='text-lg text-blue-400 absolute top-[50%] translate-y-[-50%] right-3' />

              }

              <input onChange={handelPassword} type={show? 'password' : 'text'}  placeholder='Please Enter your email'/>
              </div>
              <p className='error'>{passwordError}</p>
              {/* ---------- form buttons ---------------- */}
              {
                loading?

                <div className="preloader"><ScaleLoader color="#fff" /></div>
                :
                <button>Login</button>
              }
             
            </form>
            <div className="register_page">
              <h2>Don't have an account? <Link  className='authencation' to='/Register'>Register</Link></h2>
              <h4>Forget password?</h4>
            </div>
            </div>
         
          </div>
      </div>
    </>
  )
}

export default Login