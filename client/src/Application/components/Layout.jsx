import React from 'react'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout