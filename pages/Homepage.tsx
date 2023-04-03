import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'

import Link from 'next/link';

import { Database } from '../utils/database.types'
import { Events, EventType } from "../utils/event.types"

const blank_event = {
  id: "", 
  org_name : "",
  event_name: "", 
  event_flyer: "", 
  location: "", 
  event_time: "",
  type: ""
}

export default function Homepage({ session }: { session: Session }){
  const supabase = useSupabaseClient<Database>()
  const user = useUser()

  const [events, setEvents] = useState<EventType[]>([blank_event]);

  const retrieveEvents = async() => {
    try {
      if (!user) throw new Error('No user')
  
      let { data, error, status } = await supabase.from('events').select()

  
      if (error && status !== 406) { throw error}
  
      if (data) {
        let array: EventType[] = [];

        data.map((event) => {
          const { id, org_name, event_name, event_flyer, location, event_time, type  } = event;
          let receivedData: EventType = {
            id,
            org_name,
            event_name, 
            event_flyer,
            location,
            event_time,
            type
          }
          array.push(receivedData)

        })
        setEvents(array)
      }
    } catch (error: any) { // TODO: add more 
      if (error.message !== "No user") { alert('Error, other than retrieving User, loading event data!') }
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