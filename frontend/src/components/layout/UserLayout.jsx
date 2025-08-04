import React from 'react'
import  Header  from "../common/Header";
import Footer from '../common/Footer';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/*Header */}
      <Header />
      {/*MAin Content */} 
      <main className="flex-grow">
        <Outlet />
      </main> 
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default UserLayout
