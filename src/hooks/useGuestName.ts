import { useEffect, useState } from 'react'
import { normalizeGuestName } from '../utils/invitation'

function getGuestName(): string | null {
  return normalizeGuestName(
    new URLSearchParams(window.location.search).get('name'),
  )
}

export function useGuestName(): string | null {
  const [guestName, setGuestName] = useState(getGuestName)
  useEffect(() => {
    const handlePopState = () => setGuestName(getGuestName())
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return guestName
}
