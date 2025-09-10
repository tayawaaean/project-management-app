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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

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
    <TooltipProvider delayDuration={0}>
    <div
      className={cn(
        'relative flex h-full flex-col border-r bg-card/50 backdrop-blur-sm transition-all duration-300 overflow-hidden',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5" />

      {/* Header */}
      <div className="relative flex h-14 items-center border-b border-border/50 px-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-white shadow-glow group-hover:shadow-glow-purple transition-all duration-300">
              <span className="text-sm font-bold">PM</span>
            </div>
            <span className="font-bold text-gradient-primary group-hover:scale-105 transition-transform duration-300">ProjectFlow</span>
          </div>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="ml-auto h-8 w-8 hover:bg-white/10 hover:shadow-glow transition-all duration-300"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-card/95 backdrop-blur-lg border-border/50">
            <p>{isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Navigation */}
      <ScrollArea className="relative flex-1 px-3 py-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            const NavButton = (
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start group relative overflow-hidden transition-all duration-300',
                  isCollapsed ? 'px-2' : 'px-3',
                  isActive && 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 shadow-glow border border-blue-500/20',
                  !isActive && 'hover:bg-white/5 hover:shadow-lg hover:border-white/10'
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600" />
                )}

                <item.icon className={cn(
                  'h-4 w-4 transition-all duration-300',
                  !isCollapsed && 'mr-3',
                  isActive && 'text-blue-600 dark:text-blue-400 group-hover:scale-110',
                  !isActive && 'text-muted-foreground group-hover:text-foreground'
                )} />
                {!isCollapsed && (
                  <span className={cn(
                    'transition-all duration-300',
                    isActive && 'text-blue-600 dark:text-blue-400 font-medium',
                    !isActive && 'text-muted-foreground group-hover:text-foreground'
                  )}>
                    {item.title}
                  </span>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            )

            return (
              <div key={item.href}>
                {isCollapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={item.href}>
                        {NavButton}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-card/95 backdrop-blur-lg border-border/50">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Link href={item.href}>
                    {NavButton}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="relative border-t border-border/50 p-4">
        <div className={cn(
          'flex items-center space-x-3 group',
          isCollapsed ? 'justify-center' : 'justify-start'
        )}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-secondary text-white shadow-glow-green group-hover:shadow-glow-purple transition-all duration-300">
            <span className="text-xs font-medium">PM</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 space-y-1">
              <p className="text-xs font-medium leading-none text-gradient-secondary">ProjectFlow</p>
              <p className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">v1.0.0</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </TooltipProvider>
  )
}
