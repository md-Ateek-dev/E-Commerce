import React from 'react'
import Home from './Components/Home'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leads from './Components/Leads'

const App = () => {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Dashboard" element={<Dashboard />}/>
        </Routes>
      </Router>
     
    </div>
  )
}

export default App