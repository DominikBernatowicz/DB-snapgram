import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutatuions'
import { useEffect, useState } from 'react'
import { useUserContext } from '@/context/AuthContext'
import LogoComponent from './LogoComponent'
import { mobileMenu } from '@/constansts'
import { INavLink } from '@/types'

const Topbar = () => {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const { pathname } = useLocation()

  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const [showMenu, setShowMenu] = useState<boolean>(false)

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <section className='topbar '>
      <div className='flex-between py-4 px-5 items-center'>
        <LogoComponent func={setShowMenu}/>

        <div className='flex gap-3 '>
          <Link to={`/profile/${user.id}`} className='flex-center gap-3' onClick={() => setShowMenu(false)}>
            <img
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt='profile img'
              className='h-8 w-8 rounded-full'
            />
          </Link>
          <Button
            variant='ghost'
            className='shad-button_ghost bg-dark-4 rounded-[30%]'
            onClick={() => setShowMenu(!showMenu)}
          >
            <img
              src={`/assets/icons/${!showMenu ? 'menu' : 'cancel'}.svg`}
              alt={!showMenu ? 'menu' : 'cancel'}
              className='h-8 invert-white '
            />

          </Button>
        </div>
      </div>

      <div className={`w-full absolute rounded-b-3xl ${showMenu ? 'menu-visible' : 'menu-hidden'}`}>
        <div className="flex justify-end">
          <ul className='text-right w-2/3'>
            {mobileMenu.map((link: INavLink, index: number) => {
              const isActive = pathname === link.route

              return (
                <li key={index} className=''>
                  <NavLink
                    to={link.route}
                    className={`flex gap-4 items-center justify-end p-4 mr-5 ${isActive ? '-translate-x-7' : 'translate-x-0'}`}
                    onClick={() => setShowMenu(false)}
                  >
                    <p className={`text-base ${isActive ? 'text-primary-500' : 'text-light-2'}`}>
                      {link.label}
                    </p>
                    <img
                      src={link.imgURL}
                      alt={link.label}
                      className={`h-8 ${isActive ? 'invert-primary-500' : 'invert-white'}`}
                    />
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>

        <div className='flex justify-center my-8'>
          <Button
            className='gap-5 bg-red w-40'
            onClick={() => signOut()}
          >
            <img 
            src='/assets/icons/logout.svg' 
            alt='logout' 
            className='invert-white'
            />
            <p className='text-base text-light-2'>
              Logout
            </p>
          </Button>
        </div>
      </div>

    </section>
  )
}

export default Topbar