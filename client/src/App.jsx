import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Layout from './components/Layout'
import HomePage from './HomPage/HomePage'
import Contact from './contact/Contact'
import Benefit from './NegevBenefit/Benefit'
import GuidePage from './GuidBuilder/GuidePage'
import ThankYouPage from "./GuidBuilder/ThankYouPage";
import BaitCourse from './Bait2Yadaim/BaitCourse'
import Pay from './Bait2Yadaim/pay'
import ProjectManagement from './Projects/ProectsMan'
import AppMazpen from './AppMazpen/pages/AppMazpen'
function App() {

  return (
    <div>
      <Router  basename="/Sroia" >
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<div><HomePage /></div>} />
            <Route path='/about' element={<>אודות</>}/>
            <Route path='/projects' element={<ProjectManagement />} />
            <Route path='/courses' element={<div><BaitCourse /></div>} />
            <Route path='/application' element={<div><AppMazpen/></div>} />
            <Route path='/guid-to-builder' element={<div><GuidePage /></div>} />
            <Route path='/thank-you' element={<div><ThankYouPage /></div>} />
            <Route path='/benefit' element={<div><Benefit /></div>} />
            <Route path='/contact' element={<div><Contact /></div>} />
            <Route path='/pay' element={<div><Pay /></div>} />

          </Route>
        </Routes>
      </Router>
    </div>


  )
}

export default App
