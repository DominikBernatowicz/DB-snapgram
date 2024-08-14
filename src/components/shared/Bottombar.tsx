import { bottombarLinks } from '@/constansts'
import React from 'react'
import { Link, useLocation, useNavigation } from 'react-router-dom'

const Bottombar = () => {
  const { pathname } = useLocation()

  return (
    <section className='bottom-bar h-24'>
      <ul className='flex w-full justify-around'>
        {bottombarLinks.map((link, index) => {
          const isActive = pathname === link.route
          return (
            <li key={index} className='relative list-none z-10 text-center'>
              <Link
                to={link.route}
                className={`relative flex justify-center items-center flex-col h-14 w-14 text-center font-medium rounded-full transition-all duration-500 ease-in-out ${isActive ? 'bg-primary-500 -translate-y-7' : 'translate-y-0'}`}
                >
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className={`h-8 w-8 relative block leading-6 text-[1.5em] text-center ${isActive && 'invert-white'}`}
                />
              </Link>
              <p className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'}`}>
                {link.label}
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Bottombar