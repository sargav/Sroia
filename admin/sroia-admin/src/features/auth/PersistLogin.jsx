import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { selectToken, setToken } from './authSlice'
import { useRefreshMutation } from './authApiSlice'
import FullScreenLoader from '../../components/FullScreenLoader'

// אחרי רענון דף המגירה מתרוקנת (הטוקן שמור רק בזיכרון).
// הקומפוננטה הזו מבקשת מהשרת טוקן חדש בעזרת העוגייה, לפני ש-RequireAuth מחליט אם המנהל מחובר
const PersistLogin = () => {
    const token = useSelector(selectToken)
    const dispatch = useDispatch()
    const [refresh] = useRefreshMutation()

    // בודקים רק אם המגירה ריקה. אם כבר יש טוקן - אין מה לבדוק
    const [checking, setChecking] = useState(!token)
    // StrictMode מריץ useEffect פעמיים בפיתוח - זה מונע שתי בקשות refresh
    const ran = useRef(false)

    useEffect(() => {
        if (token || ran.current) return
        ran.current = true

        refresh()
            .unwrap()
            .then((result) => dispatch(setToken(result.accessToken))) // יש עוגייה בתוקף - מחוברים
            .catch(() => {})            // אין עוגייה בתוקף = לא מחובר. RequireAuth ישלח ללוגין
            .finally(() => setChecking(false))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (checking) return <FullScreenLoader />
    return <Outlet />
}

export default PersistLogin
