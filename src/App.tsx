import { Routes, Route } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import { Home } from './_root/pages'
import AuthLayout from './_auth/AuthLayout'
import { SigninForm, SignupForm } from './_auth/forms'

import './globals.css'

const App = () => {
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
        </Route>
      </Routes>
    </main>
  )
}

export default App