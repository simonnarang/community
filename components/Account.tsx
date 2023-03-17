import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import Avatar from './Avatar'

import { Database } from '../utils/database.types'
type Profiles = Database['public']['Tables']['profiles']['Row']
type Events = Database['public']['Tables']['events']['Row']


export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [website, setWebsite] = useState<Profiles['website']>(null)
  const [type, setType] = useState<Profiles['type']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
  const [org_name, setOrgName] = useState<Events['org_name']>(null)
  const [event_name, setEventName] = useState<Events['event_name']>(null)
  const [event_flyer, setEventFlyer] = useState<Events['event_flyer']>(null)
  const [location, setLocation] = useState<Events['location']>(null)
  const [date, setEventDate] = useState<Events['date']>(null)
  const [time, setEventTime] = useState<Events['time']>(null)

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true)
        if (!user) throw new Error('No user')

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url, type`)
          .eq('id', user.id)
          .single()

        if (error && status !== 406) {
          throw error
        }

        if (data) {
          setUsername(data.username)
          setWebsite(data.website)
          setType(data.type)
          setAvatarUrl(data.avatar_url)
        }
      } catch (error) {
        alert('Error loading user data!')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [session, user, supabase])

  async function updateProfile({
    username,
    website,
    avatar_url,
    type
  }: {
    username: Profiles['username']
    website: Profiles['website']
    avatar_url: Profiles['avatar_url']
    type: Profiles['type']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
        type,
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the profile data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

useEffect(() => {
  async function getEvent() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('events')
        .select(`username, org_name, event_name, event_flyer, location, date, time, type`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setType(data.type)
        setOrgName(data.org_name)
        setEventName(data.event_name)
        setEventFlyer(data.event_flyer)
        setLocation(data.location)
        setEventDate(data.date)
        setEventTime(data.time)
      }
    } catch (error) {
      // error here too
      alert('Error loading event data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  getEvent()
}, [session, user, supabase])

  async function updateEvent({
    username,
    org_name,
    event_name,
    event_flyer,
    location,
    date,
    time,
    type,
  }: {
    username: Events['username']
    org_name: Events['org_name']
    event_name: Events['event_name']
    event_flyer: Events['event_flyer']
    location: Events['location']
    date: Events['date']
    time: Events['time']
    type: Events['type']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        id: user.id,
        org_name,
        event_name,
        event_flyer,
        location,
        date,
        time,
        updated_at: new Date().toISOString(),
        type,
      }

      let { error } = await supabase.from('events').upsert(updates)
      if (error) throw error
      alert('Event updated!')
    } catch (error) {
      alert('Error updating the event data!') 
      // second update button is always throwing this error
      // need to fix 
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <Avatar
        uid={user!.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ username, website, avatar_url: url, type })
          updateEvent({ username, org_name, event_name, event_flyer, location, date, time, type })
        }}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="type">Type</label>
        <input
          id="type"
          type="text"
          value={type || ''}
          onChange={(e) => setType(e.target.value)}
        />
      </div>

      {/** need to add these bottom lines to another page as well */}
      <div>
        <label htmlFor="org_name">Organization's Name</label>
        <input
          id="org_name"
          type="text"
          value={org_name || ''}
          onChange={(e) => setOrgName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="event_flyer">Event Flyer</label>
        <input
          id="event_flyer"
          type="text"
          value={event_flyer || ''}
          onChange={(e) => setEventFlyer(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="event_name">Name of Event</label>
        <input
          id="event_name"
          type="text"
          value={event_name || ''}
          onChange={(e) => setEventName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="location">Location of Event</label>
        <input
          id="location"
          type="text"
          value={location || ''}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="date">Date of Event</label>
        <input
          id="date"
          type="text"
          value={date || ''}
          onChange={(e) => setEventDate(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="time">Time of Event</label>
        <input
          id="time"
          type="text"
          value={time || ''}
          onChange={(e) => setEventTime(e.target.value)}
        />
      </div>

      <div>
        <p></p>
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, website, avatar_url, type })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      {/** this throws an error in line 167 
       * need to add this to another page as well
      */} 
      <div>
        <button
          className="button block"
          onClick={() => updateEvent({ username, org_name, event_name, event_flyer, location, date, time, type })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
