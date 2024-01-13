import Lottie from 'lottie-react'
import React, { useDebugValue, useState } from 'react'
import animation from '../assets/Animation - 1702995691105.json'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import '../firebase.config';
import { getAuth, createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { getDatabase, ref, set } from "firebase/database";
import { useDispatch } from 'react-redux';
const Register = () => {
  // =========== firebase er kahini
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate()
  const dispathch = useDispatch()
  // ==============  input states 
  const [email , setEmail] = useState(true)
  const [password , setPassword] = useState('')
  const [userName , setuserName] = useState('')
  // =============== errors part start 
  const [userNameError , setuserNameError] = useState()
  const [emailError , setEmailError] = useState()
  const [passwordError , setPasswordError] = useState()
  const [show , setShow] =  useState(true)
  const [loding , setLoding] = useState(false)
  // =============== functions part start 
  
  const handeluserName = (e)=>{
    setuserName(e.target.value)
    
  }
  console.log(userName)
  const handalEmail = (e)=>{
    setEmail(e.target.value);
    console.log(email)
}
  const handelPassword = (e)=>{
     setPassword(e.target.value)
     console.log(password)
  }

const handelShow  = ()=>{
    setShow(!show)
    console.log('click hocce')
}
  const handelSubmit = (e)=>{
    e.preventDefault() 
    

    if(userName == ''){
      setuserNameError("Enter your userName Name")
    }
  
    if( email == ''){
      setEmailError('Please Enter your  email')
    }
  
    if(password == ''){
      setPasswordError('Please give an password')
    }
    else{
      // =========== firebase  codes sing up ============
      createUserWithEmailAndPassword(auth, email, password)
      
      .then((userCredential) => { 
        console.log('eta auth',auth.currentUser) 
    

    
        // --------- react  toastify 
        toast.success('Sing-UP Successfuly ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          setLoding (true)
          // navigate('/')
          setuserName('')
          setEmail('')
          setPassword('')
          // ================ user information
          updateProfile(auth.currentUser, {
            displayName:userName, 
            photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9XYwkxuAsCVT8G1Ql3EMddIFV0nhvukM9Tg&usqp=CAU'
          })
          // ================== data base part start
          .then(()=>{
         
            set(ref(db,'user/'+ auth.currentUser.uid), {
              username: auth.currentUser.displayName,
              email:auth.currentUser.email,
             });

             console.log(auth.currentUser.displayName)
            })
            // ================= data base part end 
          
          .then(() => {
            const user = userCredential.user;
            console.log(user)
            setLoding(false)
          })
          .catch((error) => {
          });


      })


      .catch((error) => {
      setLoding(false)
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode || errorMessage){
        toast.error('Email Alredy Taken', {
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
    <ToastContainer />
      <div className="main_auth">
          <div className="login_animation">
            <Lottie animationData={animation}/>
          </div>
          <div className="loginFrom">
            <div className="mainForm">
            <form onSubmit={handelSubmit}>
              <h1>Register</h1>
              {/* ------- userName  part start ----------- */}
              <h3>userName Name</h3>
              <input onChange={handeluserName} type="text"  placeholder='Please Enter userName Name'/>
              <p className='error'>{userNameError}</p>
              {/* ------- email  part start ----------- */}
              <h3> Email</h3>
              <input onChange={handalEmail} type="email"  placeholder='Please Enter your email'/>
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
              <input onChange={handelPassword} type={show? 'password' : 'text' }placeholder='Please set your password'/>
              </div>
              <p className='error'>{passwordError}</p>
              {/* ---------- form buttons ---------------- */}
                {
                  loding?
                  <div className="preloader"><ClipLoader color="#fff" /></div>
                  :
                  <button>Register</button>
                }

              
             
            </form>
            <div className="register_page">
              <h2> Alredy have an account? <Link className='authencation' to='/'>Log-In</Link></h2>
             
            </div>
            </div>
         
          </div>
      </div>
    </>
  )
}

export default Register