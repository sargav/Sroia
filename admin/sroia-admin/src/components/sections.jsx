import { Inbox, ShoppingCart, Image, Video, Globe, Users, Palette } from 'lucide-react'
import SectionTabs from './SectionTabs'
import { useGetContactsQuery } from '../features/contacts/contactsApiSlice'

// "פניות והרשמות"
export const InboxSection = () => {
    const { data: contacts = [] } = useGetContactsQuery()
    return (
        <SectionTabs
            title="פניות והרשמות"
            subtitle="מי פנה אלינו, ומי נרשם לקורס, למצפן ולמדריך"
            tabs={[
                { to: '/contacts', label: 'פניות', icon: Inbox, count: contacts.filter((c) => !c.isRead).length },
                { to: '/registrations', label: 'הרשמות ורכישות', icon: ShoppingCart },
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
            { to: '/images', label: 'תמונות', icon: Image },
            { to: '/videos', label: 'סרטוני המלצות', icon: Video },
            { to: '/site', label: 'מספרים ומחירים', icon: Globe },
        ]}
    />
)

// "הגדרות"
export const SettingsSection = () => (
    <SectionTabs
        title="הגדרות"
        subtitle="מי יכול להיכנס לפאנל, ואיך הפאנל נראה"
        tabs={[
            { to: '/managers', label: 'מנהלים', icon: Users },
            { to: '/appearance', label: 'עיצוב', icon: Palette },
        ]}
    />
)
