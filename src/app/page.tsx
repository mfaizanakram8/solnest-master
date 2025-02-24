import React from 'react'

import HeroSection from '@/components/HeroSection'
import Speed from '@/components/Speed'
import MevBotUi from '@/components/MevBotUi'
import FeaturedSection from '@/components/FeaturedSection'
import PricingFees from '@/components/PricingFees'
import Faqs from '@/components/Faqs'


const page = () => {
  return (
    <div>
   
      <HeroSection/>
      <Speed/>
      <MevBotUi/>
      <FeaturedSection/>
      <PricingFees/>
      <Faqs/>
     
    
    </div>
  )
}

export default page
