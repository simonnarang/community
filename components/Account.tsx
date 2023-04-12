import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { MultiSelect } from '@mantine/core';
import Avatar from './Avatar'
import Link from 'next/link'

import { Database } from '../utils/database.types'
import { Button } from '@mantine/core'
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [website, setWebsite] = useState<Profiles['website']>(null)
  const [type, setType] = useState<Profiles['type']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
  const [selectedType, setSelectedType] = useState([""]);

  useEffect(() => {
    getProfile()
  }, [session, user, supabase])

  /** Profile related functions */
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

        if (data.type?.includes(",")) {
          const [a, b] = data.type.split(",")
          setSelectedType([a, b]);
        } else if (data.type) {
          setSelectedType([data.type])
        }

        
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
    type,
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
      if (error) {
        throw error
      }
      alert('Profile updated!')
    } catch (error) {
      console.log(error)
      alert('Error updating the profile data!')
    } finally {
      setLoading(false)
    }
  }

  
  return (

    <div className="form-widget">
            <div>
        <a id="link" href="/homepage">
          ⬅️ &nbsp; Home
        </a>
      </div>
      <Avatar
        uid={user!.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
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
        <MultiSelect data= {[{value: 'student', label: "Student"}, {value: 'organizer', label: "Organizer"}] } value={selectedType} onChange = {(value)=> {setSelectedType(value); setType(value.toString())}} />
      </div>

  <div style = {{display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: 30}} >
      <div>
        <Button
          onClick={() => updateProfile({ username, website, avatar_url, type })}
          disabled={loading}
          style = {{marginRight: 30}}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </div>

      <div>
        <Button onClick={() => supabase.auth.signOut()}>
          Sign Out
        </Button>
      </div>
      </div>
    </div>
  )
}
