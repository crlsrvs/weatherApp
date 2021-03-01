import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';

import '../assets/styles/components/App.css'

const Layout = ({ children }) => (
  <main className="App">
    <Header />

      {children}

      <ToastContainer />
    <Footer />
  </main>
)

export default Layout