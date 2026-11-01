import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './features/auth/Login.jsx'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <div>
      <Router>
        <Routes>
          {/* Layout component will be rendered here */}
          <Route path='/' element={<Outlet />}>
          <Route index element={<Login />} />

          </Route>
        </Routes>
      </Router>
    </div>

  )
}

export default App
