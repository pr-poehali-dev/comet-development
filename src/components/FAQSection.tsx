import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const faqs = [
  {
    question: "Я уже использую Git. Зачем мне Rewind?",
    answer: (
      <>
        Git отлично подходит для коммитов.
        <br />
        <br />
        Rewind -- для всего, что до этого: хаотичных AI-правок, экспериментов, неудачных промптов.
        <br />
        <br />
        Это страховка, которая не засоряет историю коммитов.
      </>
    ),
  },
  {
    question: "Это бесплатно?",
    answer: (
      <>
        Да -- есть щедрый бесплатный план.
        <br />
        <br />
        Тарифы Pro и Team скоро появятся.
      </>
    ),
  },
  {
    question: "Это не сломает мой Git-репозиторий?",
    answer: (
      <>
        Нет.
        <br />
        <br />
        Rewind хранит всё отдельно от Git.
        <br />
        <br />
        Никаких staged-файлов. Никаких внезапных коммитов. Ваша папка .git/ останется чистой.
      </>
    ),
  },
  {
    question: "Где хранится история версий?",
    answer: (
      <>
        Вся история версий хранится <strong>на вашем компьютере</strong> -- не в облаке.
      </>
    ),
  },
  {
    question: "Как Rewind защищает данные при работе с AI?",
    answer: (
      <>
        Rewind использует быстрых и безопасных LLM-провайдеров вроде <strong>Groq</strong> с <strong>нулевым хранением данных</strong>.
        <br />
        <br />
        Ваш код <strong>шифруется при передаче через TLS 1.2+</strong> и никогда не сохраняется и не используется для обучения.
        <br />
        <br />
        Мы не ведём логи. Мы не храним копии.
      </>
    ),
  },
  {
    question: "Работает ли это с ветками?",
    answer: (
      <>
        Да -- отлично.
        <br />
        <br />
        Каждая Git-ветка имеет свою временную шкалу версий в Rewind. Снапшоты привязаны к вашей работе.
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
          Частые вопросы (и тихие сомнения)
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
            Всё ещё сомневаетесь? Попробуйте 60 секунд -- и вы больше не сможете кодить с AI без этого.
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
              УСТАНОВИТЬ
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
