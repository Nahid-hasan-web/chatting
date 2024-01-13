
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import Messeges from './Components/Messeges'

function App() {

  return (
    <>

    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/Messeges' element={<Messeges/>}/>
    </Routes>
    </>
  )
}

export default App
