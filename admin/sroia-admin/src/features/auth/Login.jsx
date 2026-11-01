import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { setToken, selectToken } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {
    // מה יש עכשיו במגירה
    const token = useSelector(selectToken)
    // שליחת פקודות למגירה
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    // הבקשה לשרת: login היא הפונקציה ששולחת, isLoading ו-error מגיעים לבד
    const [login, { isLoading, error }] = useLoginMutation()

    // לאן לחזור אחרי ההתחברות: לעמוד שניסו להיכנס אליו, או לעמוד הראשי
    const from = location.state?.from?.pathname || '/'

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target)) // { manName, password }
        try {
            const result = await login(data).unwrap() // שולח לשרת ומחכה לתשובה
            dispatch(setToken(result.accessToken))    // שם את הטוקן במגירה
            navigate(from, { replace: true })          // עובר לפאנל
        } catch (err) {
            console.log('שגיאה בהתחברות:', err.status)
        }
    }

    // מנהל שכבר מחובר ונכנס ל-/login - עובר ישר לפאנל
    if (token) return <Navigate to="/" replace />

    // הודעת שגיאה לפי מה שהשרת החזיר
    let errorMessage = ''
    if (error) {
        if (error.status === 401) errorMessage = 'שם משתמש או סיסמה שגויים'
        else if (error.status === 400) errorMessage = 'יש למלא שם משתמש וסיסמה'
        else if (error.status === 'FETCH_ERROR') errorMessage = 'אין חיבור לשרת'
        else errorMessage = 'שגיאה, נסו שוב'
    }

    return (
        <div>
            <h1>כניסת מנהלים</h1>
            <form onSubmit={handleSubmit}>
                <div className='formInput'>
                    <label htmlFor="manName">שם משתמש</label>
                    <input type="text" name='manName' id='manName' autoComplete="username" required />
                </div>
                <div className='formInput'>
                    <label htmlFor="password">סיסמה</label>
                    <input type="password" name='password' id='password' autoComplete="current-password" required />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'מתחבר...' : 'התחברות'}
                </button>
                {errorMessage && <p role="alert">{errorMessage}</p>}
            </form>
        </div>
    )
}

export default Login
