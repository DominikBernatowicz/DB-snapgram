import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutatuions'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext'

const Topbar = () => {
  const navigate = useNavigate()

  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const { user } = useUserContext()

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <section className='topbar'>
      <div className='flex-between py-4 px-5'>
        <Link to='/' className='flex gap-3 items-center'>
          <img
            src='/assets/images/logo.svg'
            alt='logo'
            width={45}
            height={30}
          />
          <h1 className='h3-bold'>Insta<span className='text-[#7091E6]'>V</span>ibe</h1>
        </Link>
        <div className='flex gap-4'>
          <Button
            variant='ghost'
            className='shad-button_ghost'
            onClick={() => signOut()}
          >
            <img src='/assets/icons/logout.svg' alt='logout' />
          </Button>
          <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
            <img
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt='profile img'
              className='h-8 w-8 rounded-full'
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Topbar