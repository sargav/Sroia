import AboutAsaf from './HomeAboutAsaf'
import Hero from './HomeHero'
import Services from './Services'
import GiftsCommunity from './GiftsCommunity'
import GallerySection from '../Projects/Gallery'
export const HomePage = () => {
  return (
    <div>
        <Hero/>
        <AboutAsaf />
        {/* <WhyUs /> */}
        <Services/>
        <GiftsCommunity />
        {/*לקחות ממליצים */}
        <GallerySection status="finish" />
    </div>
  )
}

export default HomePage
