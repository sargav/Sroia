import { Inbox, ShoppingCart, Image, Video, Globe, Users, Palette, Gift } from 'lucide-react'
import SectionTabs from './SectionTabs'
import { useGetContactsQuery } from '../features/contacts/contactsApiSlice'

// "פניות והרשמות"
export const InboxSection = () => {
    const { data: contacts = [] } = useGetContactsQuery()
    return (
        <SectionTabs
            title="פניות והרשמות"
            subtitle="מי פנה אלינו, מי נרשם לקורס, למצפן ולמדריך, ומי ביקש הטבה"
            tabs={[
                { to: '/contacts', label: 'פניות', icon: Inbox, count: contacts.filter((c) => !c.isRead).length },
                { to: '/registrations', label: 'הרשמות ורכישות', icon: ShoppingCart },
                { to: '/benefit-requests', label: 'בקשות הטבה', icon: Gift },
            ]}
        />
    )
}

// "תוכן האתר"
export const ContentSection = () => (
    <SectionTabs
        title="תוכן האתר"
        subtitle="מה שמופיע באתר ומתעדכן מכאן"
        tabs={[
            { to: '/content/images', label: 'תמונות', icon: Image },
            { to: '/content/videos', label: 'סרטוני המלצות', icon: Video },
            { to: '/content/numbers', label: 'מספרים ומחירים', icon: Globe },
        ]}
    />
)

// "הגדרות"
export const SettingsSection = () => (
    <SectionTabs
        title="הגדרות"
        subtitle="מנהלים, עיצוב הפאנל, ולמי נשלחות בקשות ההטבות"
        tabs={[
            { to: '/settings/managers', label: 'מנהלים', icon: Users },
            { to: '/settings/appearance', label: 'עיצוב', icon: Palette },
            { to: '/settings/benefits', label: 'הטבות', icon: Gift },
        ]}
    />
)
