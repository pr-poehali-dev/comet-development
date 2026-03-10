import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, Play } from "lucide-react"
import FeatureVideo from "@/components/FeatureVideo"

interface SearchQuery {
  id: string
  question: string
  videoSrc: string
  fallbackSrc?: string
  category: string
}

const searchQueries: SearchQuery[] = [
  {
    id: "brand",
    question: "Анимация для рекламного ролика бренда",
    videoSrc: "/videos/favorites.mp4",
    fallbackSrc: "/videos/favorites.mp4",
    category: "Реклама",
  },
  {
    id: "character",
    question: "Персонажная анимация для игры",
    videoSrc: "/videos/update-windsurf.mp4",
    fallbackSrc: "/videos/update-windsurf.mp4",
    category: "Игры",
  },
  {
    id: "explainer",
    question: "Explainer-видео для стартапа",
    videoSrc: "/videos/dark-mode-search.mp4",
    fallbackSrc: "/videos/dark-mode-search.mp4",
    category: "Бизнес",
  },
  {
    id: "logo",
    question: "Анимация логотипа для соцсетей",
    videoSrc: "/videos/did-v9.mp4",
    fallbackSrc: "/videos/did-v9.mp4",
    category: "Брендинг",
  },
]

interface AgenticAISearchSectionProps {
  onOpenInstall?: () => void
}

export default function AgenticAISearchSection({ onOpenInstall }: AgenticAISearchSectionProps) {
  const [activeQuery, setActiveQuery] = useState(searchQueries[0])
  const [hoveredQuery, setHoveredQuery] = useState<string | null>(null)
  const [videosLoaded, setVideosLoaded] = useState<{ [key: string]: boolean }>({})
  const videoCache = useRef<{ [key: string]: HTMLVideoElement }>({})
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const preloadVideos = async () => {
      setVideosLoaded({ [searchQueries[0].id]: true })

      for (const query of searchQueries) {
        if (query.id === searchQueries[0].id) continue

        const video = document.createElement("video")
        video.muted = true
        video.preload = "auto"
        video.playsInline = true
        video.loop = true

        videoCache.current[query.id] = video

        video.src = query.videoSrc

        setTimeout(() => {
          setVideosLoaded((prev) => ({ ...prev, [query.id]: true }))
        }, 1000)

        video.onerror = () => {
          if (query.fallbackSrc) {
            video.src = query.fallbackSrc
          }
        }
      }
    }

    preloadVideos()

    return () => {
      Object.values(videoCache.current).forEach((video) => {
        video.src = ""
        video.load()
      })
      videoCache.current = {}
    }
  }, [])

  const handleQueryClick = (query: SearchQuery) => {
    setActiveQuery(query)
  }

  const handleQueryHover = (query: SearchQuery) => {
    if (isHovering) {
      setHoveredQuery(query.id)
      setActiveQuery(query)
    }
  }

  const handleSectionEnter = () => {
    setIsHovering(true)
  }

  const handleSectionLeave = () => {
    setIsHovering(false)
    setHoveredQuery(null)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Реклама":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-400/30"
      case "Игры":
        return "bg-orange-500/20 text-orange-300 border-orange-400/30"
      case "Бизнес":
        return "bg-pink-500/20 text-pink-300 border-pink-400/30"
      case "Брендинг":
        return "bg-purple-500/20 text-purple-300 border-purple-400/30"
      default:
        return "bg-white/20 text-white border-white/30"
    }
  }

  return (
    <div className="my-24">
      <div className="text-center mb-6 md:mb-12 px-4">
        <h2
          className="mb-4 font-semibold"
          style={{
            backgroundImage: "linear-gradient(rgb(245, 245, 245), rgb(245, 245, 245) 29%, rgb(153, 153, 153))",
            color: "transparent",
            fontFamily: "GeistSans, sans-serif",
            fontSize: "clamp(32px, 6vw, 52px)",
            fontWeight: 600,
            letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
            lineHeight: "1.15",
            textAlign: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Любой тип анимации
        </h2>
        <p
          className="max-w-2xl mx-auto"
          style={{
            color: "#f5f5f5",
            fontFamily: "GeistMono, monospace",
            fontSize: "clamp(16px, 3vw, 22px)",
            lineHeight: "1.3",
            textAlign: "center",
          }}
        >
          Реклама, игры, брендинг или обучение — у нас есть опыт в каждом направлении.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="gradient-container gradient-blue-red max-w-[1296px] w-full relative">
          <div className="absolute inset-0 bg-black/35 rounded-[16px]"></div>
          <div className="noise-texture"></div>

          <div className="relative z-10 pt-4 sm:pt-12 md:pt-16 pb-0 px-4 sm:px-6 md:px-12">
            <div className="rounded-t-lg overflow-hidden shadow-2xl max-w-4xl mx-auto border border-white/10 border-b-0 relative">
              <FeatureVideo
                src={activeQuery.videoSrc}
                alt={`Пример: ${activeQuery.question}`}
                fallbackSrc={activeQuery.fallbackSrc}
                fixedAspectRatio={true}
              />

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:hidden z-20">
                <div className="flex gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
                  {searchQueries.map((query) => (
                    <button
                      key={query.id}
                      onClick={() => setActiveQuery(query)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        activeQuery.id === query.id ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Переключить на: ${query.question}`}
                    />
                  ))}
                </div>
              </div>

              <div
                className="absolute inset-0 hidden lg:block pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 40%, transparent 70%)",
                }}
              ></div>

              <div
                className="absolute inset-0 hidden lg:flex flex-col justify-end p-6 lg:p-8"
                onMouseEnter={handleSectionEnter}
                onMouseLeave={handleSectionLeave}
              >
                <div className="flex gap-4 lg:gap-8 items-end justify-between">
                  <div className="flex-1 max-w-xs lg:max-w-md">
                    <h3
                      className="text-white text-xl lg:text-2xl font-semibold mb-3"
                      style={{
                        fontFamily: '"GeistSans", sans-serif',
                        letterSpacing: "-0.02em",
                        textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                      }}
                    >
                      Портфолио
                    </h3>
                    <p
                      className="text-white/95 mb-6 text-base lg:text-lg"
                      style={{
                        fontFamily: "GeistMono, monospace",
                        lineHeight: "1.4",
                        textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                      }}
                    >
                      "{activeQuery.question}"
                    </p>
                    {onOpenInstall && (
                      <Button
                        onClick={onOpenInstall}
                        className="bg-white hover:bg-gray-100 text-black font-mono text-sm font-semibold tracking-wider py-3 px-6 rounded-lg shadow-lg"
                        style={{
                          fontFamily: "GeistMono, monospace",
                          letterSpacing: "0.56px",
                          height: "48px",
                        }}
                      >
                        <Download className="mr-2 h-4 w-4 stroke-[2.5px]" />
                        ЗАКАЗАТЬ ПРОЕКТ
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 min-w-[200px]">
                    {searchQueries.map((query) => (
                      <button
                        key={query.id}
                        onClick={() => handleQueryClick(query)}
                        onMouseEnter={() => handleQueryHover(query)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 backdrop-blur-sm ${
                          activeQuery.id === query.id
                            ? "bg-white/20 border-white/50 shadow-lg"
                            : "bg-black/30 border-white/20 hover:bg-white/10 hover:border-white/30"
                        }`}
                      >
                        <Play
                          className={`w-3 h-3 flex-shrink-0 transition-colors duration-200 ${
                            activeQuery.id === query.id ? "text-white" : "text-white/50"
                          }`}
                          fill="currentColor"
                        />
                        <div className="flex flex-col gap-1 min-w-0">
                          <span
                            className={`text-xs font-mono leading-tight truncate transition-colors duration-200 ${
                              activeQuery.id === query.id ? "text-white" : "text-white/70"
                            }`}
                            style={{ fontFamily: "GeistMono, monospace", fontSize: "11px" }}
                          >
                            {query.question}
                          </span>
                          <span
                            className={`text-xs px-1.5 py-0.5 rounded border w-fit transition-all duration-200 ${getCategoryColor(query.category)}`}
                            style={{ fontFamily: "GeistMono, monospace", fontSize: "10px" }}
                          >
                            {query.category}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
