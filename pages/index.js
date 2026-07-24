import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Redirect to the static app page (index.html) in /public
    // The legacy SPA (index.html) is preserved in /public for now.
    if (typeof window !== 'undefined') {
      window.location.replace('/index.html')
    }
  }, [])
  return null
}
