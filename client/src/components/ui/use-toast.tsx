import React, { createContext, useContext, useState, useCallback } from "react"

export type ToastData = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

const ToastContext = createContext<{
  toast: (data: ToastData) => void
} | undefined>(undefined)

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider(props: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([])
  const { children } = props;

  const toast = useCallback((data: ToastData) => {
    setToasts((prev) => [...prev, data])
    setTimeout(() => {
      setToasts((prev) => prev.slice(1))
    }, data.duration || 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
        {toasts.map((t, i) => (
          <div
            key={i}
            style={{
              marginBottom: 10,
              padding: "12px 20px",
              borderRadius: 8,
              background: t.variant === "destructive" ? "#f87171" : "#333",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              minWidth: 220,
            }}
          >
            {t.title && <div style={{ fontWeight: "bold" }}>{t.title}</div>}
            {t.description && <div>{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within a ToastProvider")
  return ctx
}