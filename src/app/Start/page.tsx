import { CardDemo } from '@/components/Cards'
import { WorldMapDemo } from '@/components/MapSection'

import React from 'react'

const page = () => {
  return (
    <div className='mt-20'>
  <WorldMapDemo/>
  <CardDemo/>
    </div>
  )
}

export default page
