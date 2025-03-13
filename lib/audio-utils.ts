export function playBellSound() {
  // Try to play a bell sound using the Web Audio API as a fallback
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.type = "square"
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime) // A5
    oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.1) // A4

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.3)
  } catch (err) {
    console.error("Could not play fallback sound:", err)
  }
}

