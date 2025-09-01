'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Task } from '@/lib/mockData'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
  className?: string
}

const priorityColors = {
  Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  High: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  Critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

const statusColors = {
  'To Do': 'border-l-blue-500',
  'In Progress': 'border-l-yellow-500',
  'Review': 'border-l-purple-500',
  'Done': 'border-l-green-500'
}

export function TaskCard({ task, className }: TaskCardProps) {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Done'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className={cn('cursor-pointer', className)}
    >
      <Card className={cn(
        'border-l-4 transition-all hover:shadow-md',
        statusColors[task.status],
        isOverdue && 'border-red-500'
      )}>
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Title and Priority */}
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-sm leading-tight">{task.title}</h3>
              <Badge
                variant="secondary"
                className={cn('text-xs', priorityColors[task.priority])}
              >
                {task.priority}
              </Badge>
            </div>

            {/* Description */}
            {task.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Tags */}
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {task.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                    {tag}
                  </Badge>
                ))}
                {task.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    +{task.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{task.estimatedHours}h</span>
                </div>
              </div>

              <Avatar className="h-6 w-6">
                <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                <AvatarFallback className="text-xs">
                  {task.assignee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Overdue indicator */}
            {isOverdue && (
              <div className="flex items-center space-x-1 text-xs text-red-600 dark:text-red-400">
                <Clock className="h-3 w-3" />
                <span>Overdue</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
