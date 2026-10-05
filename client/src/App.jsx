import { lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Layout from './components/Layout'
import HomePage from './HomPage/HomePage'

// כל עמוד חוץ מדף הבית נטען רק כשנכנסים אליו, כדי שדף הבית ייפתח מהר
const Contact = lazy(() => import('./contact/Contact'))
const Benefit = lazy(() => import('./NegevBenefit/Benefit'))
const GuidePage = lazy(() => import('./GuidBuilder/GuidePage'))
const ThankYouPage = lazy(() => import('./GuidBuilder/ThankYouPage'))
const BaitCourse = lazy(() => import('./Bait2Yadaim/BaitCourse'))
const Pay = lazy(() => import('./Bait2Yadaim/pay'))
const ProjectManagement = lazy(() => import('./Projects/ProectsMan'))
const AppMazpen = lazy(() => import('./AppMazpen/pages/AppMazpen'))
const AccessibilityStatement = lazy(() => import('./accessibility/AccessibilityStatement'))

function App() {

  return (
    <div>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<div><HomePage /></div>} />
            <Route path='/projects' element={<ProjectManagement />} />
            <Route path='/courses' element={<div><BaitCourse /></div>} />
            <Route path='/application' element={<div><AppMazpen/></div>} />
            <Route path='/guid-to-builder' element={<div><GuidePage /></div>} />
            <Route path='/thank-you' element={<div><ThankYouPage /></div>} />
            <Route path='/benefit' element={<div><Benefit /></div>} />
            <Route path='/contact' element={<div><Contact /></div>} />
            <Route path='/pay' element={<div><Pay /></div>} />
            <Route path='/accessibility' element={<AccessibilityStatement />} />

          </Route>
        </Routes>
      </Router>
    </div>


  )
}

export default App
