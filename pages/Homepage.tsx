import Link from 'next/link';

import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'


export default function Homepage({ session }: { session: Session }){

  return (
    <>
      <div>
        <Link href="/#">
          <button className="button block" >
            Go to account 
          </button>
        </Link>
      </div>

      <div>
        No events

        <div>
          <Link href="/AddEvent">
            <button className="button block" >
              Add event now
            </button>
          </Link>
        </div>

      </div>
    </>
  )
}