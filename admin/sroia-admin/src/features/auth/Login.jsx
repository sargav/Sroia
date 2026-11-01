import { useDispatch, useSelector } from 'react-redux'
import { setToken, logOut, selectToken } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {
    // מה יש עכשיו במגירה
    const token = useSelector(selectToken)
    // שליחת פקודות למגירה
    const dispatch = useDispatch()
    // הבקשה לשרת: login היא הפונקציה ששולחת, isLoading ו-error מגיעים לבד
    const [login, { isLoading, error }] = useLoginMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target)) // { manName, password }
        try {
            const result = await login(data).unwrap() // שולח לשרת ומחכה לתשובה
            dispatch(setToken(result.accessToken))    // שם את הטוקן במגירה
        } catch (err) {
            console.log('שגיאה:', err.status)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='formInput'>
                    <label htmlFor="manName">שם משתמש</label>
                    <input type="text" name='manName' id='manName' />
                </div>
                <div className='formInput'>
                    <label htmlFor="password">סיסמה</label>
                    <input type="password" name='password' id='password' />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'מתחבר...' : 'התחברות'}
                </button>
                {error && <p>שם משתמש או סיסמה שגויים</p>}
            </form>

            {/* ===== בדיקה זמנית: רואים מה במגירה ===== */}
            <hr />
            <p>במגירה: {token ?? 'ריק'}</p>
            <button type="button" onClick={() => dispatch(logOut())}>התנתקות</button>
        </div>
    )
}

export default Login