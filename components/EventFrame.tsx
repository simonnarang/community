import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'

import Link from 'next/link';

import { Database } from '../utils/database.types'
import { Events, EventType} from "../utils/event.types"

export default function EventFrame(){
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  
 

  return (
    <>
    {}
    </>
  )
}