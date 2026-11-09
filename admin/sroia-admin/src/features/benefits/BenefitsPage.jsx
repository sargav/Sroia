import { useCallback, useState } from 'react'
import { Lock, Plus, X } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Loading from '../../components/Loading'
import Toast from '../../components/Toast'
import ConfirmDialog from '../../components/ConfirmDialog'
import {
    useGetBenefitsOverviewQuery,
    useCreateBenefitListMutation,
    useAddBenefitRecipientMutation,
    useRemoveBenefitRecipientMutation,
    useSetBenefitActiveMutation,
} from './benefitsApiSlice'

const CARD = 'bg-white rounded-2xl shadow-[0_1px_2px_rgba(45,56,43,0.06),0_4px_16px_rgba(45,56,43,0.05)]'
const EMAIL_RE = /^\S+@\S+\.\S+$/

// הודעת שגיאה ברורה לפי מה שהשרת החזיר
const errorText = (err) => {
    if (err?.status === 409) return 'המייל הזה כבר ברשימה'
    if (err?.status === 400) return 'כתובת המייל לא תקינה'
    if (err?.status === 'FETCH_ERROR') return 'אין חיבור לשרת. נסו שוב בעוד רגע'
    return 'משהו השתבש. נסו שוב'
}

// מתג הפעלה/עצירה של שליחת המיילים להטבה
const Switch = ({ checked, onChange, label, disabled }) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-7 shrink-0 rounded-full transition-colors cursor-pointer disabled:cursor-wait ${checked ? 'bg-sroia-green' : 'bg-sroia-line'}`}
    >
        <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${checked ? 'left-1' : 'left-6'}`} />
    </button>
)

// כרטיס של הטבה אחת: המתג, האנשים שמקבלים מייל, והוספת מייל
const BenefitCard = ({ benefit, alwaysTo, onMessage }) => {
    const list = benefit.notification
    const recipients = list?.recipients || []
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [fieldError, setFieldError] = useState('')
    const [toRemove, setToRemove] = useState(null)

    const [createList, { isLoading: creating }] = useCreateBenefitListMutation()
    const [addRecipient, { isLoading: adding }] = useAddBenefitRecipientMutation()
    const [removeRecipient] = useRemoveBenefitRecipientMutation()
    const [setActive, { isLoading: toggling }] = useSetBenefitActiveMutation()
    const saving = creating || adding

    const emailId = `benefit-${benefit._id}-email`
    const errorId = `benefit-${benefit._id}-error`

    const add = async (e) => {
        e.preventDefault()
        const cleanEmail = email.trim().toLowerCase()
        if (!EMAIL_RE.test(cleanEmail)) {
            setFieldError('כתבו כתובת מייל תקינה, למשל name@negev.co.il')
            return
        }
        if (recipients.some((r) => r.email === cleanEmail)) {
            setFieldError('המייל הזה כבר ברשימה')
            return
        }
        const recipient = { name: name.trim() || undefined, email: cleanEmail }
        try {
            // להטבה בלי רשימה - יוצרים רשימה עם המייל הראשון. אחרת מוסיפים לרשימה הקיימת
            if (list) await addRecipient({ listId: list._id, ...recipient }).unwrap()
            else await createList({ benefit: benefit._id, recipient }).unwrap()
            setName('')
            setEmail('')
            onMessage({ type: 'success', title: `${cleanEmail} יקבל מייל על כל בקשה ל${benefit.nameCompany}` })
        } catch (err) {
            setFieldError(errorText(err))
        }
    }

    const confirmRemove = async () => {
        const r = toRemove
        setToRemove(null)
        try {
            await removeRecipient({ listId: list._id, email: r.email }).unwrap()
            onMessage({ type: 'success', title: `${r.email} הוסר מהרשימה` })
        } catch (err) {
            onMessage({ type: 'error', title: 'ההסרה לא הצליחה', details: errorText(err) })
        }
    }

    const toggle = async (isActive) => {
        try {
            await setActive({ listId: list._id, isActive }).unwrap()
            onMessage({ type: 'success', title: isActive ? 'שליחת המיילים הופעלה' : 'שליחת המיילים נעצרה' })
        } catch (err) {
            onMessage({ type: 'error', title: 'השינוי לא נשמר', details: errorText(err) })
        }
    }

    return (
        <section aria-labelledby={`benefit-${benefit._id}-title`} className={`${CARD} p-4 sm:p-5 flex flex-col gap-4`}>
            <div className="flex flex-wrap items-center gap-3">
                <span aria-hidden="true" className="w-12 h-12 rounded-xl bg-[#FDF0E6] text-[#9a4a12] flex items-center justify-center font-extrabold text-xl">
                    {benefit.nameCompany[0]}
                </span>
                <div className="flex-1 min-w-40">
                    <h3 id={`benefit-${benefit._id}-title`} className="text-lg font-extrabold text-sroia-dark">{benefit.nameCompany}</h3>
                    <p className="text-sm text-[#6b7468]">
                        שלב: {benefit.levelOfBuilder} · {benefit.requests} בקשות עד היום
                    </p>
                </div>
                {list ? (
                    <label className="flex items-center gap-3 text-sm text-[#3a4436]">
                        {list.isActive ? 'שליחת מיילים פעילה' : 'שליחת מיילים עצורה'}
                        <Switch checked={list.isActive} onChange={toggle} disabled={toggling}
                            label={`שליחת מיילים על ${benefit.nameCompany}`} />
                    </label>
                ) : (
                    <span className="text-sm text-[#6b7468]">עוד לא נשלח לאף אחד חוץ מהעסק</span>
                )}
            </div>

            <div className="flex flex-col gap-2.5">
                <h4 className="font-bold text-sroia-dark">מי עוד מקבל מייל על כל בקשה להטבה הזו</h4>
                {recipients.length === 0 ? (
                    <p className="text-sm text-[#6b7468]">אין עדיין אף אחד. אפשר להוסיף כאן למטה.</p>
                ) : (
                    <ul className="flex flex-wrap gap-2">
                        {recipients.map((r) => (
                            <li key={r.email} className="flex items-center gap-2 ps-1.5 pe-3 py-1.5 rounded-full bg-sroia-subtle text-sm">
                                <span aria-hidden="true" className="w-7 h-7 rounded-full bg-sroia-tint text-sroia-ink flex items-center justify-center font-extrabold text-xs">
                                    {(r.name || r.email)[0].toUpperCase()}
                                </span>
                                <span>
                                    {r.name && <b className="font-bold">{r.name} </b>}
                                    <bdi dir="ltr" className="text-[#565f52]">{r.email}</bdi>
                                </span>
                                <button type="button" onClick={() => setToRemove(r)} aria-label={`הסרת ${r.name || r.email}`}
                                    className="w-8 h-8 -me-1.5 rounded-full flex items-center justify-center text-[#6b7468] hover:bg-white hover:text-[#a12f2f] cursor-pointer">
                                    <X size={15} aria-hidden="true" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <form onSubmit={add} noValidate className="flex flex-wrap items-start gap-3">
                <label className="flex-[1_1_160px] flex flex-col gap-1.5 text-sm font-bold text-[#3a4436]">
                    שם <span className="sr-only">(לא חובה)</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="יוסי לוי" autoComplete="off"
                        className="min-h-11 px-3 border border-sroia-line rounded-xl font-normal text-[15px]" />
                </label>
                <div className="flex-[2_1_220px] flex flex-col gap-1.5">
                    <label htmlFor={emailId} className="text-sm font-bold text-[#3a4436]">מייל</label>
                    <input id={emailId} type="email" dir="ltr" value={email} placeholder="name@negev.co.il" autoComplete="off"
                        onChange={(e) => { setEmail(e.target.value); setFieldError('') }}
                        aria-invalid={!!fieldError} aria-describedby={fieldError ? errorId : undefined}
                        className={`min-h-11 px-3 border rounded-xl text-[15px] text-right ${fieldError ? 'border-[#c0392b]' : 'border-sroia-line'}`} />
                    {fieldError && <p id={errorId} role="alert" className="text-sm text-[#a12f2f]">{fieldError}</p>}
                </div>
                <button type="submit" disabled={saving}
                    className="sm:mt-[26px] min-h-11 px-4 rounded-xl bg-sroia-green text-white font-bold flex items-center gap-2 cursor-pointer disabled:opacity-60 max-sm:w-full max-sm:justify-center">
                    <Plus size={18} aria-hidden="true" />
                    {saving ? 'מוסיף...' : 'הוספה'}
                </button>
            </form>

            {alwaysTo.length > 0 && (
                <p className="flex flex-wrap items-center gap-2 px-3.5 py-2.5 rounded-xl bg-sroia-bg text-sm text-[#3a4436]">
                    <Lock size={16} aria-hidden="true" className="text-[#6b7468]" />
                    תמיד מקבל את כל הבקשות:
                    {alwaysTo.map((a) => <bdi key={a} dir="ltr" className="font-bold">{a}</bdi>)}
                    <span className="text-[#6b7468]">(המייל של העסק)</span>
                </p>
            )}

            <ConfirmDialog
                open={!!toRemove}
                title={`להסיר את ${toRemove?.name || toRemove?.email}?`}
                message={`הוא יפסיק לקבל מיילים על בקשות ל${benefit.nameCompany}.`}
                confirmText="הסרה"
                onConfirm={confirmRemove}
                onCancel={() => setToRemove(null)}
            />
        </section>
    )
}

// הגדרות > הטבות: לכל הטבה באתר - מי מקבל מייל כשלקוח מבקש אותה
const BenefitsPage = () => {
    const { data, isLoading, isError, refetch } = useGetBenefitsOverviewQuery()
    const [message, setMessage] = useState(null)
    const closeToast = useCallback(() => setMessage(null), [])

    return (
        <div className="flex flex-col gap-5">
            <PageHeader
                title="הטבות"
                subtitle="לכל הטבה באתר: מי מקבל מייל כשלקוח מבקש אותה. כל אחד מקבל רק על ההטבה שלו, בלי פרטים על הטבות אחרות."
            />

            {isLoading && <Loading text="טוען הטבות..." />}
            {isError && (
                <div role="alert" className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-[#FBEAEA] text-[#7a1f1f]">
                    לא הצלחנו לטעון את ההטבות.
                    <button type="button" onClick={refetch} className="underline font-bold cursor-pointer">נסו שוב</button>
                </div>
            )}

            {data && (
                <div className="flex flex-col gap-4 max-w-4xl">
                    {data.benefits.map((b) => (
                        <BenefitCard key={b._id} benefit={b} alwaysTo={data.alwaysTo} onMessage={setMessage} />
                    ))}
                    <p className="p-5 rounded-2xl border-2 border-dashed border-sroia-line text-center text-sm text-[#6b7468]">
                        כשתתווסף הטבה חדשה לאתר, היא תופיע כאן עם רשימת מיילים משלה
                    </p>
                </div>
            )}

            <Toast message={message?.title} details={message?.details} type={message?.type} onClose={closeToast} />
        </div>
    )
}

export default BenefitsPage
