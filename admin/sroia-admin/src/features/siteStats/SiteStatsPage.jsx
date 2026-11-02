import PageHeader from '../../components/PageHeader'
import SiteStatsCard from './SiteStatsCard'

// דף "נתוני האתר": דברים שמופיעים באתר ושהמנהל מעדכן מדי פעם
const SiteStatsPage = () => (
    <div className="flex flex-col gap-6">
        <PageHeader title="נתוני האתר" subtitle="מספרים שמופיעים באתר ומתעדכנים מכאן" />
        <SiteStatsCard />
    </div>
)

export default SiteStatsPage
