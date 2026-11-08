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
import CalendarPage from './features/calendar/CalendarPage.jsx'
import ProfilePage from './features/profile/ProfilePage.jsx'
import AppearancePage from './features/appearance/AppearancePage.jsx'
import SiteStatsPage from './features/siteStats/SiteStatsPage.jsx'
import RegistrationsPage from './features/registrations/RegistrationsPage.jsx'
import { InboxSection, ContentSection, SettingsSection } from './components/sections.jsx'

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
              <Route path='/calendar' element={<CalendarPage />} />

              {/* פניות והרשמות - שתי לשוניות */}
              <Route element={<InboxSection />}>
                <Route path='/contacts' element={<ContactsList />} />
                <Route path='/registrations' element={<RegistrationsPage />} />
              </Route>

              {/* תוכן האתר - שלוש לשוניות */}
              <Route element={<ContentSection />}>
                <Route path='/images' element={<ImagesPage />} />
                <Route path='/videos' element={<VideosPage />} />
                <Route path='/site' element={<SiteStatsPage />} />
              </Route>

              {/* הפרופיל שלי - נפתח מהעיגול עם השם (למטה בתפריט / למעלה בטלפון) */}
              <Route path='/me' element={<ProfilePage />} />

              {/* הגדרות */}
              <Route element={<SettingsSection />}>
                <Route path='/settings/managers' element={<ManagersPage />} />
                <Route path='/settings/appearance' element={<AppearancePage />} />
              </Route>
              {/* /settings לבד - פותח את הלשונית הראשונה. וכתובות ישנות - מפנים לכתובות החדשות */}
              <Route path='/settings' element={<Navigate to='/settings/managers' replace />} />
              <Route path='/managers' element={<Navigate to='/settings/managers' replace />} />
              <Route path='/appearance' element={<Navigate to='/settings/appearance' replace />} />
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
