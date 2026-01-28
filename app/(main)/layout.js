import React from 'react'
import Dashboardprovider from './provider'

const Dashboardlayout = ({children}) => {
  return (
    <div className='bg-secondary'>
        <Dashboardprovider>
            <div className='p-5'>
              {children}
            </div>
        </Dashboardprovider>
    </div>
  )
}

export default Dashboardlayout