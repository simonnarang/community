import { Database } from '../utils/database.types'

export type Registration = Database['public']['Tables']['registration']['Row']

export interface RegistrationType {
  id: Registration['id'],
  user_id: Registration['user_id'],
  event_id: Registration['event_id'],
}
