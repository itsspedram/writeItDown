'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { JournalEntry } from '@prisma/client'
import Link from 'next/link'
import { format } from 'date-fns'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function JournalEntryPage({
  params,
}: {
  params: { id: string }
}) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [entry, setEntry] = useState<JournalEntry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedContent, setEditedContent] = useState('')
  const [editedMood, setEditedMood] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (!isLoaded) return

    if (!user) {
      router.push('/sign-in')
      return
    }

    const fetchEntry = async () => {
      try {
        const response = await fetch(`/api/journal/${params.id}`)
        if (!response.ok) throw new Error('Failed to fetch entry')
        const data = await response.json()
        setEntry(data)
        setEditedTitle(data.title)
        setEditedContent(data.content)
        setEditedMood(data.mood || '')
      } catch (error) {
        console.error('Error fetching entry:', error)
        router.push('/journal')
      } finally {
        setIsLoading(false)
      }
    }

    fetchEntry()
  }, [user, isLoaded, router, params.id])

  const handleEdit = async () => {
    if (!entry) return

    try {
      const response = await fetch(`/api/journal/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          content: editedContent,
          mood: editedMood,
        }),
      })

      if (!response.ok) throw new Error('Failed to update entry')
      const updatedEntry = await response.json()
      setEntry(updatedEntry)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating entry:', error)
    }
  }

  const handleDelete = async () => {
    if (!entry) return

    try {
      const response = await fetch(`/api/journal/${params.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete entry')
      router.push('/journal')
    } catch (error) {
      console.error('Error deleting entry:', error)
    }
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-primary-300 mb-4">
            Entry not found
          </h2>
          <Link
            href="/journal"
            className="text-primary-400 hover:text-primary-300 transition-colors"
          >
            Back to Journal
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-dark-200 rounded-xl shadow-xl p-8"
        >
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.input
                    key="edit-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    type="text"
                    value={editedTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTitle(e.target.value)}
                    className="w-full text-4xl font-bold text-primary-300 bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 mb-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter title..."
                  />
                ) : (
                  <motion.h1
                    key="view-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-4xl font-bold text-primary-300 mb-2"
                  >
                    {entry.title}
                  </motion.h1>
                )}
              </AnimatePresence>
              <p className="text-gray-400">
                {format(new Date(entry.createdAt), 'MMMM d, yyyy • h:mm a')}
              </p>
            </div>
            <div className="flex space-x-4">
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div
                    key="edit-buttons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex space-x-4"
                  >
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 transform hover:scale-105"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-dark-300 text-gray-300 rounded-lg hover:bg-dark-400 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="view-buttons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex space-x-4"
                  >
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 transform hover:scale-105"
                    >
                      Edit Entry
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
                    >
                      Delete
                    </button>
                    <Link
                      href="/journal"
                      className="px-4 py-2 bg-dark-300 text-gray-300 rounded-lg hover:bg-dark-400 transition-all duration-200"
                    >
                      Back
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {entry.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-8 relative aspect-video w-full overflow-hidden rounded-lg"
            >
              <Image
                src={entry.imageUrl}
                alt={entry.title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="edit-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full h-64 px-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Write your thoughts here..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mood
                  </label>
                  <input
                    type="text"
                    value={editedMood}
                    onChange={(e) => setEditedMood(e.target.value)}
                    placeholder="How are you feeling? (optional)"
                    className="w-full px-4 py-2 bg-dark-300 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="view-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="prose prose-invert max-w-none"
              >
                <p className="text-gray-300 whitespace-pre-wrap">{entry.content}</p>
                {entry.mood && (
                  <p className="mt-4 text-primary-300">
                    Mood: {entry.mood}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-200 rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold text-primary-300 mb-4">
                Delete Entry
              </h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this entry? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-dark-300 text-gray-300 rounded-lg hover:bg-dark-400 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    handleDelete()
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 