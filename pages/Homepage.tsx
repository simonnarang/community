import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'


import Link from 'next/link';

import { Database } from '../utils/database.types'
type Events = Database['public']['Tables']['events']['Row']

export default function Homepage({ session }: { session: Session }){


  const supabase = useSupabaseClient<Database>()
  const user = useUser()

  const [events, setEvents] = useState<[Events]>([]);

  const retrieveEvents = async() => {
    try {
      if (!user) throw new Error('No user' as string)
  
      let { data, error, status } = await supabase
        .from('events')
        .select()

  
      if (error && status !== 406) { throw new Error(error.message) }
  
      if (data) {
        setEvents(data)
      }
    } catch (error) {
      if (error.message !== "No user") {
        alert('Error loading event data!')
      }
    }
  }

  useEffect(() => {
    retrieveEvents();
  }, [session, user, supabase]);


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
        <Link href="/AddEvent">
          <button className="button block" >
            Add event now
          </button>
        </Link>
      </div>

       { JSON.stringify(events) !== "[]" ? events.map((event: Events ) => {  
         
          return (
          
            <div key={event.id}>
              {event.event_name}
              <br/>

            </div>
  
          )
        }) : "No events!"
       }
    </>
  )
}