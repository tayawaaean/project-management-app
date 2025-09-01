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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>{description}</span>
            {trend && (
              <Badge
                variant={trend.isPositive ? 'default' : 'destructive'}
                className="text-xs"
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
