import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutatuions'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constansts'
import { INavLink } from '@/types'

const LeftSidebar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const { user } = useUserContext()

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to='/' className='flex gap-2 items-center'>
          <img
            src='/assets/images/logo.svg'
            alt='logo'
            width={45}
            height={30}
          />
          <h1 className='h3-bold'>Insta<span className='text-[#7091E6]'>V</span>ibe</h1>
        </Link>

        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='profile img'
            className='h-14 w-14 rounded-full'
          />
          <div className='flex flex-col'>
            <p className='body-bold'>
              {user.name}
            </p>
            <p className='small-regular text-light-3'>
              @{user.username}
            </p>
          </div>
        </Link>

        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink, index: number) => {
            const isActive = pathname === link.route

            return (
              <li key={index} className={`flex flex-row items-center leftsidebar-link group ${isActive ? 'bg-primary-500 translate-x-7' : 'translate-x-0 hover:bg-primary-600'}`}>
                <NavLink to={link.route} className='flex gap-4 items-center p-4 w-full'>
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`${isActive && 'invert-white'}`}
                  />
                  <p className='text-base text-light-2'>{link.label}</p>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>

      <Button
        variant='ghost'
        className='shad-button_ghost'
        onClick={() => signOut()}
      >
        <img src='/assets/icons/logout.svg' alt='logout' />
        <p className='small-medium lg:base-medium'>
          Logout
        </p>
      </Button>
    </nav>
  )
}

export default LeftSidebar