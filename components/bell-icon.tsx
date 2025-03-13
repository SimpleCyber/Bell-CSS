"use client"

import { useRef, useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { motion } from "framer-motion"
import { playBellSound } from "@/lib/audio-utils"

interface BellIconProps {
  isAnimating: boolean
  onClick: () => void
}

export default function BellIcon({ isAnimating, onClick }: BellIconProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Create and preload the video element
    const video = videoRef.current
    if (video) {
      // Add event listeners
      const handleCanPlayThrough = () => {
        setVideoLoaded(true)
      }

      const handleError = (e: ErrorEvent) => {
        console.error("Video error:", e)
        // Video failed to load, we'll use the fallback sound
      }

      video.addEventListener("canplaythrough", handleCanPlayThrough)
      video.addEventListener("error", handleError as EventListener)

      // Attempt to load the video
      video.load()

      return () => {
        video.removeEventListener("canplaythrough", handleCanPlayThrough)
        video.removeEventListener("error", handleError as EventListener)
      }
    }
  }, [])

  useEffect(() => {
    if (isAnimating) {
      if (videoRef.current && videoLoaded) {
        try {
          videoRef.current.currentTime = 0
          const playPromise = videoRef.current.play()

          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.log("Play was prevented, using fallback:", error)
              playBellSound()
            })
          }
        } catch (err) {
          console.error("Error playing video, using fallback:", err)
          playBellSound()
        }
      } else {
        // If video isn't loaded, use fallback sound
        playBellSound()
      }
    }
  }, [isAnimating, videoLoaded])

  const handleClick = () => {
    onClick()
  }

  return (
    <div className="bell-container" onClick={handleClick}>
      <div className="bell-circle bell-circle-1"></div>
      <div className="bell-circle bell-circle-2"></div>
      <div className="bell-circle bell-circle-3"></div>

      <motion.div
        className="bell-background"
        animate={{
          scale: isAnimating ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{
            rotate: isAnimating ? [0, -10, 10, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <Bell className="bell-icon" />
        </motion.div>
      </motion.div>

      <video ref={videoRef} style={{ display: "none" }} muted={false} preload="auto">
        <source src="/bell.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

