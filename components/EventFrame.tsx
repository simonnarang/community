import { Card, Image, Text, Badge, Button, Group } from '@mantine/core'

import { Events, EventType } from '../utils/event.types'
import { faker } from '@faker-js/faker'

export default function EventFrame(props: any) {
  const eventDetails: Events = props.eventDetails
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={faker.image.imageUrl(undefined, undefined, 'johnshopkins', true)}
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}> {eventDetails.event_name} </Text>
          <Badge color="pink" w={100} variant="light">
            {eventDetails.org_name}
          </Badge>
        </Group>

        <Text size="sm" color="dimmed"></Text>

        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          View event now!
        </Button>
      </Card>
    </>
  )
}
