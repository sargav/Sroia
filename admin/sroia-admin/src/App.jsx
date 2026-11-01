import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './features/auth/Login.jsx'
import PersistLogin from './features/auth/PersistLogin.jsx'
import RequireAuth from './features/auth/RequireAuth.jsx'
import Layout from './components/Layout.jsx'

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
              {/* זמני: כאן ייכנסו המסכים (פניות, תמונות...) */}
              <Route index element={<p>התחברת בהצלחה. כאן יופיעו הפניות</p>} />
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
