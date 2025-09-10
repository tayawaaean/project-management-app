'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { SkipForward, Volume2, VolumeX } from 'lucide-react'

// Skip Links Component
export const SkipLinks: React.FC = () => (
  <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-50">
    <nav aria-label="Skip navigation links">
      <ul className="flex gap-2">
        <li>
          <a
            href="#main-content"
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Skip to main content
          </a>
        </li>
        <li>
          <a
            href="#navigation"
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Skip to navigation
          </a>
        </li>
      </ul>
    </nav>
  </div>
)

// Screen Reader Only Text
export const ScreenReaderOnly: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => (
  <span className={`sr-only ${className}`}>{children}</span>
)

// Accessible Button with loading state
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingText?: string
  'aria-describedby'?: string
}

export const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ children, loading, loadingText, disabled, 'aria-describedby': ariaDescribedBy, ...props }, ref) => (
    <Button
      ref={ref}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-describedby={ariaDescribedBy}
      {...props}
    >
      {loading ? (
        <>
          <span className="sr-only">{loadingText || 'Loading'}</span>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
          {children}
        </>
      ) : (
        children
      )}
    </Button>
  )
)
AccessibleButton.displayName = 'AccessibleButton'

// Accessible Form Field
interface AccessibleFieldProps {
  id: string
  label: string
  error?: string
  required?: boolean
  description?: string
  children: React.ReactNode
}

export const AccessibleField: React.FC<AccessibleFieldProps> = ({
  id,
  label,
  error,
  required,
  description,
  children,
}) => {
  const fieldId = `${id}-field`
  const errorId = `${id}-error`
  const descriptionId = `${id}-description`

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        id={fieldId}
      >
        {label}
        {required && (
          <span className="text-destructive ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      {description && (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}

      <div>
        {React.cloneElement(children as React.ReactElement, {
          id,
          'aria-labelledby': fieldId,
          'aria-describedby': [
            description ? descriptionId : '',
            error ? errorId : '',
          ].filter(Boolean).join(' ') || undefined,
          'aria-required': required,
          'aria-invalid': !!error,
        })}
      </div>

      {error && (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Accessible Modal/Dialog
interface AccessibleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'

      // Focus management
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements?.[0] as HTMLElement
      firstElement?.focus()
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      <div
        ref={modalRef}
        className={`w-full ${sizeClasses[size]} bg-background rounded-lg shadow-lg transform transition-all duration-200 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 id="modal-title" className="text-lg font-semibold">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {description && (
            <p id="modal-description" className="text-sm text-muted-foreground mb-4">
              {description}
            </p>
          )}

          {children}
        </div>
      </div>
    </div>
  )
}

// Accessible Accordion
interface AccessibleAccordionProps {
  items: Array<{
    id: string
    title: string
    content: React.ReactNode
  }>
  allowMultiple?: boolean
  defaultExpanded?: string[]
}

export const AccessibleAccordion: React.FC<AccessibleAccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpanded = [],
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(defaultExpanded)
  )

  const toggleItem = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        if (!allowMultiple) {
          newSet.clear()
        }
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-2" role="tablist" aria-multiselectable={allowMultiple}>
      {items.map((item) => {
        const isExpanded = expandedItems.has(item.id)

        return (
          <div key={item.id} className="border rounded-md">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-4 py-3 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-ring"
              aria-expanded={isExpanded}
              aria-controls={`${item.id}-panel`}
              id={`${item.id}-tab`}
              role="tab"
            >
              <span className="font-medium">{item.title}</span>
              <span
                className="transform transition-transform"
                style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>

            <div
              id={`${item.id}-panel`}
              role="tabpanel"
              aria-labelledby={`${item.id}-tab`}
              className={`overflow-hidden transition-all duration-200 ${
                isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-4 pb-3">
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Focus Trap Hook
export function useFocusTrap(isActive: boolean, containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }, [isActive, containerRef])
}

// Screen Reader Announcements
export const ScreenReaderAnnouncement: React.FC<{
  message: string
  priority?: 'polite' | 'assertive'
  className?: string
}> = ({ message, priority = 'polite', className = '' }) => (
  <div
    aria-live={priority}
    aria-atomic="true"
    className={`sr-only ${className}`}
  >
    {message}
  </div>
)

// Accessible Status Messages
export const StatusMessage: React.FC<{
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  className?: string
}> = ({ type, message, className = '' }) => {
  const getAriaLive = () => {
    switch (type) {
      case 'error':
        return 'assertive'
      case 'success':
      case 'warning':
        return 'polite'
      default:
        return 'polite'
    }
  }

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={getAriaLive()}
      className={`sr-only ${className}`}
    >
      {message}
    </div>
  )
}

// High Contrast Mode Detector
export function useHighContrastMode() {
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setIsHighContrast(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isHighContrast
}

// Reduced Motion Preference
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}
