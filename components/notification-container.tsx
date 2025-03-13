"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import BellIcon from "./bell-icon"
import NotificationButton from "./notification-button"

interface NotificationContainerProps {
  onSendNotification: () => void
  notificationSent: boolean
}

export default function NotificationContainer({ onSendNotification, notificationSent }: NotificationContainerProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleBellClick = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  return (
    <div className="notification-container">
      <motion.h1
        className="greeting"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hola!
      </motion.h1>

      <BellIcon isAnimating={isAnimating} onClick={handleBellClick} />

      <motion.h2
        className="title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Lorem Ipsum...
      </motion.h2>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Lorem ipsum dolor sit amet.
      </motion.p>

      <NotificationButton onClick={onSendNotification} isActive={notificationSent} />
    </div>
  )
}

