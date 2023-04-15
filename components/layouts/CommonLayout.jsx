import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const CommonLayout = ({children}) => {
  return (
    <>
        <Header />
        <div className='mb-10 '>
        {children}
        </div>
        <Footer /> 
        
    </>
  )
}

export default CommonLayout