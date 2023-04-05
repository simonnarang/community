import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function LandingPage() {
  const supabase = useSupabaseClient()
  return (
    <>
      <Header />
      {/* <div className="flex justify-between"> */}
        <div>
          <h1 className="header">Welcome to CommUnity!</h1>
        </div>
      {/* </div> */}
      <div align="center">
        <img src="/landing-image.png" alt="image" width={600} />
      </div>
      <div>
        <h3 align="center">
          Maintain engagement within your own community by exploring what events CommUnity has to offer!
        </h3>
      </div>
      <Footer />
    </>
  )
}

