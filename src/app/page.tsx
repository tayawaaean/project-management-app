'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { OverviewCards } from '@/components/dashboard/overview-cards'
import { TaskCompletionChart } from '@/components/charts/task-completion-chart'
import { ProjectStatusChart } from '@/components/charts/project-status-chart'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { Button } from '@/components/ui/button'
import { CardSkeleton, ChartSkeleton, ActivityFeedSkeleton } from '@/components/loading-skeletons'
import { projectSchema, ProjectFormData } from '@/lib/validation'
import { FieldError } from '@/components/error-states'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false)
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false)
  const [isAddTeamMemberModalOpen, setIsAddTeamMemberModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Project creation form
  const projectForm = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      priority: 'Medium',
      status: 'Planning',
      deadline: '',
      budget: undefined,
      team: [],
    },
  })

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Simulate 2 second loading

    return () => clearTimeout(timer)
  }, [])

  // Handle project creation
  const onCreateProject = async (data: ProjectFormData) => {
    try {
      console.log('Creating project:', data)
      // Here you would make an API call
      // await createProject(data)

      // Reset form and close modal
      projectForm.reset()
      setIsCreateProjectModalOpen(false)
    } catch (error) {
      console.error('Failed to create project:', error)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
          className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
        >
          <div className="space-y-3">
            <h1 className="text-heading-1 text-gradient-primary text-balance">Dashboard</h1>
            <p className="text-body-large text-muted-foreground text-pretty max-w-md">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Dialog open={isCreateProjectModalOpen} onOpenChange={setIsCreateProjectModalOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-primary hover:shadow-glow text-white border-0 shadow-glow hover:scale-105 transition-all duration-300">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Add a new project to start organizing your team&apos;s work.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={projectForm.handleSubmit(onCreateProject)} className="space-y-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <div className="col-span-3">
                      <Input
                        id="name"
                        placeholder="Project name"
                        {...projectForm.register('name')}
                        className={projectForm.formState.errors.name ? 'border-destructive' : ''}
                      />
                      <FieldError error={projectForm.formState.errors.name?.message} />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <div className="col-span-3">
                      <Textarea
                        id="description"
                        placeholder="Project description"
                        {...projectForm.register('description')}
                        className={projectForm.formState.errors.description ? 'border-destructive' : ''}
                      />
                      <FieldError error={projectForm.formState.errors.description?.message} />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">
                      Priority
                    </Label>
                    <div className="col-span-3">
                      <Select
                        value={projectForm.watch('priority')}
                        onValueChange={(value: string) => projectForm.setValue('priority', value as 'Low' | 'Medium' | 'High' | 'Critical')}
                      >
                        <SelectTrigger className={projectForm.formState.errors.priority ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldError error={projectForm.formState.errors.priority?.message} />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deadline" className="text-right">
                      Deadline
                    </Label>
                    <div className="col-span-3">
                      <Input
                        id="deadline"
                        type="date"
                        {...projectForm.register('deadline')}
                        className={projectForm.formState.errors.deadline ? 'border-destructive' : ''}
                      />
                      <FieldError error={projectForm.formState.errors.deadline?.message} />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="budget" className="text-right">
                      Budget
                    </Label>
                    <div className="col-span-3">
                      <Input
                        id="budget"
                        type="number"
                        placeholder="0"
                        {...projectForm.register('budget', { valueAsNumber: true })}
                        className={projectForm.formState.errors.budget ? 'border-destructive' : ''}
                      />
                      <FieldError error={projectForm.formState.errors.budget?.message} />
                    </div>
                  </div>
                </form>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreateProjectModalOpen(false)
                      projectForm.reset()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={projectForm.handleSubmit(onCreateProject)}
                    disabled={projectForm.formState.isSubmitting}
                  >
                    {projectForm.formState.isSubmitting ? 'Creating...' : 'Create Project'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Overview Cards */}
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <OverviewCards />
        )}

        {/* Charts Section */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2">
              <ChartSkeleton />
            </div>
            <div>
              <ChartSkeleton />
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2">
              <TaskCompletionChart />
            </div>
            <div>
              <ProjectStatusChart />
            </div>
          </div>
        )}

        {/* Activity Feed and Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            {isLoading ? <ActivityFeedSkeleton /> : <ActivityFeed />}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              type: "spring",
              stiffness: 80,
              damping: 20
            }}
          >
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="card-glass p-6 hover:shadow-glow-green transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20">
                    <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-heading-4 text-gradient-secondary">Quick Stats</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors duration-300">
                    <span className="text-body-small text-muted-foreground font-medium">This Week</span>
                    <span className="text-body font-semibold text-emerald-600 dark:text-emerald-400">+12 tasks completed</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors duration-300">
                    <span className="text-body-small text-muted-foreground font-medium">This Month</span>
                    <span className="text-body font-semibold text-emerald-600 dark:text-emerald-400">+45 tasks completed</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors duration-300">
                    <span className="text-body-small text-muted-foreground font-medium">Team Productivity</span>
                    <span className="text-body font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      ↑ 18%
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card-glass p-6 hover:shadow-glow transition-all duration-300">
                <h3 className="text-heading-4 mb-6 text-gradient-primary">Quick Actions</h3>
                <div className="space-y-2">
                  <Dialog open={isCreateTaskModalOpen} onOpenChange={setIsCreateTaskModalOpen}>
                    <DialogTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                                              <Button variant="outline" className="w-full justify-start hover:bg-white/10 hover:shadow-lg border-white/20 dark:border-slate-700/20 transition-all duration-300 group hover-tilt mobile-button-responsive mobile-touch-target">
                        <Plus className="mr-3 h-5 w-5 group-hover:rotate-90 group-hover:scale-110 transition-all duration-300" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300 mobile-text-responsive">Create Task</span>
                      </Button>
                      </motion.div>
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
                        <Button variant="outline" onClick={() => setIsCreateTaskModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsCreateTaskModalOpen(false)}>
                          Create Task
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={isAddTeamMemberModalOpen} onOpenChange={setIsAddTeamMemberModalOpen}>
                    <DialogTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Button variant="outline" className="w-full justify-start hover:bg-white/10 hover:shadow-lg border-white/20 dark:border-slate-700/20 transition-all duration-300 group hover-tilt mobile-button-responsive mobile-touch-target">
                          <Plus className="mr-3 h-5 w-5 group-hover:rotate-90 group-hover:scale-110 transition-all duration-300" />
                          <span className="group-hover:translate-x-1 transition-transform duration-300 mobile-text-responsive">Add Team Member</span>
                        </Button>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-lg border-border/50 shadow-glow mobile-modal">
                      <DialogHeader>
                        <DialogTitle className="text-gradient-primary">Add Team Member</DialogTitle>
                        <DialogDescription>
                          Invite a new member to join your team.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="member-name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="member-name"
                            placeholder="Full name"
                            className="col-span-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20 focus:border-blue-500/50 transition-all duration-300"
                          />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="member-email" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="member-email"
                            type="email"
                            placeholder="email@example.com"
                            className="col-span-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20 focus:border-blue-500/50 transition-all duration-300"
                          />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="member-role" className="text-right">
                            Role
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20 focus:border-blue-500/50 transition-all duration-300">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent className="bg-card/95 backdrop-blur-lg border-border/50">
                              <SelectItem value="Developer">Developer</SelectItem>
                              <SelectItem value="Designer">Designer</SelectItem>
                              <SelectItem value="Manager">Manager</SelectItem>
                              <SelectItem value="QA">QA</SelectItem>
                              <SelectItem value="Admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="member-department" className="text-right">
                            Department
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20 focus:border-blue-500/50 transition-all duration-300">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent className="bg-card/95 backdrop-blur-lg border-border/50">
                              <SelectItem value="Engineering">Engineering</SelectItem>
                              <SelectItem value="Design">Design</SelectItem>
                              <SelectItem value="Product">Product</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                              <SelectItem value="Sales">Sales</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddTeamMemberModalOpen(false)} className="hover:bg-white/10 transition-colors duration-300">
                          Cancel
                        </Button>
                        <Button onClick={() => setIsAddTeamMemberModalOpen(false)} className="gradient-primary text-white border-0 shadow-glow hover:shadow-glow-purple transition-all duration-300">
                          Send Invitation
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button variant="outline" className="w-full justify-start hover:bg-white/10 hover:shadow-lg border-white/20 dark:border-slate-700/20 transition-all duration-300 group hover-tilt mobile-button-responsive mobile-touch-target">
                      <TrendingUp className="mr-3 h-5 w-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300 mobile-text-responsive">View Reports</span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}