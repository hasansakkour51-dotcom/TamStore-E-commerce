import React from 'react'
import Header from '../../../../shared/header/Header'
import HeroSection from './heroSection/HeroSection'
import DealsAndOffers from './dealsAndOffers/dealsAndOffers'
import HomeAndOutdoor from './homeAndOutdoor/HomeAndOutdoor'
import DealsImage from '../../../../assets/Images/DealsImage.png'
import DealsImage2 from '../../../../assets/Images/DealsImage2.png'

import RequestQuoteSection from './requestQuoteSection/RequestQuoteSection'
import RecommendedItems from './recommendedItems/RecommendedItems'
import OurExtraServices from './ourExtraServices/OurExtraServices'
import SuppliersByRegion from './SuppliersByRegion/SuppliersByRegion'
import Newsletter from './Newsletter/Newsletter'
import Footer from '../../../../shared/footer/Footer'



const HomePage = () => {
  return (
    <>
    <Header/>
    <HeroSection/>
    <DealsAndOffers/>
    <HomeAndOutdoor title={'Home and outdoor'}  img={DealsImage}   category="groceries"/>
    <HomeAndOutdoor title={'Home and outdoor'}  img={DealsImage2}   category="smartphones"/>
    <RequestQuoteSection/>
    <RecommendedItems/>
    <OurExtraServices/>
    <SuppliersByRegion/>
    <Newsletter/>
    <Footer/>

    </>
  )
}

export default HomePage