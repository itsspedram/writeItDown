'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen bg-dark-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500 mb-4"></div>
        <p className="text-gray-300">Loading...</p>
      </motion.div>
    </div>
  )
} 