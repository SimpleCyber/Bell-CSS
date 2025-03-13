import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Notification PWA",
    short_name: "NotifyPWA",
    description: "A Progressive Web App with push notifications",
    start_url: "/",
    display: "standalone",
    background_color: "#1a0b2e",
    theme_color: "#2d1b4e",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

