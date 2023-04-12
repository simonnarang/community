import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'

import { Events } from '../utils/event.types'
export default function Flyer({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string
  url: Events['event_avatar']
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = useSupabaseClient<Database>()
  const [flyer_url, setFlyer] = useState<Events['event_avatar']>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('flyers').download(path)
        if (error) {
          throw error
        }
        const url = URL.createObjectURL(data)
        setFlyer(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase.storage])

  const uploadFlyer: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${(Math.random() + 1).toString(36).substring(7)}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('flyers')
        .upload(filePath, file, { upsert: false })

      if (uploadError) {
        console.log("This ran")
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading event flyer!')
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {flyer_url ? (
        <img
          src={flyer_url}
          alt="Event Flyer"
          className="flyer image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="flyer no-image" style={{ height: size, width: size }} />
      )}
      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadFlyer}
          disabled={uploading}
        />
      </div>
    </div>
  )
}
