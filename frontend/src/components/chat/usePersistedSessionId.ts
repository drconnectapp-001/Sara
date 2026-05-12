'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'sara-chat-session-id'

function generateId(): string {
  // crypto.randomUUID() requires HTTPS — fall back to Math.random on plain HTTP
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

function readOrCreate(): string {
  if (typeof window === 'undefined') return ''
  let id = window.localStorage.getItem(STORAGE_KEY)
  if (!id) {
    id = generateId()
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
