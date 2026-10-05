import AboutAsaf from './AboutAsaf'
import Hero from './Hero'
import Servises from './Servises'
import GiftsCommunity from './GiftsCommunity'
import GallerySection from '../Projects/Gallery'
export const HomePage = () => {
  return (
    <div>
        <Hero/>
        <AboutAsaf />
        {/* <WhyUs /> */}
        <Servises/>
        <GiftsCommunity />
        {/*לקחות ממליצים */}
        <GallerySection status="finish" />
    </div>
  )
}

export default HomePage
