import type React from "react"
import { useState } from "react"

interface Review {
  text: string
  handle: string
  name: string
  url: string
  profileImage: string
  isHighlighted?: boolean
  stats?: {
    views?: string
    likes?: string
    retweets?: string
  }
}

const reviews: Review[] = [
  {
    text: "заказал анимацию логотипа для нашего бренда. получил за 4 дня. качество на уровне крупных студий, а цена в 3 раза ниже. очень доволен результатом.",
    handle: "@mikhail_brand",
    name: "Михаил Зайцев",
    url: "#",
    profileImage: "/images/profiles/bnj.jpg",
    stats: {
      likes: "47",
      retweets: "12",
    },
  },
  {
    text: "делали с ними explainer-видео для инвесторов. менеджер был на связи в любое время, правки вносили быстро. рекомендую всем кто ищет надёжных аниматоров",
    handle: "@startup_anna",
    name: "Анна Соколова",
    url: "#",
    profileImage: "/images/profiles/tom.jpg",
    stats: {
      views: "12,3K",
      likes: "234",
      retweets: "18",
    },
  },
  {
    text: "пробовали разных исполнителей для рекламных роликов. эти — лучшие из всех. понимают задачу с первого раза, не нужно объяснять по три раза",
    handle: "@marketingdima",
    name: "Дмитрий Харченко",
    url: "#",
    profileImage: "/images/profiles/kitze.jpg",
    stats: {
      views: "8,7K",
      likes: "156",
      retweets: "9",
    },
  },
  {
    text: "заказывал анимацию для мобильного приложения. результат превзошёл ожидания — пользователи отдельно хвалят онбординг. сотрудничество продолжим",
    handle: "@appdev_sergey",
    name: "Сергей Климов",
    url: "#",
    profileImage: "/images/profiles/ian.jpg",
    stats: {
      views: "5,1K",
      likes: "89",
      retweets: "7",
    },
  },
  {
    text: "работаем как агентство, отдаём им анимационные части проектов на аутсорс. всегда сдают в срок, никогда не подводили. проверенные ребята",
    handle: "@creative_agency_msk",
    name: "Creative Agency MSK",
    url: "#",
    profileImage: "/images/profiles/anuj.jpg",
    stats: {
      likes: "73",
      retweets: "4",
    },
  },
  {
    text: "думал анимация для небольшого youtube канала это дорого. оказалось очень доступно. интро и аутро сделали стильно, подписчики сразу заметили",
    handle: "@youtube_creator",
    name: "Павел Громов",
    url: "#",
    profileImage: "/images/profiles/anushk.jpg",
    stats: {
      views: "3,2K",
      likes: "44",
    },
  },
  {
    text: "нужна была срочная анимация для презентации перед партнёрами. сделали за 2 дня. выглядело профессионально, партнёры оценили",
    handle: "@biz_natasha",
    name: "Наташа Воробьёва",
    url: "#",
    profileImage: "/images/profiles/emrah.jpg",
    stats: {
      views: "1,8K",
      likes: "31",
    },
  },
]

interface VibeCodingTweetsSectionProps {
  onOpenInstall?: () => void
}

export default function VibeCodingTweetsSection({ onOpenInstall }: VibeCodingTweetsSectionProps) {
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set())

  const toggleExpanded = (index: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setExpandedReviews((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const truncateText = (text: string, maxLength = 200) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + "..."
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 md:mb-12 px-4">
          <h2
            className="mb-6 font-semibold"
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
            Что говорят клиенты
          </h2>
          <p
            className="max-w-3xl mx-auto text-white/80 mb-4"
            style={{
              fontFamily: "GeistMono, monospace",
              fontSize: "clamp(16px, 3vw, 20px)",
              lineHeight: "1.4",
              textAlign: "center",
            }}
          >
            Реальные отзывы от людей, с которыми мы работали.
          </p>
        </div>

        <div className="flex justify-center">
          <div
            className="gradient-container max-w-[1296px] w-full relative"
            style={{ background: "linear-gradient(135deg, #22d3ee 0%, #ff5c28 50%, #ff5c9d 100%)" }}
          >
            <div className="absolute inset-0 bg-black/35 rounded-[16px]"></div>
            <div className="noise-texture"></div>

            <div className="relative z-10 pt-6 sm:pt-8 md:pt-12 pb-6 sm:pb-8 md:pb-12 px-4 sm:px-6 md:px-12">
              <div className="space-y-6 sm:space-y-8">
                <div className="max-w-4xl mx-auto">
                  <div className="group block relative transition-all duration-300 rounded-[16px] sm:rounded-[20px] p-3 sm:p-6 md:p-10 bg-white/15 border border-white/30 sm:border-2 backdrop-blur-sm">
                    <div className="mb-3 sm:mb-4 md:mb-8">
                      <p
                        className="text-white text-sm sm:text-base md:text-lg leading-relaxed"
                        style={{
                          fontFamily: "GeistMono, monospace",
                          lineHeight: "1.6",
                          textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                        }}
                      >
                        {expandedReviews.has(0)
                          ? reviews[0].text
                          : truncateText(reviews[0].text, 150)}
                        {reviews[0].text.length > 150 && (
                          <button
                            onClick={(e) => toggleExpanded(0, e)}
                            className="ml-1 text-white/60 hover:text-white/90 underline text-xs transition-colors"
                          >
                            {expandedReviews.has(0) ? "свернуть" : "ещё"}
                          </button>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={reviews[0].profileImage || "/placeholder-user.jpg"}
                          alt={reviews[0].name}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-white/20"
                        />
                        <div>
                          <p
                            className="text-white font-semibold text-sm sm:text-base"
                            style={{ fontFamily: '"GeistSans", sans-serif' }}
                          >
                            {reviews[0].name}
                          </p>
                          <p className="text-white/50 text-xs sm:text-sm" style={{ fontFamily: "GeistMono, monospace" }}>
                            {reviews[0].handle}
                          </p>
                        </div>
                      </div>
                      {reviews[0].stats && (
                        <div className="hidden sm:flex items-center gap-3 sm:gap-4">
                          {reviews[0].stats.likes && (
                            <span className="text-white/60 text-xs sm:text-sm" style={{ fontFamily: "GeistMono, monospace" }}>
                              ❤️ {reviews[0].stats.likes}
                            </span>
                          )}
                          {reviews[0].stats.retweets && (
                            <span className="text-white/60 text-xs sm:text-sm" style={{ fontFamily: "GeistMono, monospace" }}>
                              🔁 {reviews[0].stats.retweets}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {reviews.slice(1).map((review, index) => {
                    const actualIndex = index + 1
                    return (
                      <div
                        key={actualIndex}
                        className="relative transition-all duration-300 rounded-[12px] sm:rounded-[16px] p-3 sm:p-4 md:p-5 bg-white/10 border border-white/20 hover:bg-white/15 backdrop-blur-sm"
                      >
                        <div className="mb-2 sm:mb-3">
                          <p
                            className="text-white/90 text-xs sm:text-sm leading-relaxed"
                            style={{
                              fontFamily: "GeistMono, monospace",
                              lineHeight: "1.5",
                              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                            }}
                          >
                            {expandedReviews.has(actualIndex)
                              ? review.text
                              : truncateText(review.text, 120)}
                            {review.text.length > 120 && (
                              <button
                                onClick={(e) => toggleExpanded(actualIndex, e)}
                                className="ml-1 text-white/50 hover:text-white/80 underline text-xs transition-colors"
                              >
                                {expandedReviews.has(actualIndex) ? "свернуть" : "ещё"}
                              </button>
                            )}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2 sm:mt-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={review.profileImage || "/placeholder-user.jpg"}
                              alt={review.name}
                              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border border-white/20"
                            />
                            <div>
                              <p
                                className="text-white font-medium text-xs sm:text-sm"
                                style={{ fontFamily: '"GeistSans", sans-serif' }}
                              >
                                {review.name}
                              </p>
                              <p className="text-white/40 text-xs" style={{ fontFamily: "GeistMono, monospace" }}>
                                {review.handle}
                              </p>
                            </div>
                          </div>
                          {review.stats?.likes && (
                            <span className="text-white/40 text-xs" style={{ fontFamily: "GeistMono, monospace" }}>
                              ❤️ {review.stats.likes}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
