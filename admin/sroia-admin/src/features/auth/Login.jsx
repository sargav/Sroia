import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, User, Lock, ArrowLeft } from 'lucide-react'
import { setToken, selectToken } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import logo from '../../assets/sroia-logo-white.png'

const Login = () => {
    // מה יש עכשיו במגירה
    const token = useSelector(selectToken)
    // שליחת פקודות למגירה
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    // הבקשה לשרת: login היא הפונקציה ששולחת, isLoading ו-error מגיעים לבד
    const [login, { isLoading, error }] = useLoginMutation()
    // האם להציג את הסיסמה (כפתור העין)
    const [showPassword, setShowPassword] = useState(false)

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
        <div dir="rtl" className="min-h-screen bg-sroia-bg flex flex-col">
            {/* פס עליון דק: לוגו ושם הפאנל */}
            <header className="bg-sroia-dark h-16 px-5 flex items-center justify-between">
                <img src={logo} alt="סרויה" className="w-24 h-auto" />
                <span className="text-sm text-sroia-line">פאנל ניהול</span>
            </header>

            {/* הטופס - במרכז המסך */}
            <main className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-sm bg-white border border-[#E1E8DA] rounded-2xl px-6 py-8 md:px-8 flex flex-col gap-6 shadow-sm">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-extrabold text-sroia-dark">כניסת מנהלים</h1>
                        <p className="text-sm text-[#565f52]">התחברו עם שם המשתמש והסיסמה</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="manName" className="text-sm font-bold text-[#3a4436]">שם משתמש</label>
                            <div className="flex items-center gap-2 min-h-12 px-3.5 border border-sroia-line rounded-xl bg-white focus-within:border-sroia-green focus-within:ring-2 focus-within:ring-sroia-light/40">
                                <User size={18} aria-hidden="true" className="text-[#565f52]" />
                                <input
                                    type="text"
                                    name="manName"
                                    id="manName"
                                    autoComplete="username"
                                    required
                                    className="flex-1 min-w-0 bg-transparent outline-none text-base"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-sm font-bold text-[#3a4436]">סיסמה</label>
                            <div className="flex items-center gap-2 min-h-12 ps-3.5 pe-1 border border-sroia-line rounded-xl bg-white focus-within:border-sroia-green focus-within:ring-2 focus-within:ring-sroia-light/40">
                                <Lock size={18} aria-hidden="true" className="text-[#565f52]" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    autoComplete="current-password"
                                    required
                                    className="flex-1 min-w-0 bg-transparent outline-none text-base"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'הסתרת הסיסמה' : 'הצגת הסיסמה'}
                                    className="w-11 h-11 flex items-center justify-center rounded-lg text-[#565f52] hover:bg-sroia-bg cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                                </button>
                            </div>
                        </div>

                        {errorMessage && (
                            <p role="alert" className="px-3.5 py-3 rounded-xl bg-[#FBECEC] text-[#8a2424] text-sm font-medium">
                                {errorMessage}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="min-h-12 rounded-xl bg-sroia-green text-white font-bold text-base flex items-center justify-center gap-2 cursor-pointer hover:bg-sroia-dark disabled:opacity-60 disabled:cursor-wait"
                        >
                            {isLoading ? 'מתחבר...' : 'התחברות'}
                            <ArrowLeft size={18} aria-hidden="true" />
                        </button>
                    </form>

                    <p className="text-sm text-[#565f52] text-center">שכחתם סיסמה? פנו למנהל אחר שיאפס אותה.</p>
                </div>
            </main>
        </div>
    )
}

export default Login
