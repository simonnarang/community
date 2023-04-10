import { useEffect, useState } from 'react'
import { useUser, useSupabaseClient, Session, useSession } from '@supabase/auth-helpers-react'

import Link from 'next/link'

import { Database } from '../utils/database.types'
import { EventType } from '../utils/event.types'

import EventFrame from '../components/EventFrame'
import { Grid } from '@mantine/core'
import { useRouter } from 'next/router'

const blank_event = {
  id: '',
  org_name: '',
  event_name: '',
  event_flyer: '',
  location: '',
  event_time: '',
  type: '',
}

export default function Homepage() {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const router = useRouter()
  const session = useSession()

  const [events, setEvents] = useState<EventType[]>([blank_event])

  const retrieveEvents = async () => {
    try {
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase.from('events').select()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        let array: EventType[] = []

        data.map((event) => {
          const { id, org_name, event_name, event_flyer, location, event_time, type } = event
          let receivedData: EventType = {
            id,
            org_name,
            event_name,
            event_flyer,
            location,
            event_time,
            type,
          }
          array.push(receivedData)
        })
        setEvents(array)
      }
    } catch (error: any) {
      // TODO: add more
      if (error.message !== 'No user') {
        alert('Error, other than retrieving User, loading event data!')
      }
    }
  }

  useEffect(() => {
    retrieveEvents()
    if (!session) {
      router.push('/login')
    }
  }, [session, user, supabase])

  return (
    <>
      <div>
        <Link href="/profile">
          <button className="button block">Go to account</button>
        </Link>
      </div>

      <div>
        <Link href="/addevent">
          <button className="button block">Add event now</button>
        </Link>
      </div>

      <Grid columns={4} style={{ padding: 10, border: 'grey' }}>
        {JSON.stringify(events) !== '[]'
          ? events.map((event: EventType, index: any) => {
              return event.event_name !== null ? (
                <Grid.Col span={1} style={{ width: 100 }} key={index}>
                  <EventFrame eventDetails={event} />
                </Grid.Col>
              ) : (
                <></>
              )
            })
          : 'No events!'}
      </Grid>
    </>
  )
}
