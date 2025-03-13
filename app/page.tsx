"use client"

import { useState, useEffect } from "react"
import NotificationContainer from "../components/notification-container"
import BackgroundGrid from "../components/background-grid"
import { registerServiceWorker } from "../lib/register-sw"

export default function Home() {
  const [notificationSent, setNotificationSent] = useState(false)

  useEffect(() => {
    registerServiceWorker()
  }, [])

  const handleSendNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("New Notification", {
        body: "You have a new notification!",
        icon: "/icon-192x192.png",
      })
      setNotificationSent(true)
      setTimeout(() => setNotificationSent(false), 3000)
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("New Notification", {
            body: "You have a new notification!",
            icon: "/icon-192x192.png",
          })
          setNotificationSent(true)
          setTimeout(() => setNotificationSent(false), 3000)
        }
      })
    }
  }

  return (
    <main className="main-container">
      <BackgroundGrid />
      <NotificationContainer onSendNotification={handleSendNotification} notificationSent={notificationSent} />
    </main>
  )
}

