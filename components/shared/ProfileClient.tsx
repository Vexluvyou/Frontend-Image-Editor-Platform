// app/(root)/profile/ProfileClient.tsx
'use client'

import { useSearchParams } from 'next/navigation'

const ProfileClient = () => {
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter')

  return (
    <div>
      <p>Filter param: {filter}</p>
      {/* Your actual profile UI here */}
    </div>
  )
}

export default ProfileClient
