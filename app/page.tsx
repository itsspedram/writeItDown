'use client'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()



  return (
    <div className="min-h-screen bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-primary-300 mb-6">
              Write It Down
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Capture your thoughts, track your mood, and preserve your memories in a beautiful, private journal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-in"
                className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 text-lg font-semibold"
              >
                Get Started
              </Link>
              <Link
                href="/sign-up"
                className="px-8 py-4 bg-dark-300 text-gray-300 rounded-lg hover:bg-dark-400 transition-all duration-200 text-lg font-semibold"
              >
                Create Account
              </Link>
            </div>
          </motion.div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-dark-200 p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-primary-300 mb-3">Private & Secure</h3>
              <p className="text-gray-300">Your thoughts are yours alone. We ensure your journal entries remain private and secure.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-dark-200 p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-primary-300 mb-3">Track Your Mood</h3>
              <p className="text-gray-300">Record your feelings and track your emotional journey over time.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-dark-200 p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-primary-300 mb-3">Add Images</h3>
              <p className="text-gray-300">Enhance your entries with images to make your memories even more vivid.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
