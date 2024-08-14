import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Topbar from '@/components/shared/Topbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full flex flex-col'>
      <Topbar />
      <div className='flex flex-1'>
        <LeftSidebar />
        <div className='flex-1 mt-20 mb-32 md:my-0 md:ml-[17rem]'>
          <Outlet />
        </div>
      </div>
      <Bottombar />
    </div>

  )
}

export default RootLayout