'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { TaskCard } from '@/components/tasks/task-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Search,
  Plus,
  Filter,
  KanbanSquare,
  List,
  MoreHorizontal
} from 'lucide-react'
import { mockTasks, mockUsers, mockProjects } from '@/lib/mockData'
import { Task } from '@/lib/mockData'

const kanbanColumns = [
  { id: 'To Do', title: 'To Do', color: 'border-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-950' },
  { id: 'In Progress', title: 'In Progress', color: 'border-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-950' },
  { id: 'Review', title: 'Review', color: 'border-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-950' },
  { id: 'Done', title: 'Done', color: 'border-green-500', bgColor: 'bg-green-50 dark:bg-green-950' },
]

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [projectFilter, setProjectFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>(mockTasks)

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProject = projectFilter === 'all' || task.projectId === projectFilter
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter

    return matchesSearch && matchesProject && matchesPriority
  })

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId)
  }

  const handleDrop = (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('text/plain')

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
          : task
      )
    )
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">
              Manage and track all your tasks with our Kanban board.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('kanban')}
                className="rounded-r-none"
              >
                <KanbanSquare className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Add a new task to organize your work.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="task-title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="task-title"
                      placeholder="Task title"
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="task-description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="task-description"
                      placeholder="Task description"
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="task-project" className="text-right">
                      Project
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProjects.map(project => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="task-priority" className="text-right">
                      Priority
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="task-assignee" className="text-right">
                      Assignee
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockUsers.map(user => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="task-due-date" className="text-right">
                      Due Date
                    </Label>
                    <Input
                      id="task-due-date"
                      type="date"
                      className="col-span-3"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateModalOpen(false)}>
                    Create Task
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4"
        >
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {mockProjects.map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Kanban Board */}
        {viewMode === 'kanban' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {kanbanColumns.map((column, columnIndex) => {
              const columnTasks = filteredTasks.filter(task => task.status === column.id)

              return (
                <motion.div
                  key={column.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: columnIndex * 0.1 }}
                  className="space-y-4"
                >
                  <div className={`p-4 rounded-lg border-2 ${column.color} ${column.bgColor}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{column.title}</h3>
                      <Badge variant="secondary" className="text-sm">
                        {columnTasks.length}
                      </Badge>
                    </div>

                    <div
                      className="space-y-3 min-h-[400px] p-2"
                      onDrop={(e) => handleDrop(e, column.id as Task['status'])}
                      onDragOver={handleDragOver}
                    >
                      {columnTasks.map((task, taskIndex) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: taskIndex * 0.05 }}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task.id)}
                          className="cursor-move"
                        >
                          <TaskCard task={task} />
                        </motion.div>
                      ))}

                      {columnTasks.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          /* List View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TaskCard task={task} />
              </motion.div>
            ))}

            {filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters.
                </p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Task
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  )
}
