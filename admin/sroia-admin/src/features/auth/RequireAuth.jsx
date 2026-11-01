import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectToken } from './authSlice'

// השומר בכניסה: יש טוקן במגירה - נכנסים. אין - שולח למסך ההתחברות
const RequireAuth = () => {
    const token = useSelector(selectToken)
    const location = useLocation()

    if (!token) {
        // state.from = לאן ניסו להיכנס, כדי לחזור לשם אחרי ההתחברות
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    // Outlet = "תציג כאן את העמוד שבתוכי"
    return <Outlet />
}

export default RequireAuth
