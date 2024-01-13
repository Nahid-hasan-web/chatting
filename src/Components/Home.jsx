import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux';
import UserList from './UserList';
import Friend from './Friend'; 




 



import FriendRequest from './FriendRequest';
import Groupes from './Groupes';
import MyGroupes from './MyGroupes';
import BlockList from './BlockList';
import { useNavigate } from 'react-router-dom';
const Home = () => {

  const data = useSelector((json)=> console.log(json))
  const navigate = useNavigate()

  useEffect(()=>{
        if(data){
          navigate('/')
        } 
  },[])


useEffect(()=>{

},[])


  return (
    <>
      <Navbar/>

    <div className="container">
        <div className="allPart">
              <UserList/>
              <Friend/>
              <FriendRequest/>
              <Groupes/>
              <MyGroupes/>
              <BlockList/>
        </div>
      </div>
    </>
  )
}

export default Home