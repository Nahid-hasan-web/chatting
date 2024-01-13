import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo:  localStorage.getItem('users')
   
  },
  reducers: {
    userLoginInfo: (state , action) =>{
        state.userInfo = action.payload? JSON.parse(localStorage.getItem('user')) :  null
    }
  },
})

// Action creators are generated for each case reducer function
export const { userLoginInfo} = counterSlice.actions

export default counterSlice.reducer