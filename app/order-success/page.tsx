'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function OrderSuccessPage() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const router = useRouter()

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)
    return () => window.removeEventListener('resize', updateWindowSize)
  }, [])

  return (
    <section className="min-h-screen max-w-[100vw] flex flex-col items-center overflow-hidden justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Confetti width={windowSize.width} height={windowSize.height} />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="bg-white p-8 rounded-lg shadow-xl text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-4 text-gray-800"
        >
          Order Placed Successfully&#33;
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-600 mb-8"
        >
          Thank you for your purchase. We&#39;re preparing your order with care&#33;
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition duration-300"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

