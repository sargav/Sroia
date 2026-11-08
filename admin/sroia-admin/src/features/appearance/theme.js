import { useState } from 'react'

// ערכות הצבעים של הפאנל. הצבעים עצמם מוגדרים ב-App.css
export const THEMES = [
    { id: 'green', label: 'ירוק', note: 'הצבעים של סרויה (ברירת מחדל)', swatches: ['#2D382B', '#51762b', '#8FC24B', '#F4F6F0'] },
    { id: 'blackgreen', label: 'שחור עם ירוק', note: 'תפריט שחור, כפתורים בירוק של סרויה', swatches: ['#0B0B0C', '#51762b', '#8FC24B', '#F5F6F3'] },
    { id: 'navy', label: 'כחול כהה', note: 'תפריט וכפתורים בכחול', swatches: ['#060d36', '#2B3F9E', '#8FB3FF', '#F3F5FA'] },
]

const KEY = 'sroia-theme'

// הבחירה נשמרת בדפדפן הזה (localStorage). במצב פרטי או כשהדפדפן חוסם - פשוט חוזרים לירוק
export const getTheme = () => {
    try {
        const saved = localStorage.getItem(KEY)
        return THEMES.some((t) => t.id === saved) ? saved : 'green'
    } catch {
        return 'green'
    }
}

export const applyTheme = (id) => {
    if (id === 'green') delete document.documentElement.dataset.theme
    else document.documentElement.dataset.theme = id
}

export const useTheme = () => {
    const [theme, setThemeState] = useState(getTheme)
    const setTheme = (id) => {
        setThemeState(id)
        applyTheme(id)
        try {
            localStorage.setItem(KEY, id)
        } catch {
            // אין גישה לאחסון - הצבע יתחלף רק עד רענון הדף
        }
    }
    return [theme, setTheme]
}
