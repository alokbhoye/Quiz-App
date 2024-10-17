import { useState } from 'react'
import './App.css'
import logo from '../public/Frame.png'

function App() {

  return (
    <>
    <div className=' bg-purple-300 h-screen'>
    <div className="flex items-center justify-center">
      <img 
        className="w-[291px] h-[70px] mt-[40px]" 
        src={logo} 
        alt="Logo"
    />
    </div> 
</div> 
 </>
  )
}

export default App
