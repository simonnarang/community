import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import {useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'

export default function LandingPage() {
    const supabase = useSupabaseClient()
    return(
        <>
            <div className="flex justify-between">
                <h1 className="header">Welcome to CommUnity</h1>
                <p> 
                    Maintain engagement within your own community 
                    by exploring what events CommUnity has to offer!
                </p>
                <div className="">
                    <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
                </div>
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
