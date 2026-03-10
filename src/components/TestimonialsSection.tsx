import { Quote } from "lucide-react"

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div
          className="block relative bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 backdrop-blur-sm"
        >
          <div className="absolute top-8 left-8 opacity-20">
            <Quote className="h-12 w-12 text-white" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <img
                  src="/images/rick-rubin-portrait.jpeg"
                  alt="Клиент студии анимации"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <blockquote className="mb-6">
                <p
                  className="text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6"
                  style={{
                    fontFamily: '"GeistSans", sans-serif',
                    letterSpacing: "-0.02em",
                  }}
                >
                  "Хорошая анимация — это когда{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                    зритель не замечает работу
                  </span>
                  , а просто верит"
                </p>
              </blockquote>

              <footer>
                <cite
                  className="not-italic text-white font-bold text-xl md:text-2xl block mb-2"
                  style={{
                    fontFamily: '"GeistSans", sans-serif',
                  }}
                >
                  Алексей Миронов
                </cite>
                <p
                  className="text-white/80 text-base md:text-lg mb-2"
                  style={{
                    fontFamily: '"GeistSans", sans-serif',
                  }}
                >
                  Арт-директор, студия «Паровоз»
                </p>
                <p
                  className="text-white/60 text-sm"
                  style={{
                    fontFamily:
                      'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                  }}
                >
                  Работаем вместе с 2021 года
                </p>
              </footer>
            </div>
          </div>

          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-orange-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        <div className="text-center mt-12 md:mt-16">
          <p
            className="text-white/60 max-w-3xl mx-auto"
            style={{
              fontFamily:
                'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              fontSize: "18px",
              lineHeight: "1.6",
            }}
          >
            Мы делаем анимацию, которая работает на ваш бизнес — не просто красиво, а с результатом.
          </p>
        </div>
      </div>
    </section>
  )
}
