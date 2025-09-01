'use client'

import { motion } from 'framer-motion'
import { Clock, User, CheckSquare, FolderOpen, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { mockActivities } from '@/lib/mockData'
import { cn } from '@/lib/utils'

const activityIcons = {
  project: FolderOpen,
  task: CheckSquare,
  user: Users,
}

const activityColors = {
  project: 'text-blue-600 dark:text-blue-400',
  task: 'text-green-600 dark:text-green-400',
  user: 'text-purple-600 dark:text-purple-400',
}

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActivities.map((activity, index) => {
              const Icon = activityIcons[activity.targetType]
              const timeAgo = getTimeAgo(new Date(activity.timestamp))

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback className="text-xs">
                      {activity.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Icon className={cn('h-4 w-4', activityColors[activity.targetType])} />
                      <p className="text-sm">
                        <span className="font-medium">{activity.user.name}</span>
                        {' '}
                        <span className="text-muted-foreground">{activity.action}</span>
                        {' '}
                        <span className="font-medium text-foreground">{activity.target}</span>
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{timeAgo}</span>
                      <Badge variant="outline" className="text-xs">
                        {activity.targetType}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* View all activities button */}
          <div className="mt-4 pt-4 border-t">
            <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
              View all activities →
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
}
