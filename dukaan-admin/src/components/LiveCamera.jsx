import React from "react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"


const LivePhotoCapture = ({ onPhotoCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCapturing(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const photoDataUrl = canvasRef.current.toDataURL("image/jpeg")
        onPhotoCapture(photoDataUrl)
        stopCamera()
      }
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject).getTracks()
      tracks.forEach((track) => track.stop())
      setIsCapturing(false)
    }
  }

  return (
    <div className="live-photo-capture">
      <video ref={videoRef} autoPlay style={{ display: isCapturing ? "block" : "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} width={640} height={480} />
      {!isCapturing ? (
        <Button onClick={startCamera}>Start Camera</Button>
      ) : (
        <Button onClick={capturePhoto}>Capture Photo</Button>
      )}
    </div>
  )
}

export default LivePhotoCapture

