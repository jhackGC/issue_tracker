// import { db } from '@/db'
// import { getSession } from './auth'
// import { eq } from 'drizzle-orm'
// import { cache } from 'react'
// import { issues, users } from '@/db/schema'
// import { mockDelay } from './utils'

import { User } from "@/db/schema";

export const getUserByEmail = (email: string): Promise<User | null> => {
  return Promise.resolve(null);
};
