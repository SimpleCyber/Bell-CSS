"use client"

import { motion } from "framer-motion"

interface NotificationButtonProps {
  onClick: () => void
  isActive: boolean
}

export default function NotificationButton({ onClick, isActive }: NotificationButtonProps) {
  return (
    <motion.button
      className="notification-button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      animate={{
        backgroundColor: isActive ? "rgba(123, 44, 191, 0.3)" : "transparent",
      }}
      transition={{ duration: 0.3 }}
    >
      Send Notification
    </motion.button>
  )
}

