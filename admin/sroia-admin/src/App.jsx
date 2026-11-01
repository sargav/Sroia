import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './features/auth/Login.jsx'
import PersistLogin from './features/auth/PersistLogin.jsx'
import RequireAuth from './features/auth/RequireAuth.jsx'
import Layout from './components/Layout.jsx'
import ContactsList from './features/contacts/ContactList.jsx'
import HomePage from './features/home/HomePage.jsx'
import ImagesPage from './features/images/ImagesPage.jsx'
import VideosPage from './features/videos/VideosPage.jsx'
import ManagersPage from './features/managers/ManagersPage.jsx'

function App() {
  return (
    <Router>
      <Routes>
        {/* פתוח לכולם */}
        <Route path='/login' element={<Login />} />

        {/* 1. PersistLogin - מחזיר את הטוקן אחרי רענון דף
            2. RequireAuth  - בלי טוקן, שולח ל-/login
            3. Layout       - התפריט והמסגרת */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path='/contacts' element={<ContactsList/>} />
              <Route path='/managers' element={<ManagersPage />} />
              <Route path='/images' element={<ImagesPage />} />
              <Route path='/videos' element={<VideosPage />} />
              <Route path='/me' element={<p>כאן יופיעו פרטי המנהל כרגע</p>} />
            </Route>
          </Route>
        </Route>

        {/* כתובת שלא קיימת - חוזרים לעמוד הראשי */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  )
}

export default App
