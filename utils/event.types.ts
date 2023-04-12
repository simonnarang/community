import { Database } from '../utils/database.types'


export type Events = Database['public']['Tables']['events']['Row']


export interface EventType {
  
    id: Events["id"],
    org_name: Events['org_name'],
    event_name: Events['event_name'],
    event_flyer: Events['event_flyer'],
    location: Events['location'],
    event_time: Events['event_time'],
    type: Events["type"],
    event_avatar: Events["event_avatar"]
}

