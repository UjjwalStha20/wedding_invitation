export interface ToastMessage {
  id: string
  title: string
  description?: string
  action?: string
  onAction?: () => void
}

const visibleToasts: Record<string, boolean> = {}

export function Toast({ toast }: { toast: ToastMessage | null }) {
  if (!toast) return null

  const { id, title, description, action, onAction } = toast

  if (visibleToasts[id]) return null

  visibleToasts[id] = true

  // Remove from queue after a delay
  setTimeout(() => {
    delete visibleToasts[id]
  }, 5000)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
      }}
      className="flex items-center gap-3 rounded-md bg-burgundy px-6 py-3 text-ivory text-sm font-medium shadow-lg animate-in fade-in-0"
    >
      <svg
        className="h-4 w-4 text-gold/80 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        aria-label="Information"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" />
      </svg>

      <span>{title}</span>

      {description && (
        <span className="ml-2 text-ivory/60 opacity-80">{description}</span>
      )}

      {action && onAction && (
        <button
          onClick={onAction}
          className="ml-4 rounded-md bg-gold/10 text-gold hover:bg-gold/20 px-3 py-1 text-xs font-medium transition-colors"
        >
          {action}
        </button>
      )}
    </div>
  )
}