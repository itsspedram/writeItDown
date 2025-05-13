'use client'

import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { JournalEntry } from '@prisma/client'
import Link from 'next/link'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

export default function JournalPage() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded) return

    if (!user) {
      router.push('/sign-in')
      return
    }

    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/journal')
        if (!response.ok) throw new Error('Failed to fetch entries')
        const data = await response.json()
        setEntries(data)
      } catch (error) {
        console.error('Error fetching entries:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEntries()
  }, [user, isLoaded, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-100">
      <header className="bg-dark-200 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-300">My Journal</h1>
            <div className="flex items-center space-x-4">
              <Link
                href="/journal/new"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 transform hover:scale-105"
              >
                New Entry
              </Link>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-dark-300 text-gray-300 rounded-lg hover:bg-dark-400 transition-all duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {entries.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-primary-300 mb-4">
              No entries yet
            </h2>
            <p className="text-gray-300 mb-8">
              Start your journaling journey by creating your first entry.
            </p>
            <Link
              href="/journal/new"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 transform hover:scale-105"
            >
              Create First Entry
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-dark-200 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-200"
              >
                <Link href={`/journal/${entry.id}`}>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-primary-300 mb-2">
                      {entry.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4">
                      {format(new Date(entry.createdAt), 'MMMM d, yyyy')}
                    </p>
                    <p className="text-gray-300 line-clamp-3">{entry.content}</p>
                    {entry.mood && (
                      <p className="mt-4 text-primary-300">Mood: {entry.mood}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
} 