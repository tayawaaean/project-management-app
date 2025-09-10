'use client'

import { useState, useEffect } from 'react'
import { Navbar } from './navbar'
import { Sidebar } from './sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)

    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/5 via-rose-500/5 to-red-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Mobile sidebar overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <nav
          id="navigation"
          className={`
            fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:relative md:inset-0
          `}
          aria-label="Main navigation"
        >
          <Sidebar
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={toggleSidebar}
          />
        </nav>

        {/* Main content area */}
        <div className={`
          flex-1 flex flex-col
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'md:ml-0' : 'md:ml-0'}
        `}>
          {/* Navbar */}
          <header role="banner">
            <Navbar
              onMenuClick={toggleMobileMenu}
              isDarkMode={isDarkMode}
              onThemeToggle={toggleTheme}
            />
          </header>

          {/* Page content */}
          <main
            className="flex-1 space-y-4 p-4 md:p-8 relative swipe-container"
            role="main"
            aria-label="Main content"
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
