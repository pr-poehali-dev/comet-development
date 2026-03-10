import { useEffect, useRef, useState } from "react"

interface FeatureVideoProps {
  src: string
  alt: string
  fallbackSrc?: string
  fixedAspectRatio?: boolean
}

export default function FeatureVideo({ src, alt, fallbackSrc, fixedAspectRatio = false }: FeatureVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    const handleError = () => {
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc)
        setIsLoaded(false)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      {
        threshold: 0.2,
        rootMargin: "50px 0px",
      },
    )

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)
    observer.observe(container)

    video.load()

    if (video.readyState >= 3) {
      handleCanPlay()
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
      observer.disconnect()
    }
  }, [currentSrc, fallbackSrc])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isLoaded) return

    if (isInView) {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Video autoplay failed:", error)
        })
      }
    } else {
      if (!video.paused) {
        video.pause()
      }
    }
  }, [isInView, isLoaded])

  useEffect(() => {
    if (src !== currentSrc) {
      setCurrentSrc(src)
      setIsLoaded(false)
    }
  }, [src, currentSrc])

  return (
    <div
      ref={containerRef}
      className={`w-full bg-black rounded-t-lg overflow-hidden`}
      style={fixedAspectRatio ? { aspectRatio: "1728/1080" } : {}}
    >
      <video
        ref={videoRef}
        src={currentSrc}
        className={`w-full h-full transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        loop
        muted
        playsInline
        controls={false}
        preload="auto"
        aria-label={alt}
      />
    </div>
  )
}
