import React, { useState, useRef } from "react"
import { motion } from "framer-motion"

const AudioSearch = ({ onSearch }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      chunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        setIsRecording(false) // Ensure state resets
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" })
        await transcribeAndTranslate(audioBlob)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)

      // Automatically stop recording after 5 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop()
        }
      }, 5000)
    } catch (error) {
      console.error("Microphone access error:", error)
      setIsRecording(false)
    }
  }

  const transcribeAndTranslate = async (audioBlob) => {
    setIsProcessing(true)
    const formData = new FormData()
    formData.append("file", audioBlob)
    formData.append("model", "whisper-1")
    formData.append("task", "translate")

    try {
      const API_KEY = process.env.VITE_PUBLIC_OPENAI_API_KEY
      if (!API_KEY) {
        throw new Error("OpenAI API key is not set")
      }

      const response = await fetch("https://api.openai.com/v1/audio/translations", {
        method: "POST",
        headers: { Authorization: `Bearer ${API_KEY}` },
        body: formData,
      })

      const data = await response.json()

      if (data.text) {
        onSearch(data.text) // Only call if valid text exists
      } else {
        console.error("Transcription failed:", data)
      }
    } catch (error) {
      console.error("Error in transcription:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div>
    <motion.button
      onClick={startRecording}
      disabled={isRecording || isProcessing}
      className="p-2 rounded-full bg-primary text-white focus:outline-none"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isRecording ? (
        <motion.div
          className="w-5 h-5 rounded-full bg-red-500"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      ) : isProcessing ? (
        <motion.div
          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </motion.button>
    </div>
  )
}

export default AudioSearch
