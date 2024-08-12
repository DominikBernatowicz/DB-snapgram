import { bottombarLinks } from '@/constansts'
import React from 'react'
import { Link, useLocation, useNavigation } from 'react-router-dom'

const Bottombar = () => {
  const { pathname } = useLocation()

  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link, index) => {
        const isActive = pathname === link.route

        return (
          <Link
            to={link.route}
            key={index}
            className={`bottombar-link group ${isActive && 'bg-primary-500 rounded-[10px]'} flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              className={`group-hover:invert-white ${isActive && 'invert-white'}`}
            />
            <p></p>
            {link.label}
          </Link>
        )
      })}
    </section>
  )
}

export default Bottombar