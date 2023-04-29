import Image from 'next/image'
import { useState, useEffect } from 'react'

const UpArrow = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 p-2 rounded-full ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300`}
      onClick={scrollToTop}
    >
     <div className='bg-gray-50 animate-spin hover:animate-none hover:shadow-lg hover:outline-dotted rounded-full flex px-2 py-2 mt-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
        <Image src="/up-arrow.png" alt="" width={30} height={30} />
     </div>
    </div>
  )
}

export default UpArrow
