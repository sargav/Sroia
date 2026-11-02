import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from './authSlice'
import { useLogoutMutation } from './authApiSlice'
import apiSlice from '../../app/apiSlice'

// התנתקות - משמש גם בתפריט (במחשב) וגם בעמוד הפרופיל (בטלפון)
const useLogout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutRequest] = useLogoutMutation()

    return async () => {
        try {
            await logoutRequest().unwrap()          // השרת מוחק את העוגייה
        } catch (err) {
            console.log('שגיאה בהתנתקות:', err.status) // גם אם נכשל - מנתקים בצד שלנו
        }
        dispatch(logOut())                           // מרוקנים את המגירה
        dispatch(apiSlice.util.resetApiState())      // מוחקים את הנתונים מהזיכרון
        navigate('/login', { replace: true })
    }
}

export default useLogout
