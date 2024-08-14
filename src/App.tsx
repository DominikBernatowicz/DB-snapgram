import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import { AllUsers, CreatePost, Explore, Home, PostDetails, Profile, Saved, UpdatePost, UpdateProfile } from './_root/pages'
import AuthLayout from './_auth/AuthLayout'
import { SigninForm, SignupForm } from './_auth/forms'
import { Toaster } from "@/components/ui/toaster"

import './globals.css'
import { useEffect } from 'react'
import { account } from './lib/appwrite/config'

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      await account.get()
        .then(() => {
          if (location.pathname === '/sign-in' || location.pathname === '/sign-up') {
            navigate('/')
          }
        }).catch((err) => {
          console.log('No active session found:', err);

          if (location.pathname !== '/sign-in') {
            navigate('/sign-in');
          }
        })
    };

    checkSession();
  }, [location, navigate]);

  return (
    <main className="flex h-screen">
      <Routes>
        {/* PUBLIC */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>

        {/* Private */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/all-users' element={<AllUsers />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:id' element={<UpdatePost />} />
          <Route path='/post/:id' element={<PostDetails />} />
          <Route path='/profile/:id/*' element={<Profile />} />
          <Route path='/update-profile/:id' element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App