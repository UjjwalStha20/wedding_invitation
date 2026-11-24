import { useEffect, useState } from 'react'
import { getGuestName } from '../utils/invitation'

export function useGuestName(): string | null {
  const [guestName, setGuestName] = useState<string | null>(() => getGuestName())

  useEffect(() => {
    const refresh = () => setGuestName(getGuestName())
    window.addEventListener('popstate', refresh)
    return () => window.removeEventListener('popstate', refresh)
  }, [])

  return guestName
}
