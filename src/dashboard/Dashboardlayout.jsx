import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './Sidebar'

const Dashboardlayout = () => {
  return (
    <div className='flex gap-4 flexs-col md:flex-row'>
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default Dashboardlayout