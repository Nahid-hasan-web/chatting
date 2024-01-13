import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from './Slices/CounterSlice'
export default configureStore({
  reducer: {
    userLoginInfo : counterReducer
  },
})