import { Card, Image, Text, Badge, Button, Group, Modal, useMantineTheme } from '@mantine/core'
import { Events, EventType } from '../utils/event.types'
import { faker } from '@faker-js/faker'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'


import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'
import { Registration } from '../utils/registration.types'


export default function EventFrame(props: any) {
  const supabase = useSupabaseClient()
  const user = useUser()


  const eventDetails: Events = props.eventDetails
  const [modalOpen, setModalOpen] = useState(false)

  const [url, setUrl] = useState<String | null>(null)

  const theme = useMantineTheme()

  const dateTimeString = eventDetails.event_time
  let [dateString, timeString] = ['', '']
  let time12 = ''

  const [userNames, setUserNames] = useState<string[]>([]);


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
  }, [props, supabase.storage, user])

  const handleOpen = () => {
    setModalOpen(true); console.log("regsitration:" + eventDetails.id); 
    getUsernamesByEventId();
    console.log("THIS", userNames)
  }
  const handleClose = () => setModalOpen(false)
  const handleRegisteration = () => {
    addRegistration({event_id: eventDetails.id ?? '||', user_id: user?.id  ?? '||' })
    setModalOpen(false)
  }
  
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
    let paddedMinute = minute.toString().padStart(2, '0');
    time12 = `${hour}:${paddedMinute} ${ampm}`

  }

async function addRegistration({
  user_id,
  event_id,
}: {
  user_id: Registration['user_id'];
  event_id: Registration['event_id'];
}) {
  try {
    if (!user) throw new Error('No user');


     // Check if user is already registered for this event
     const { data: existingRegistration, error: existingRegistrationError } =
     await supabase
       .from('registration')
       .select('id')
       .eq('user_id', user_id)
       .eq('event_id', event_id);
   if (existingRegistrationError) {
     throw existingRegistrationError;
   }
   if (existingRegistration && existingRegistration.length > 0) {
     alert('User is already registered for this event');
     return;
   }

    const updates = {
      id: uuidv4(),
      event_id,
      user_id,
    };

    let { data, error } = await supabase.from('registration').insert(updates);
    if (error) {
      throw error;
    }

    alert('Registration added');
  } catch (error) {
    console.log(error);
    alert('Error adding registration');
  }
}

  async function getUsernamesByEventId() {
    let names: any[] = [];
    try {
      // find user_id for current event_id in registration database
      const { data: registrationData, error: registrationError } = await supabase
        .from('registration')
        .select('user_id')
        .eq('event_id', eventDetails.id);
  
      if (registrationError) {
        throw registrationError;
      }
      // save that userId to userIds for multiple userIds
      const userIds = registrationData.map((item) => item.user_id);
   
      // find usernames for each userIds in profiles database
      const promises: Promise<any>[] = userIds.map(async (userId) => {
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', userId);
        if (profilesError) {
          throw profilesError;
        }
      return profilesData[0].username;
      });
    


      const usernames = await Promise.all(promises);
      console.log(usernames)
      setUserNames(usernames)
      return usernames;

    } catch (error) {
      console.log(error);
      return [];
    }
  }



  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{height:330}}>
        <Card.Section>
          {eventDetails.event_avatar && (
            <Image src={eventDetails.event_avatar ? (url as string) : null} height={160} />
          )}
          {!eventDetails.event_avatar && (
            <div style={{height: 160}}></div>
          )}
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{eventDetails.event_name}</Text>
        </Group>
        <Badge color="pink" w={100} variant="light" style={{marginBottom: 10}}>
            {eventDetails.org_name}
        </Badge>
        <Text size="sm" color="dimmed"></Text>

        <Button variant="light" color="blue" radius="md" onClick={handleOpen} style={{width: "100%" }}>
          Register {eventDetails.event_time ? 'for ' + new Date(eventDetails.event_time).toDateString().substring(0, 10) : ''} 
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

          {/*Attendee list*/}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Badge color="yellow" radius="xs" w={100} variant = "light" style={{marginBottom: 10}}>
              Attendees
           </Badge>
           <div style={{ marginLeft: 80 }}>{userNames.join(', ')}</div>
           </div>
        </div>

        <Button onClick={handleRegisteration} mr="md" style={{ marginTop: 20 }}>
          Register
        </Button>
      </Modal>
    </>
  )
}
