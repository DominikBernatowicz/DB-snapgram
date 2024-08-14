import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Topbar from '@/components/shared/Topbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full flex flex-col'>
      <Topbar />
      <div className='flex flex-1 md:max-h-screen'>
        <LeftSidebar />
        <Outlet />
      </div>
        <Bottombar />
    </div>
  )
}

export default RootLayout