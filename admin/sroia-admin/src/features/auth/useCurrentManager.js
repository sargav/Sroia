import { useSelector } from 'react-redux'
import { selectToken } from './authSlice'

// קורא את פרטי המנהל המחובר מתוך הטוקן: { _id, name, manName, email }
// הטוקן בנוי משלושה חלקים מופרדים בנקודה. האמצעי הוא JSON ב-base64url.
// TextDecoder מפענח נכון גם שמות בעברית (atob לבד היה משבש אותם)
const decodeToken = (token) => {
    try {
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
        const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
        return JSON.parse(new TextDecoder().decode(bytes))
    } catch {
        return null
    }
}

const useCurrentManager = () => {
    const token = useSelector(selectToken)
    return token ? decodeToken(token) : null
}

export default useCurrentManager
