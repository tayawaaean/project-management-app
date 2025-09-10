'use client'

import { useEffect, useCallback, useRef } from 'react'

// Types for keyboard shortcuts
export interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  meta?: boolean
  handler: () => void
  description?: string
  preventDefault?: boolean
}

export interface KeyboardNavigationOptions {
  shortcuts?: KeyboardShortcut[]
  enabled?: boolean
  preventDefault?: boolean
}

// Hook for keyboard shortcuts
export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[] = [],
  options: { enabled?: boolean } = {}
) {
  const { enabled = true } = options

  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Find matching shortcut
      const shortcut = shortcuts.find(shortcut => {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase()
        const ctrlMatch = !!event.ctrlKey === !!shortcut.ctrl
        const altMatch = !!event.altKey === !!shortcut.alt
        const shiftMatch = !!event.shiftKey === !!shortcut.shift
        const metaMatch = !!event.metaKey === !!shortcut.meta

        return keyMatch && ctrlMatch && altMatch && shiftMatch && metaMatch
      })

      if (shortcut) {
        if (shortcut.preventDefault !== false) {
          event.preventDefault()
        }
        shortcut.handler()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts, enabled])
}

// Hook for focus management
export function useFocusManagement() {
  const focusableElementsRef = useRef<HTMLElement[]>([])
  const currentFocusIndexRef = useRef(-1)

  const updateFocusableElements = useCallback((container?: HTMLElement) => {
    const root = container || document
    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const elements = Array.from(root.querySelectorAll(focusableSelector))
      .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))

    focusableElementsRef.current = elements as HTMLElement[]
    return elements as HTMLElement[]
  }, [])

  const focusNext = useCallback(() => {
    const elements = focusableElementsRef.current
    if (elements.length === 0) return

    currentFocusIndexRef.current = (currentFocusIndexRef.current + 1) % elements.length
    elements[currentFocusIndexRef.current]?.focus()
  }, [])

  const focusPrevious = useCallback(() => {
    const elements = focusableElementsRef.current
    if (elements.length === 0) return

    currentFocusIndexRef.current =
      currentFocusIndexRef.current <= 0
        ? elements.length - 1
        : currentFocusIndexRef.current - 1
    elements[currentFocusIndexRef.current]?.focus()
  }, [])

  const focusFirst = useCallback(() => {
    const elements = focusableElementsRef.current
    if (elements.length > 0) {
      currentFocusIndexRef.current = 0
      elements[0].focus()
    }
  }, [])

  const focusLast = useCallback(() => {
    const elements = focusableElementsRef.current
    if (elements.length > 0) {
      currentFocusIndexRef.current = elements.length - 1
      elements[elements.length - 1].focus()
    }
  }, [])

  const focusElement = useCallback((index: number) => {
    const elements = focusableElementsRef.current
    if (index >= 0 && index < elements.length) {
      currentFocusIndexRef.current = index
      elements[index].focus()
    }
  }, [])

  return {
    updateFocusableElements,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    focusElement,
    getFocusableElements: () => focusableElementsRef.current,
    getCurrentFocusIndex: () => currentFocusIndexRef.current,
  }
}

// Hook for arrow key navigation in lists/grids
export function useArrowKeyNavigation(
  itemCount: number,
  options: {
    loop?: boolean
    orientation?: 'horizontal' | 'vertical' | 'both'
    onFocusChange?: (index: number) => void
  } = {}
) {
  const { loop = true, orientation = 'vertical', onFocusChange } = options

  const handleKeyDown = useCallback((event: KeyboardEvent, currentIndex: number) => {
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowUp':
        if (orientation === 'vertical' || orientation === 'both') {
          event.preventDefault()
          newIndex = loop ? (currentIndex - 1 + itemCount) % itemCount : Math.max(0, currentIndex - 1)
        }
        break
      case 'ArrowDown':
        if (orientation === 'vertical' || orientation === 'both') {
          event.preventDefault()
          newIndex = loop ? (currentIndex + 1) % itemCount : Math.min(itemCount - 1, currentIndex + 1)
        }
        break
      case 'ArrowLeft':
        if (orientation === 'horizontal' || orientation === 'both') {
          event.preventDefault()
          newIndex = loop ? (currentIndex - 1 + itemCount) % itemCount : Math.max(0, currentIndex - 1)
        }
        break
      case 'ArrowRight':
        if (orientation === 'horizontal' || orientation === 'both') {
          event.preventDefault()
          newIndex = loop ? (currentIndex + 1) % itemCount : Math.min(itemCount - 1, currentIndex + 1)
        }
        break
      case 'Home':
        event.preventDefault()
        newIndex = 0
        break
      case 'End':
        event.preventDefault()
        newIndex = itemCount - 1
        break
    }

    if (newIndex !== currentIndex) {
      onFocusChange?.(newIndex)
    }

    return newIndex
  }, [itemCount, loop, orientation, onFocusChange])

  return { handleKeyDown }
}

// Hook for modal/dialog keyboard navigation
export function useModalKeyboardNavigation(
  isOpen: boolean,
  onClose: () => void,
  options: {
    initialFocusRef?: React.RefObject<HTMLElement>
    restoreFocus?: boolean
  } = {}
) {
  const { initialFocusRef, restoreFocus = true } = options
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Focus trap for modal
  const focusTrap = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return

    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }

    if (event.key === 'Tab') {
      const modal = event.currentTarget as HTMLElement
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement

      // Focus initial element or first focusable element
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus()
      } else {
        // Find first focusable element in modal
        const modal = document.querySelector('[role="dialog"], [data-modal]')
        if (modal) {
          const firstFocusable = modal.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement
          firstFocusable?.focus()
        }
      }

      // Add keyboard event listener
      document.addEventListener('keydown', focusTrap)
    } else if (restoreFocus && previousFocusRef.current) {
      // Restore previous focus
      previousFocusRef.current.focus()
    }

    return () => {
      document.removeEventListener('keydown', focusTrap)
    }
  }, [isOpen, focusTrap, initialFocusRef, restoreFocus])

  return { previousFocusRef }
}

// Hook for skip links (accessibility)
export function useSkipLinks() {
  const skipToContent = useCallback(() => {
    const mainContent = document.querySelector('main, [role="main"], #main-content')
    if (mainContent) {
      ;(mainContent as HTMLElement).focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const skipToNavigation = useCallback(() => {
    const navigation = document.querySelector('nav, [role="navigation"], #navigation')
    if (navigation) {
      ;(navigation as HTMLElement).focus()
    }
  }, [])

  return { skipToContent, skipToNavigation }
}

// Common keyboard shortcuts configuration
export const commonKeyboardShortcuts: KeyboardShortcut[] = [
  {
    key: '/',
    description: 'Focus search input',
    handler: () => {
      const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]') as HTMLInputElement
      searchInput?.focus()
    },
  },
  {
    key: 'n',
    ctrl: true,
    description: 'Create new item',
    handler: () => {
      const newButton = document.querySelector('button:has-text("New"), button:has-text("Create"), [data-shortcut="new"]') as HTMLButtonElement
      newButton?.click()
    },
  },
  {
    key: 's',
    ctrl: true,
    description: 'Save current item',
    handler: (event) => {
      event?.preventDefault()
      const saveButton = document.querySelector('button[type="submit"], button:has-text("Save"), [data-shortcut="save"]') as HTMLButtonElement
      saveButton?.click()
    },
  },
  {
    key: 'Escape',
    description: 'Close modal or cancel',
    handler: () => {
      const closeButton = document.querySelector('[data-shortcut="close"], button[aria-label*="close" i]') as HTMLButtonElement
      closeButton?.click()
    },
  },
]

// Hook for global keyboard shortcuts
export function useGlobalKeyboardShortcuts() {
  useKeyboardShortcuts(commonKeyboardShortcuts, { enabled: true })
}
