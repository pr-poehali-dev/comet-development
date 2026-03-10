import { X } from "lucide-react"
import { useState, useEffect } from "react"

interface AnnouncementBannerProps {
  onVisibilityChange?: (isVisible: boolean) => void
}

interface BannerInfo {
  id: string
  desktopText: string
  mobileText: string
  linkText: string
  linkUrl: string
}

const bannerInfos: BannerInfo[] = [
  {
    id: "promo",
    desktopText: "Скидка 20% на первый заказ — только до конца месяца. Успейте оформить заявку!",
    mobileText: "Скидка 20% на первый заказ!",
    linkText: "Заказать",
    linkUrl: "#",
  },
  {
    id: "portfolio",
    desktopText: "Новые работы в портфолио — посмотрите что мы сделали для брендов и стартапов",
    mobileText: "Новые работы в портфолио",
    linkText: "Смотреть",
    linkUrl: "#portfolio",
  },
  {
    id: "speed",
    desktopText: "Срочная анимация за 48 часов — напишите нам и мы обсудим детали",
    mobileText: "Срочная анимация за 48 часов",
    linkText: "Написать",
    linkUrl: "#",
  },
]

export default function AnnouncementBanner({ onVisibilityChange }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const currentBanner = bannerInfos[currentBannerIndex]

  useEffect(() => {
    if (!isVisible || bannerInfos.length <= 1 || isPaused) return

    const interval = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % bannerInfos.length)
        setIsTransitioning(false)
      }, 300)
    }, 8000)

    return () => clearInterval(interval)
  }, [isVisible, isPaused])

  const handleClose = () => {
    setIsVisible(false)
    onVisibilityChange?.(false)
  }

  useEffect(() => {
    onVisibilityChange?.(isVisible)
  }, [isVisible, onVisibilityChange])

  if (!isVisible) return null

  const simpleTransition = isTransitioning ? "opacity-0 transform scale-98" : "opacity-100 transform scale-100"

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-black border-b border-white/10">
      <div className="sr-only" aria-live="polite" aria-atomic="true" key={currentBanner.id}>
        {currentBanner.desktopText}
      </div>

      <div
        className="flex items-center justify-center px-4 py-2 sm:py-3 max-w-7xl mx-auto min-h-[44px] sm:min-h-[52px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex items-center gap-3 transition-all duration-600 ease-out motion-reduce:transition-none motion-reduce:transform-none ${simpleTransition}`}
        >
          <div
            className={`w-1 h-4 bg-gradient-to-b from-cyan-400 via-orange-400 to-pink-400 rounded-full transition-all duration-300 ease-out motion-reduce:transition-none ${
              isTransitioning ? "scale-110 shadow-lg shadow-cyan-400/50" : "scale-100"
            }`}
          ></div>

          <a
            href={currentBanner.linkUrl}
            className="text-white/90 text-xs sm:text-sm cursor-pointer leading-tight"
            style={{
              fontFamily: '"GeistSans", sans-serif',
              fontWeight: 500,
              letterSpacing: "-0.01em",
              lineHeight: "1.3",
            }}
          >
            <span className="hidden sm:inline">{currentBanner.desktopText} -&gt; </span>
            <span className="sm:hidden">{currentBanner.mobileText} -&gt;</span>
            <span className="text-white hover:text-white/80 transition-colors underline decoration-white/30 hover:decoration-white/60 underline-offset-2">
              {currentBanner.linkText}
            </span>
          </a>
        </div>

        {bannerInfos.length > 1 && (
          <div className="absolute right-16 hidden sm:flex items-center gap-1.5">
            {bannerInfos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out motion-reduce:transition-none ${
                  index === currentBannerIndex ? "bg-white w-6 shadow-sm" : "bg-white/30 hover:bg-white/50 w-1.5"
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
                aria-label={`Переключить на баннер ${index + 1}`}
              />
            ))}
          </div>
        )}

        <button
          onClick={handleClose}
          className="absolute right-4 p-1.5 text-white/50 hover:text-white/80 hover:bg-white/5 rounded-md transition-all duration-200 flex-shrink-0 motion-reduce:transition-none"
          aria-label="Закрыть баннер"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
