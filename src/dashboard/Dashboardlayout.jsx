import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './Sidebar'
import Navbar from '../components/Navbar'

const Dashboardlayout = () => {
  return (
    <div className='flex gap-4 flexs-col md:flex-row'>
      <Navbar/>
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default Dashboardlayout