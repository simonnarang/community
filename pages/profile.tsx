import { useRouter } from 'next/router';
import Account from '../components/Account'
import { useSession } from '@supabase/auth-helpers-react'
import { useEffect } from 'react';
import { NextPage } from 'next';


const Profile: NextPage = () => {
    const router = useRouter();
    const session = useSession();
    useEffect(() => {
        if (!session) router.push('/login')
    })
    return (
        <div className="page" >
        {!session ? (<></>) : <Account session={session} />}
        </div>
    )
}

export default Profile;