'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, Search, Settings, User, Menu, Sun, Moon, Home, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { mockUsers } from '@/lib/mockData'

interface NavbarProps {
  onMenuClick: () => void
  isDarkMode: boolean
  onThemeToggle: () => void
}

export function Navbar({ onMenuClick, isDarkMode, onThemeToggle }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const currentUser = mockUsers[0] // Sarah Johnson as current user

  // Breadcrumb data - in a real app, this would come from routing context
  const breadcrumbs = [
    { label: 'Dashboard', href: '/', icon: Home, current: true }
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-card/80 backdrop-blur-lg supports-[backdrop-filter]:bg-card/60 shadow-lg">
      {/* Breadcrumb bar */}
      <div className="flex h-10 items-center px-4 md:px-6 border-b border-border/20 bg-card/40">
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              )}
              {crumb.icon && (
                <crumb.icon className="h-4 w-4 mr-2 text-muted-foreground" />
              )}
              <span className={`font-medium ${crumb.current ? 'text-foreground' : 'text-muted-foreground hover:text-foreground transition-colors'}`}>
                {crumb.label}
              </span>
            </div>
          ))}
        </nav>
      </div>

      <div className="flex h-14 items-center px-4 md:px-6">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 px-0 text-base hover:bg-white/10 hover:shadow-glow focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden transition-all duration-300"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        {/* Logo/Brand */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-white shadow-glow group-hover:shadow-glow-purple transition-all duration-300 group-hover:scale-110">
              <span className="text-sm font-bold">PM</span>
            </div>
            <span className="hidden font-bold sm:inline-block text-gradient-primary group-hover:scale-105 transition-transform duration-300">ProjectFlow</span>
          </Link>
        </div>

        {/* Search */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative group">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors duration-300" />
              <Input
                type="search"
                placeholder="Search projects, tasks..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-900/70"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <nav className="flex items-center space-x-1">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="h-9 w-9 hover:bg-white/10 hover:shadow-glow transition-all duration-300 group"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 group-hover:text-yellow-400 transition-colors duration-300" />
              ) : (
                <Moon className="h-4 w-4 group-hover:text-blue-400 transition-colors duration-300" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 relative hover:bg-white/10 hover:shadow-glow transition-all duration-300 group">
                  <Bell className="h-4 w-4 group-hover:text-blue-500 transition-colors duration-300" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 border-0 shadow-glow animate-pulse-glow"
                  >
                    3
                  </Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-card/95 backdrop-blur-lg border-border/50 shadow-glow">
                <DropdownMenuLabel className="text-gradient-primary font-semibold">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className="hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">New task assigned</p>
                    <p className="text-xs text-muted-foreground">
                      &quot;Security audit and fixes&quot; has been assigned to you
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Project deadline approaching</p>
                    <p className="text-xs text-muted-foreground">
                      &quot;E-Commerce Platform&quot; is due in 3 days
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Team member joined</p>
                    <p className="text-xs text-muted-foreground">
                      Anna Martinez joined the Design team
                    </p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-white/10 hover:shadow-glow transition-all duration-300 group">
                  <Avatar className="h-9 w-9 ring-2 ring-white/20 dark:ring-slate-700/20 group-hover:ring-blue-500/50 transition-all duration-300">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card/95 backdrop-blur-lg border-border/50 shadow-glow" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-gradient-primary">{currentUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className="hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className="hover:bg-white/10 transition-colors duration-300 cursor-pointer text-red-600 dark:text-red-400">
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
