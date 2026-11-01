import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { logOut } from '../features/auth/authSlice'
import { useLogoutMutation } from '../features/auth/authApiSlice'
import apiSlice from '../app/apiSlice'

// המסגרת של הפאנל: כאן ייכנס תפריט הצד (Menu), ובאמצע - העמוד הנוכחי (Outlet).
// בינתיים יש רק כפתור התנתקות, את העיצוב נבנה בשלב הבא
const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutRequest] = useLogoutMutation()

    const handleLogout = async () => {
        try {
            await logoutRequest().unwrap()      // השרת מוחק את העוגייה
        } catch (err) {
            console.log('שגיאה בהתנתקות:', err.status) // גם אם נכשל - מנתקים בצד שלנו
        }
        dispatch(logOut())                       // מרוקנים את המגירה
        dispatch(apiSlice.util.resetApiState())  // מוחקים את כל הנתונים מהזיכרון (פניות וכו')
        navigate('/login', { replace: true })
    }

    return (
        <div>
            <header>
                <button type="button" onClick={handleLogout}>התנתקות</button>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
