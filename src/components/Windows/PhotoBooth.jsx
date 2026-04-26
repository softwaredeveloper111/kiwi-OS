import { useEffect, useRef, useState } from "react"
import Macwindow from "./Macwindow"
import "./photobooth.scss"

const FILTERS = [
  { name: "Normal",      value: "none" },
  { name: "Noir",        value: "grayscale(100%) contrast(1.2)" },
  { name: "Vintage",     value: "sepia(80%) contrast(1.1)" },
  { name: "Matrix",      value: "hue-rotate(90deg) saturate(2) brightness(0.8)" },
  { name: "Invert",      value: "invert(100%)" },
  { name: "Warm",        value: "saturate(1.5) hue-rotate(340deg) brightness(1.1)" },
  { name: "Dream",       value: "blur(1.5px) brightness(1.2) saturate(1.3)" },
  { name: "Cold",        value: "hue-rotate(200deg) saturate(1.4) brightness(0.9)" },
]

const PhotoBooth = ({ windowName, setWindowsState }) => {
  const videoRef    = useRef(null)
  const canvasRef   = useRef(null)
  const streamRef   = useRef(null)

  const [activeFilter, setActiveFilter]   = useState(FILTERS[0])
  const [photos, setPhotos]               = useState([])
  const [cameraOn, setCameraOn]           = useState(false)
  const [error, setError]                 = useState(null)
  const [countdown, setCountdown]         = useState(null)
  const [flash, setFlash]                 = useState(false)

  // Camera start
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
      setCameraOn(true)
      setError(null)
    } catch (err) {
      setError("Camera access denied. Please allow camera permission.")
    }
  }

  // Camera stop — window band hone par
  useEffect(() => {
    startCamera()
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  // Countdown + capture
  const handleCapture = () => {
    if (!cameraOn) return
    let count = 3
    setCountdown(count)

    const id = setInterval(() => {
      count -= 1
      if (count === 0) {
        clearInterval(id)
        setCountdown(null)
        capturePhoto()
      } else {
        setCountdown(count)
      }
    }, 1000)
  }

  const capturePhoto = () => {
    const video  = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    canvas.width  = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")
    ctx.filter = activeFilter.value === "none" ? "none" : activeFilter.value
    ctx.drawImage(video, 0, 0)

    const dataUrl = canvas.toDataURL("image/png")
    setPhotos(prev => [dataUrl, ...prev].slice(0, 6))  // max 6 photos

    // Flash effect
    setFlash(true)
    setTimeout(() => setFlash(false), 200)
  }

  // Download photo
  const downloadPhoto = (dataUrl, index) => {
    const a = document.createElement("a")
    a.href = dataUrl
    a.download = `souravgiri-photobooth-${index + 1}.png`
    a.click()
  }

  return (
    <Macwindow windowName={windowName} setWindowsState={setWindowsState} width="620px" height="580px">
      <div className="pb-window">

        {/* Flash overlay */}
        {flash && <div className="pb-flash" />}

        {/* Main video */}
        <div className="pb-video-wrapper">
          {error ? (
            <div className="pb-error">{error}</div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="pb-video"
                style={{ filter: activeFilter.value }}
              />
              {countdown && (
                <div className="pb-countdown">{countdown}</div>
              )}
            </>
          )}
        </div>

        {/* Filter selector */}
        <div className="pb-filters">
          {FILTERS.map(f => (
            <button
              key={f.name}
              onClick={() => setActiveFilter(f)}
              className={`pb-filter-btn ${activeFilter.name === f.name ? "active" : ""}`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Capture button */}
        <div className="pb-controls">
          <button onClick={handleCapture} className="pb-capture-btn" disabled={!cameraOn || countdown !== null}>
            <div className="pb-capture-inner" />
          </button>
        </div>

        {/* Photo strip */}
        {photos.length > 0 && (
          <div className="pb-strip">
            {photos.map((photo, i) => (
              <div key={i} className="pb-thumb-wrapper" onClick={() => downloadPhoto(photo, i)}>
                <img src={photo} className="pb-thumb" alt={`photo-${i}`} />
                <div className="pb-thumb-overlay">⬇</div>
              </div>
            ))}
          </div>
        )}

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

      </div>
    </Macwindow>
  )
}

export default PhotoBooth