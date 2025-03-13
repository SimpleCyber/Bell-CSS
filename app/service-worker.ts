/// <reference lib="webworker" />


export {} // Ensure this is treated as a module in TypeScript


declare const self: ServiceWorkerGlobalScope

self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {}
  const title = data.title || "New Notification"
  const options = {
    body: data.body || "You have a new notification!",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus()
      }
      return self.clients.openWindow("/")
    }),
  )
})

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})

// Any other custom service worker logic can go here.
self.addEventListener("install", (event) => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim())
})