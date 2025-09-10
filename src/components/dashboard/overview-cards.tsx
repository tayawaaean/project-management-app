'use client'

import { motion } from 'framer-motion'
import {
  FolderOpen,
  CheckSquare,
  Users,
  TrendingUp,
  Clock,
  AlertTriangle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { dashboardStats } from '@/lib/mockData'

interface OverviewCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ElementType
  trend?: {
    value: number
    isPositive: boolean
  }
  delay?: number
}

function OverviewCard({ title, value, description, icon: Icon, trend, delay = 0 }: OverviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="card-modern hover-lift group cursor-pointer overflow-hidden relative touch-feedback mobile-touch-target">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
          <CardTitle className="text-caption text-muted-foreground group-hover:text-foreground transition-colors text-balance">
            {title}
          </CardTitle>
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 transition-all duration-300">
            <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </CardHeader>

        <CardContent className="relative z-10 space-y-2">
          <div className="text-heading-2 font-bold text-gradient-primary group-hover:scale-105 transition-transform duration-300 text-balance">
            {value}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-small text-muted-foreground group-hover:text-foreground/80 transition-colors text-balance flex-1">
              {description}
            </span>
            {trend && (
              <Badge
                variant={trend.isPositive ? 'default' : 'destructive'}
                className="text-caption hover-lift ml-2 shrink-0"
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function OverviewCards() {
  const cards = [
    {
      title: 'Total Projects',
      value: dashboardStats.totalProjects,
      description: `${dashboardStats.activeProjects} active`,
      icon: FolderOpen,
      trend: { value: 12, isPositive: true },
      delay: 0.1
    },
    {
      title: 'Active Tasks',
      value: dashboardStats.totalTasks - dashboardStats.completedTasks,
      description: `${dashboardStats.completedTasks} completed`,
      icon: CheckSquare,
      trend: { value: 8, isPositive: true },
      delay: 0.2
    },
    {
      title: 'Team Members',
      value: dashboardStats.teamMembers,
      description: 'Across all projects',
      icon: Users,
      trend: { value: 5, isPositive: true },
      delay: 0.3
    },
    {
      title: 'On Track',
      value: `${Math.round((dashboardStats.onTrackProjects / dashboardStats.totalProjects) * 100)}%`,
      description: `${dashboardStats.onTrackProjects} of ${dashboardStats.totalProjects} projects`,
      icon: TrendingUp,
      trend: { value: 15, isPositive: true },
      delay: 0.4
    },
    {
      title: 'Overdue Tasks',
      value: dashboardStats.overdueTasks,
      description: 'Need immediate attention',
      icon: Clock,
      trend: { value: -3, isPositive: false },
      delay: 0.5
    },
    {
      title: 'High Priority',
      value: dashboardStats.totalTasks - dashboardStats.completedTasks, // This would be filtered by priority in real app
      description: 'Critical and high priority',
      icon: AlertTriangle,
      trend: { value: 2, isPositive: false },
      delay: 0.6
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card, index) => (
        <OverviewCard key={index} {...card} />
      ))}
    </div>
  )
}
