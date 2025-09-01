'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, MoreHorizontal, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Project } from '@/lib/mockData'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  className?: string
}

const statusColors = {
  Planning: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'On Hold': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

const priorityColors = {
  Low: 'border-green-200 dark:border-green-800',
  Medium: 'border-yellow-200 dark:border-yellow-800',
  High: 'border-orange-200 dark:border-orange-800',
  Critical: 'border-red-200 dark:border-red-800'
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const isOverdue = new Date(project.deadline) < new Date() && project.status !== 'Completed'
  const daysLeft = Math.ceil((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className={cn('cursor-pointer', className)}
    >
      <Card className={cn(
        'border transition-all hover:shadow-lg',
        priorityColors[project.priority],
        isOverdue && 'border-red-300 dark:border-red-700'
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <h3 className="font-semibold text-lg leading-tight">{project.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit Project</DropdownMenuItem>
                <DropdownMenuItem>Manage Team</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Status and Priority */}
          <div className="flex items-center space-x-2">
            <Badge className={statusColors[project.status]}>
              {project.status}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {project.priority} Priority
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Deadline</p>
                <p className={cn(
                  'font-medium',
                  isOverdue ? 'text-red-600 dark:text-red-400' : ''
                )}>
                  {new Date(project.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Team</p>
                <p className="font-medium">{project.team.length} members</p>
              </div>
            </div>
          </div>

          {/* Team Avatars */}
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {project.team.slice(0, 4).map((member) => (
                <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
              {project.team.length > 4 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                  +{project.team.length - 4}
                </div>
              )}
            </div>

            {/* Days left indicator */}
            <div className={cn(
              'flex items-center space-x-1 text-xs',
              isOverdue
                ? 'text-red-600 dark:text-red-400'
                : daysLeft <= 7
                  ? 'text-orange-600 dark:text-orange-400'
                  : 'text-muted-foreground'
            )}>
              <Clock className="h-3 w-3" />
              <span>
                {isOverdue ? 'Overdue' : `${daysLeft} days left`}
              </span>
            </div>
          </div>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
