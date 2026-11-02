// ===== עזרים לתאריכים ולסוגי אירועים - משותף לכל מסכי היומן =====

// סוגי האירועים - כמו EVENT_TYPES בשרת, עם צבע לכל סוג
export const EVENT_KINDS = {
    meet: { label: 'פגישה', bg: '#E3EFD3', fg: '#2f4a17' },
    site: { label: 'ביקור באתר', bg: '#DCEBF5', fg: '#1d4a66' },
    call: { label: 'שיחה', bg: '#EFE4F5', fg: '#4f2d66' },
}

export const WEEKDAYS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
export const MONTHS = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר']

// "2026-11-12" לפי השעון המקומי (לא toISOString, שעובר ל-UTC ויכול להזיז יום)
export const dayKey = (date) => {
    const d = new Date(date)
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${d.getFullYear()}-${mm}-${dd}`
}

// "09:30"
export const timeLabel = (date) => {
    const d = new Date(date)
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export const sameDay = (a, b) => dayKey(a) === dayKey(b)

// כל הימים שמוצגים בלוח של חודש: מיום ראשון שלפני ה-1 ועד שבת שאחרי סוף החודש
export const monthGrid = (monthStart) => {
    const first = new Date(monthStart.getFullYear(), monthStart.getMonth(), 1)
    const start = new Date(first)
    start.setDate(1 - first.getDay())                  // אחורה ליום ראשון
    const last = new Date(first.getFullYear(), first.getMonth() + 1, 0)
    const end = new Date(last)
    end.setDate(last.getDate() + (6 - last.getDay()) + 1) // קדימה אחרי שבת (לא כולל)
    const days = []
    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d))
    }
    return { days, from: start, to: end }
}

// מקבץ אירועים לפי יום: { "2026-11-12": [ ... ] }
export const groupByDay = (events) => {
    const map = {}
    events.forEach((ev) => {
        const key = dayKey(ev.start)
        if (!map[key]) map[key] = []
        map[key].push(ev)
    })
    return map
}
