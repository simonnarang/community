import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'


import Link from 'next/link';

import { Database } from '../utils/database.types'
type Events = Database['public']['Tables']['events']['Row']


type EventType = {
  
    id: Events["id"],
    org_name: Events['org_name'],
    event_name: Events['event_name'],
    event_flyer: Events['event_flyer'],
    location: Events['location'],
    event_time: Events['event_time'],
    type: Events["type"]
}

export default function Homepage({ session }: { session: Session }){


  const supabase = useSupabaseClient<Database>()
  const user = useUser()

  const [events, setEvents] = useState<{
  
    id: Events["id"],
    org_name: Events['org_name'],
    event_name: Events['event_name'],
    event_flyer: Events['event_flyer'],
    location: Events['location'],
    event_time: Events['event_time'],
    type: Events["type"]
}[]>([{
    id: "", 
    org_name : "" || null || undefined,
    event_name: "" || null || undefined, 
    event_flyer: "" || null || undefined, 
    location: "" || null || undefined, 
    event_time:"" || null || undefined,
    type: "" || null || undefined
    }]);

  const retrieveEvents = async() => {
    try {
      if (!user) throw new Error('No user' as string)
  
      let { data, error, status } = await supabase
        .from('events')
        .select()

  
      if (error && status !== 406) { throw new Error(error.message) }
  
      console.log(data)

      if (data) {

        let receivedData: {
        id: string ,
        org_name: string | null | undefined,
        event_name: string | null | undefined,
        event_flyer: string | null | undefined,
        location: string | null | undefined,
        event_time: string | null | undefined,
        type: string | null | undefined
      } = {
        id: data.id,
        org_name: data.org_name
        event_name: string | null | undefined,
        event_flyer: string | null | undefined,
        location: Events['location'],
        event_time: string | null | undefined,
        type: string | null | undefined


      }
        let array: {
  
          id: Events["id"],
          org_name: Events['org_name'],
          event_name: Events['event_name'],
          event_flyer: Events['event_flyer'],
          location: Events['location'],
          event_time: Events['event_time'],
          type: Events["type"]
      }[] = [{
        id: "", 
        org_name : data.org_name,
        event_name: "" || null || undefined, 
        event_flyer: "" || null || undefined, 
        location: "" || null || undefined, 
        event_time:"" || null || undefined,
        type: "" || null || undefined
        

      }];



        
        setEvents(array)
      }
    } catch (error) {
      // if (error.message !== "No user") {
      //   alert('Error loading event data!')
      // }
      console.log(error)
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