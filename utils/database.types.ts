export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]



export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          type: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          type?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          type?: string | null
        }
      }
      events: { //username, eventName, location, date, time, type
        Row: {
          id: string
          updated_at?: string | null
          org_name?: string | null
          event_name?: string | null
          event_flyer?: string | null
          location?: string | null
          date?: string | null
          time?: string | null
          type?: string | null
        }
        Insert: {
          id: string
          updated_at: string | null
          username?: string | null
          org_name?: string | null
          event_name?: string | null
          event_flyer?: string | null
          location?: string | null
          date?: string | null
          time?: string | null
          type?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          org_name?: string | null
          event_name?: string | null
          event_flyer?: string | null
          location?: string | null
          date?: string | null
          time?: string | null
          type?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

