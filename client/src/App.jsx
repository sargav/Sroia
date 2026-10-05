import { lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Layout from './components/Layout'
import HomePage from './HomPage/HomePage'
import PageTitle from './components/PageTitle'
import NotFound from './components/NotFound'

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
            <Route index element={<PageTitle title="ניהול ופיקוח בבנייה פרטית"><div><HomePage /></div></PageTitle>} />
            <Route path='/about' element={<>אודות</>}/>
            <Route path='/projects' element={<PageTitle title="ניהול ופיקוח פרויקטים"><ProjectManagement /></PageTitle>} />
            <Route path='/courses' element={<PageTitle title="קורס בית בשתי ידיים"><div><BaitCourse /></div></PageTitle>} />
            <Route path='/application' element={<PageTitle title="המצפן לבונה"><div><AppMazpen/></div></PageTitle>} />
            <Route path='/guid-to-builder' element={<PageTitle title="המדריך לבונה"><div><GuidePage /></div></PageTitle>} />
            <Route path='/thank-you' element={<PageTitle title="תודה שנרשמתם"><div><ThankYouPage /></div></PageTitle>} />
            <Route path='/benefit' element={<PageTitle title="הטבה לבוני בתים"><div><Benefit /></div></PageTitle>} />
            <Route path='/contact' element={<PageTitle title="צרו קשר"><div><Contact /></div></PageTitle>} />
            <Route path='/pay' element={<PageTitle title="תשלום עבור הקורס"><div><Pay /></div></PageTitle>} />
            <Route path='/accessibility' element={<AccessibilityStatement />} />
            {/* כל כתובת שלא קיימת באתר */}
            <Route path='*' element={<NotFound />} />

          </Route>
        </Routes>
      </Router>
    </div>


  )
}

export default App
