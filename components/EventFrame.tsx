import { Card, Image, Text, Badge, Button, Group, Modal } from '@mantine/core';
import { Events, EventType } from '../utils/event.types';
import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'

export default function EventFrame(props: any) {

  const supabase = useSupabaseClient();

  const eventDetails: Events = props.eventDetails;
  const [modalOpen, setModalOpen] = useState(false);

  const [url, setUrl] = useState<String | null>(null);


  useEffect(() => {
    async function convertAvatarToUrl(path: string | null){
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

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={ eventDetails.event_avatar ? url as string : faker.image.imageUrl(undefined, undefined, 'johnshopkins', true) }
            height={160}
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{eventDetails.event_name}</Text>
          <Badge color="pink" w={100} variant="light">
            {eventDetails.org_name}
          </Badge>
        </Group>

        <Text size="sm" color="dimmed"></Text>

        <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={handleOpen}>
          View event now!
        </Button>
      </Card>

      <Modal
        opened={modalOpen}
        onClose={handleClose}
        title="Event Details"
      >
        <p>pop-up screen.</p>
        <Button onClick={handleClose} mr="md">Register</Button>
        <Button onClick={handleClose} ml="md">Close</Button>
      </Modal>
    </>
  );
}
