import { Card, Image, Text, Badge, Button, Group, Modal, useMantineTheme } from '@mantine/core'
import { Events, EventType } from '../utils/event.types'
import { faker } from '@faker-js/faker'
import React, { useEffect, useState } from 'react'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'

export default function EventFrame(props: any) {
  const supabase = useSupabaseClient()

  const eventDetails: Events = props.eventDetails
  const [modalOpen, setModalOpen] = useState(false)

  const [url, setUrl] = useState<String | null>(null)

  const theme = useMantineTheme()

  const dateTimeString = eventDetails.event_time
  let [dateString, timeString] = ['', '']
  let time12 = ''

  useEffect(() => {
    async function convertAvatarToUrl(path: string | null) {
      try {
        const { data, error } = await supabase.storage.from('flyers').download(path as string)
        if (error) {
          throw error
        }
        const url = URL.createObjectURL(data)

        setUrl(url)
      } catch (err) {
        console.log(err)
      }
    }

    if (eventDetails.event_avatar) convertAvatarToUrl(eventDetails.event_avatar)
  }, [props, supabase.storage])

  const handleOpen = () => setModalOpen(true)
  const handleClose = () => setModalOpen(false)
  const testUrl = faker.image.imageUrl(undefined, undefined, 'johnshopkins', true)
  if (dateTimeString) {
    ;[dateString, timeString] = dateTimeString?.split('T')
    ;[timeString] = timeString.split('+')
    let [hourString, minuteString] = timeString.split(':')
    let hour = parseInt(hourString, 10)
    let minute = parseInt(minuteString, 10)
    let ampm = hour >= 12 ? 'PM' : 'AM'
    hour %= 12
    hour = hour ? hour : 12
    time12 = `${hour}:${minute} ${ampm}`
  }

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={eventDetails.event_avatar ? (url as string) : testUrl} height={160} />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{eventDetails.event_name}</Text>
          <Badge color="pink" w={100} variant="light">
            {eventDetails.org_name}
          </Badge>
        </Group>

        <Text size="sm" color="dimmed"></Text>

        <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={handleOpen}>
          Register {eventDetails.event_time ? 'for' : ''} {eventDetails.event_time}
        </Button>
      </Card>

      <Modal
        opened={modalOpen}
        onClose={handleClose}
        title="Event Details"
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        style={{ textAlign: 'center' }}
      >
        <Badge color="pink" w={100} variant="light">
          {eventDetails.org_name}
        </Badge>

        <p style={{ fontSize: 30 }}>{eventDetails.event_name}</p>
        <Image
          src={eventDetails.event_avatar ? (url as string) : testUrl}
          width={410}
          height={290}
        />
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Badge color="yellow" radius="xs" w={100} variant="light" style={{ marginBottom: 10 }}>
              Date
            </Badge>
            <div style={{ marginLeft: 80 }}>
              {dateString ? dateString : eventDetails.event_time}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Badge color="yellow" radius="xs" w={100} variant="light" style={{ marginBottom: 10 }}>
              Time
            </Badge>
            <div style={{ marginLeft: 80 }}>{time12 ? time12 : eventDetails.event_time}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Badge color="yellow" radius="xs" w={100} variant="light" style={{ marginBottom: 10 }}>
              Location
            </Badge>
            <div style={{ marginLeft: 80 }}>{eventDetails.location}</div>
          </div>
          {/* <Badge color="yellow" radius="xs" w={100} variant = "light" style={{marginBottom: 10}}>
              Description
           </Badge> */}
        </div>

        <Button onClick={handleClose} mr="md" style={{ marginTop: 20 }}>
          Register
        </Button>
      </Modal>
    </>
  )
}
