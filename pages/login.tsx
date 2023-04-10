import type { NextPage } from 'next'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Login: NextPage = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter();

  useEffect(() => {
    if (session) router.push('/homepage')
  })

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <div className="row">
          <div className="col-6">
            <h1 className="header-login">Welcome to CommUnity</h1>
            <p className="">
            A new  platform that redefines community engagement for college students, on and off campus.
            </p>
          </div>
          <div className="col-6 auth-widget">
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
          </div>
        </div>
      ) : (
        <></>
      )}
      <Footer />
    </div>
  )
}

export default Login
