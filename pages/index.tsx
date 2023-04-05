// import type { NextPage } from 'next'
// import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
// import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
// import Account from '../components/Account'
// import Footer from '../components/Footer'
// import LandingPage from './LandingPage'

// const Home: NextPage = () => {
//   const session = useSession()
//   const supabase = useSupabaseClient()

//   return (
//     <LandingPage/>

    // <div className="container" style={{ padding: '50px 0 100px 0' }}>
    //   {!session ? (
    //     <div className="row">
    //       <div className="col-6">
    //         <h1 className="header">Welcome to CommUnity</h1>
    //         <p className="">
    //           Experience our Auth and Storage through a simple profile management example. Create a
    //           user profile and upload an avatar image. Fast, simple, secure.
    //         </p>
    //       </div>
    //       <div className="col-6 auth-widget">
    //         <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
    //       </div>
    //     </div>
    //   ) : (
    //     <>
    //       <h3>Account</h3>
    //       <Account session={session} />
    //     </>
    //   )}

    //   <Footer />
    // </div>
//   )
// }

// export default Home

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'

export default function LandingPage() {
  const supabase = useSupabaseClient()
  return (
    <>
      <div className="flex justify-between">
        <h1 className="header">Welcome to CommUnity</h1>
        <p>
          Maintain engagement within your own community
          by exploring what events CommUnity has to offer!
                </p>
      </div>
      <div>
        <Link href="/login"> /** need to change this redirect to current landing page */
                    <button className="button block">
            Login
                    </button>
        </Link>
      </div>
    </>
  )
}
