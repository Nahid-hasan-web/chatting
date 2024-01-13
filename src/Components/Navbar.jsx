
import {  NavLink } from 'react-router-dom'
import { ImHome3 } from "react-icons/im";
import { RiMessengerLine } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { IoCloudUploadOutline } from "react-icons/io5";
// import from react croper
import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString , getDownloadURL } from "firebase/storage";
const Navbar = () => {
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState();
  const cropperRef = createRef()
  const [ppUpload , setPpUpload] = useState(false)
  const storage = getStorage();
const storageRef = ref(storage, 'pera ache  mara khao');
  const handelProfileUpload = (e)=>{
    e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result );
        };
        reader.readAsDataURL(files[0]);
  }

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        console.log('pera nai');

        getDownloadURL(storageRef)
        .then((downloadURL) => {
          console.log('File available at', downloadURL);
          
        });
      });

    }
  }

const handelUpload  = ()=>{
  setPpUpload(false)
  setImage('')
}

  return (
    <>
      <div className="navbar">
          <div className="container">
            <div className="main_menu">
            <div className="menu">
                <ul>
                  <li><NavLink className={({isActive})=> isActive? 'text-white':'text-black'} to='/Home'><ImHome3 /></NavLink></li>
                  <li><NavLink className={({isActive})=> isActive? 'text-white':'text-black'} to='/Messeges'><RiMessengerLine /></NavLink></li>
                  <li><NavLink className={({isActive})=> isActive? 'text-white':'text-black'} to='/'><LuLogOut /></NavLink></li>
                </ul>
              </div>

              <div className="user_part">
                <div className="user_name">
                  <h2>MD : Nahid Hasan</h2>
                </div>
                <div className="user_image">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq2k2sI1nZyFTtoaKSXxeVzmAwIPchF4tjwg&usqp=CAU" alt="user image" />
                  <div onClick={()=> setPpUpload(true)} className="upload_icon">
                  <IoCloudUploadOutline />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>




{   

ppUpload  && 

<div className="container">
    <div className="setProfile ">
        <div className="profileImageUpload">
          <h2>Upload Profle Pictue</h2>
          <div className="ppicture overflow-hidden">
            <div className="img-preview w-full h-full"></div>
          </div>

        <div className="upload_input">
        <input onChange={handelProfileUpload} type="file" /> 
        </div>

        {
          image &&
          <Cropper
          ref={cropperRef}
          style={{ height: 300, width:300}}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
    />
        }
  
        <div className="ppUpload_buttons">
          <button onClick={getCropData} className='upload_button'>Upload</button>
          <button onClick={handelUpload} className='upload_cancel_button'>Cencal</button>
        </div>

        </div>
    </div>
    </div>
}


    </>
  )
}

export default Navbar