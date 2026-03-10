import { useState, useEffect, useRef } from "react"
import { X, Copy, Check, Download, Search, Terminal } from "lucide-react"

interface InstallModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function InstallModal({ isOpen, onClose }: InstallModalProps) {
  const [activeTab, setActiveTab] = useState<string>("cursor")
  const [copied, setCopied] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleOutsideClick)
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleOutsideClick)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const installOptions = [
    {
      id: "cursor",
      name: "Cursor",
      command: "ext install example.rewind-ai-versioning",
      deeplink: "cursor:extension/example.rewind-ai-versioning",
    },
    {
      id: "windsurf",
      name: "Windsurf",
      command: "ext install example.rewind-ai-versioning",
      deeplink: "windsurf:extension/example.rewind-ai-versioning",
    },
    {
      id: "vscode",
      name: "VS Code",
      command: "ext install example.rewind-ai-versioning",
      deeplink: "vscode:extension/example.rewind-ai-versioning",
    },
    {
      id: "claude-code",
      name: "Claude Code",
      command: "ext install example.rewind-ai-versioning",
      deeplink: "",
      isTerminalBased: true,
    },
    {
      id: "codex-cli",
      name: "Codex CLI",
      command: "ext install example.rewind-ai-versioning",
      deeplink: "",
      isTerminalBased: true,
    },
    {
      id: "other",
      name: "Другое",
      command: "ext install example.rewind-ai-versioning",
      deeplink: "",
    },
  ]

  const activeOption = installOptions.find((option) => option.id === activeTab) || installOptions[0]

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-black border border-white/10 rounded-[16px] shadow-2xl my-4 md:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 md:p-6 bg-black rounded-t-[16px] border-b border-white/10">
          <h2
            className="text-xl md:text-2xl font-semibold text-white"
            style={{
              fontFamily: '"GeistSans", sans-serif',
              letterSpacing: "-0.04em",
              lineHeight: "1.1",
            }}
          >
            Установить Rewind
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 md:p-6">
          <div className="flex overflow-x-auto pb-2 mb-4 border-b border-white/10 hide-scrollbar">
            <div className="flex gap-2 min-w-max">
              {installOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveTab(option.id)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors whitespace-nowrap ${
                    activeTab === option.id ? "bg-white text-black" : "bg-transparent text-white/80 hover:bg-white/10"
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {activeTab === "claude-code" && (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1" fill="none" />
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                    Настройка Claude Code + Rewind
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    Запустите Claude Code в терминале внутри редакторов Cursor, Windsurf или VS Code. Используйте Rewind
                    в боковой панели для идеального воркфлоу с AI.
                  </p>

                  <div className="bg-black rounded-lg overflow-hidden mb-4">
                    <video className="w-full h-auto" controls preload="metadata" style={{ maxHeight: "300px" }}>
                      <source
                        src="/videos/claude-code-setup.mp4"
                        type="video/mp4"
                      />
                      Ваш браузер не поддерживает видео.
                    </video>
                  </div>

                  <div className="space-y-3">
                    <div className="text-white/70 text-sm">
                      <strong>Шаг 1:</strong> Установите расширение Rewind в редактор (Cursor, Windsurf или VS Code)
                    </div>
                    <div className="text-white/70 text-sm">
                      <strong>Шаг 2:</strong> Запустите Claude Code из встроенного терминала редактора
                    </div>
                    <div className="text-white/70 text-sm">
                      <strong>Шаг 3:</strong> Используйте боковую панель Rewind для сохранения/восстановления версий
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "codex-cli" && (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1" fill="none" />
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                    Настройка Codex CLI + Rewind
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    Запустите OpenAI Codex CLI в терминале внутри редакторов Cursor, Windsurf или VS Code. Используйте
                    Rewind в боковой панели для бесшовной AI-разработки с контролем версий.
                  </p>

                  <div className="bg-black rounded-lg overflow-hidden mb-4">
                    <video className="w-full h-auto" controls preload="metadata" style={{ maxHeight: "300px" }}>
                      <source
                        src="/videos/codex-setup.mp4"
                        type="video/mp4"
                      />
                      Ваш браузер не поддерживает видео.
                    </video>
                  </div>

                  <div className="space-y-3">
                    <div className="text-white/70 text-sm">
                      <strong>Шаг 1:</strong> Установите расширение Rewind в редактор (Cursor, Windsurf или VS Code)
                    </div>
                    <div className="text-white/70 text-sm">
                      <strong>Шаг 2:</strong> Запустите OpenAI Codex CLI из встроенного терминала редактора
                    </div>
                    <div className="text-white/70 text-sm">
                      <strong>Шаг 3:</strong> Используйте боковую панель Rewind для сохранения/восстановления версий
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== "claude-code" && activeTab !== "codex-cli" && (
              <>
                {activeOption.deeplink && (
                  <div className="space-y-2">
                    <a
                      href={activeOption.deeplink}
                      className="block w-full bg-white hover:bg-gray-100 text-black font-mono text-sm font-semibold tracking-wider py-3 px-4 rounded-lg text-center transition-colors"
                      style={{
                        fontFamily:
                          'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                        letterSpacing: "0.56px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Download className="mr-2 h-4 w-4 stroke-[2.5px]" />
                      УСТАНОВИТЬ В {activeOption.name.toUpperCase()}
                    </a>
                    <p className="text-white/50 text-xs text-center">
                      Нажмите кнопку выше, чтобы открыть {activeOption.name} и установить Rewind
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/70 font-mono text-sm">
                    <Search size={16} />
                    {activeTab === "other" ? "Поиск в расширениях:" : `Поиск в расширениях ${activeOption.name}:`}
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-sm text-white">
                    {activeTab === "other" ? (
                      <>
                        1. Откройте вашу IDE
                        <br />
                        2. Перейдите в панель расширений (обычно Ctrl+Shift+X / Cmd+Shift+X)
                        <br />
                        3. Найдите <span className="bg-white/10 px-2 py-0.5 rounded">Rewind</span>
                        <br />
                        4. Нажмите Установить
                      </>
                    ) : (
                      <>
                        1. Откройте {activeOption.name}
                        <br />
                        2. Перейдите в панель расширений (Ctrl+Shift+X / Cmd+Shift+X)
                        <br />
                        3. Найдите <span className="bg-white/10 px-2 py-0.5 rounded">Rewind</span>
                        <br />
                        4. Нажмите Установить
                      </>
                    )}
                  </div>
                </div>

                {activeOption.command && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/70 font-mono text-sm">
                      <Terminal size={16} />
                      {activeTab === "other"
                        ? "Выполнить в командной палитре:"
                        : `Выполнить в командной палитре ${activeOption.name}:`}
                    </div>
                    <div className="relative">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-sm text-white overflow-x-auto">
                        {activeOption.command}
                      </div>
                      <button
                        onClick={() => copyToClipboard(activeOption.command, `${activeOption.id}-command`)}
                        className="absolute right-2 top-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Копировать команду"
                      >
                        {copied === `${activeOption.id}-command` ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                    {activeTab === "other" && (
                      <p className="text-white/50 text-xs">
                        Откройте командную палитру (Ctrl+Shift+P / Cmd+Shift+P), затем вставьте и выполните команду выше
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "other" && (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-4">
                    <p className="text-white/70 text-sm mb-2">
                      Rewind работает с большинством VS Code-совместимых редакторов и IDE, включая:
                    </p>
                    <ul className="text-white/60 text-sm list-disc pl-5 space-y-1">
                      <li>VS Codium</li>
                      <li>GitPod</li>
                      <li>Code-OSS</li>
                      <li>GitHub Codespaces</li>
                      <li>И другие форки VS Code</li>
                    </ul>
                  </div>
                )}
              </>
            )}

            <div className="pt-4 mt-6 border-t border-white/10">
              <p className="text-white/50 text-sm">
                {activeTab === "claude-code"
                  ? "После установки Rewind вы можете использовать Claude Code в терминале, а Rewind будет управлять версиями в боковой панели."
                  : activeTab === "codex-cli"
                    ? "После установки Rewind вы можете использовать OpenAI Codex CLI в терминале, а Rewind будет управлять версиями в боковой панели."
                    : "После установки откройте проект и нажмите на иконку Rewind в боковой панели, чтобы начать версионирование AI-кода."}
              </p>
            </div>
          </div>
        </div>

        <div className="md:hidden p-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-mono text-sm transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
