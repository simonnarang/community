import { useEffect, useState } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { Database } from '../utils/database.types'
import { Events, EventType } from '../utils/event.types'
import EventFrame from '../components/EventFrame'
import DropDown from '../components/DropDown'
import { AppShell, Button, Grid, Header, MultiSelect } from '@mantine/core'


const blank_event = {
  id: '',
  org_name: '',
  event_name: '',
  event_flyer: '',
  location: '',
  event_time: '',
  type: '',
  event_avatar: ''
}

export default function Homepage({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()

  const user = useUser()

  const [events, setEvents] = useState<EventType[]>([blank_event])
  const [orderBy, setOrderBy] = useState<string>("")
  const [showDropDown, setShowDropDown] = useState<boolean>(false)
  const eventSort = () => { return['event_name', 'event_date', 'location'] }

  const retrieveEvents = async () => {
    try {
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
      .from('events')
      .select()
      .order(orderBy)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        let array: EventType[] = []

        data.map((event) => {
          const { id, org_name, event_name, event_flyer, location, event_time, type, event_avatar} = event
          let receivedData: EventType = {
            id,
            org_name,
            event_name,
            event_flyer,
            location,
            event_time,
            type,
            event_avatar
          }
          array.push(receivedData)
        })
        setEvents(array)
        setOrderBy(orderBy)
      }
    } catch (error: any) {
      // TODO: add more
      if (error.message !== 'No user') {
        alert('Error, other than retrieving User, loading event data!')
        /* TODO: Throwing this error but you're still able to add events 
            and whatnot. I think the error is something with the sort method
            or dropdown, but i'm going to aim to have it fixed by 4/19
        */
      }
    }
  }


  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
    };
    
    // hides dropdown menu if space is clicked outside of menu
    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
    };
  
  useEffect(() => {
    retrieveEvents()
  }, [session, user, supabase, orderBy])

  return (

    <AppShell header={      
      <Header height={60} p="xs" className="header" id="headerHome">
      <ul>
        <li>
          <h1 id='logo'>CommUnity</h1>
        </li>
        <li>
      <div>
        <Button className="headerBtn" onClick={() => setOrderBy('event_time')}>
        ⬇️ &nbsp; Sort by Date
        </Button>

        <Button
        className={showDropDown ? "active" : undefined}
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
        >
        <div>⬇️ &nbsp; Sort</div>
        {/**{orderBy ? "Sorted by: " + orderBy : "Sort by..."}*/}
        
        {showDropDown && (
        <DropDown
            options={eventSort()}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            optionSelection={setOrderBy}
          />
        )}
        </Button>


        <Link href="/addevent">
          <Button>📅 &nbsp; New Event</Button>
        </Link>
        <Link href="/profile">
          <Button className="headerBtn">💁 &nbsp; Profile</Button>
        </Link>
      </div>
      </li>
      </ul>
      </Header>
  }>
          <Grid style={{ padding: 50 }}>
        {JSON.stringify(events) !== '[]'
          ? events.map((event: EventType, index: any, sort: any) => {
              return event.event_name !== null ? (
                <Grid.Col md={6} lg={3}>
                  <EventFrame eventDetails={event} />
                </Grid.Col>
              ) : (
                <></>
              )
            })
          : 'No events!'}
      </Grid>

    </AppShell>
  )
}
