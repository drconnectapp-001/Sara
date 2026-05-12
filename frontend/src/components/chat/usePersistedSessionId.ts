'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'sara-chat-session-id'

function readOrCreate(): string {
  if (typeof window === 'undefined') return ''
  let id = window.localStorage.getItem(STORAGE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    window.localStorage.setItem(STORAGE_KEY, id)
  }
  return id
}

/** Stable chat session id persisted in localStorage for the companion API. */
export function usePersistedSessionId(): string {
  const [id, setId] = useState('')

  useEffect(() => {
    setId(readOrCreate())
  }, [])

  return id
}
