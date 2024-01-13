import React from 'react'
import { HiDotsVertical } from "react-icons/hi";
const BlockList = () => {
  return (
    <>
            <div className="user_box">
              <div className="tittel">
            <h1>Block List</h1>
            <div className="option_icon">
            <HiDotsVertical />
            </div>
        </div>
        <div className="userList">
          <div className="singel_user">
              <div className="user_data">
                  <div className="user_pp">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdKbQP25Pr2Le4qkMrg6MpTnuybLZGxsUeMQ&usqp=CAU" alt="profile pic" />
            </div>
            <div className="uer_Name">
              <h3>নাম বল্লে চাকরি থাকবে না</h3> <p>Bio</p> 
            </div>
              </div>
            <div className="user_button">
              <button className='friend_button block'>UnBlock</button>
            </div>
          </div>
        </div>
        </div>
    </>
  )
}

export default BlockList