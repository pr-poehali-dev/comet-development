import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const faqs = [
  {
    question: "Сколько стоит анимационный проект?",
    answer: (
      <>
        Стоимость зависит от сложности, продолжительности и типа анимации.
        <br />
        <br />
        Короткая лого-анимация или стикеры — от 15 000 ₽. Полноценный рекламный ролик — от 80 000 ₽.
        <br />
        <br />
        Напишите нам — сделаем точный расчёт бесплатно.
      </>
    ),
  },
  {
    question: "Какие сроки производства?",
    answer: (
      <>
        Лого-анимация и короткие стикеры — 3–5 рабочих дней.
        <br />
        <br />
        Explainer-видео до 60 секунд — 10–15 дней. Сложные проекты с 3D — от 3 недель.
        <br />
        <br />
        Срочные заказы возможны — уточняйте при обращении.
      </>
    ),
  },
  {
    question: "Сколько раз можно вносить правки?",
    answer: (
      <>
        На этапе утверждения концепции — неограниченно.
        <br />
        <br />
        После запуска производства включено 2 круга правок. Дополнительные — по договорённости.
        <br />
        <br />
        Именно поэтому мы тщательно согласовываем всё до старта работ.
      </>
    ),
  },
  {
    question: "В каких форматах получу готовый ролик?",
    answer: (
      <>
        Сдаём в любом нужном формате: <strong>MP4, MOV, GIF, WebM, WEBP</strong>.
        <br />
        <br />
        По запросу — исходники в After Effects, Blender или других программах.
      </>
    ),
  },
  {
    question: "Нужно ли предоставлять материалы?",
    answer: (
      <>
        Не обязательно, но приветствуется.
        <br />
        <br />
        Если у вас есть логотип, брендбук, примеры стиля — пришлите. Мы учтём всё.
        <br />
        <br />
        Если нет — разработаем стиль с нуля на основе брифа.
      </>
    ),
  },
  {
    question: "Работаете ли вы с небольшими бюджетами?",
    answer: (
      <>
        Да, мы открыты к разным проектам.
        <br />
        <br />
        Расскажите о задаче — подберём формат, который уложится в бюджет и при этом будет выглядеть хорошо.
      </>
    ),
  },
]

interface FAQSectionProps {
  onOpenInstall?: () => void
}

export default function FAQSection({ onOpenInstall }: FAQSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2
          className="text-center mb-12 md:mb-16 font-semibold"
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
          Частые вопросы
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-white/10 rounded-lg bg-white/5 overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <span
                  className="text-left font-medium text-white"
                  style={{
                    fontFamily: '"GeistSans", sans-serif',
                    fontSize: "18px",
                  }}
                >
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 pt-0">
                <p
                  className="text-white/80"
                  style={{
                    fontFamily:
                      'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                    fontSize: "15px",
                    lineHeight: "1.5",
                  }}
                >
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 md:mt-16 text-center">
          <p
            className="text-white/80 mb-6"
            style={{
              fontFamily:
                'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            Остались вопросы? Напишите нам — ответим в течение часа в рабочее время.
          </p>

          {onOpenInstall && (
            <Button
              onClick={onOpenInstall}
              className="bg-white hover:bg-gray-100 text-black font-mono text-sm font-semibold tracking-wider py-3 px-6 rounded-lg"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                letterSpacing: "0.56px",
                height: "48px",
              }}
            >
              <Download className="mr-2 h-4 w-4 stroke-[2.5px]" />
              ЗАКАЗАТЬ ПРОЕКТ
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
