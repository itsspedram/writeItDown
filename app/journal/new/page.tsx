import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import NewEntryForm from './NewEntryForm'

export default async function NewEntryPage() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">New Journal Entry</h1>
      <NewEntryForm userId={userId} />
    </div>
  )
} 