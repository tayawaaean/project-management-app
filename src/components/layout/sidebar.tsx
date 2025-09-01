'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  CheckSquare,
  FolderOpen,
  Home,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: FolderOpen,
  },
  {
    title: 'Tasks',
    href: '/tasks',
    icon: CheckSquare,
  },
  {
    title: 'Teams',
    href: '/teams',
    icon: Users,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  className?: string
}

export function Sidebar({ isCollapsed, onToggleCollapse, className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        'relative flex h-full flex-col border-r bg-background transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center border-b px-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">PM</span>
            </div>
            <span className="font-bold">ProjectFlow</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="ml-auto h-8 w-8"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isCollapsed ? 'px-2' : 'px-3',
                    isActive && 'bg-secondary text-secondary-foreground'
                  )}
                >
                  <item.icon className={cn('h-4 w-4', !isCollapsed && 'mr-3')} />
                  {!isCollapsed && <span>{item.title}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        <div className={cn(
          'flex items-center space-x-3',
          isCollapsed ? 'justify-center' : 'justify-start'
        )}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <span className="text-xs font-medium">PM</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 space-y-1">
              <p className="text-xs font-medium leading-none">ProjectFlow</p>
              <p className="text-xs text-muted-foreground">v1.0.0</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
