'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { OverviewCards } from '@/components/dashboard/overview-cards'
import { TaskCompletionChart } from '@/components/charts/task-completion-chart'
import { ProjectStatusChart } from '@/components/charts/project-status-chart'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { Button } from '@/components/ui/button'
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
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Dialog open={isCreateProjectModalOpen} onOpenChange={setIsCreateProjectModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Add a new project to start organizing your team's work.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="project-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="project-name"
                      placeholder="Project name"
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="project-description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="project-description"
                      placeholder="Project description"
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="project-priority" className="text-right">
                      Priority
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="project-deadline" className="text-right">
                      Deadline
                    </Label>
                    <Input
                      id="project-deadline"
                      type="date"
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="project-budget" className="text-right">
                      Budget
                    </Label>
                    <Input
                      id="project-budget"
                      type="number"
                      placeholder="0"
                      className="col-span-3"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateProjectModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateProjectModalOpen(false)}>
                    Create Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <OverviewCards />

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2">
            <TaskCompletionChart />
          </div>
          <div>
            <ProjectStatusChart />
          </div>
        </div>

        {/* Activity Feed and Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <ActivityFeed />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold">Quick Stats</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">This Week</span>
                    <span className="text-sm font-medium">+12 tasks completed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">This Month</span>
                    <span className="text-sm font-medium">+45 tasks completed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Team Productivity</span>
                    <span className="text-sm font-medium text-green-600">↑ 18%</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Dialog open={isCreateTaskModalOpen} onOpenChange={setIsCreateTaskModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Task
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
                      <Button variant="outline" className="w-full justify-start">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Team Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Add Team Member</DialogTitle>
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
                            className="col-span-3"
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
                            className="col-span-3"
                          />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="member-role" className="text-right">
                            Role
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
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
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
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
                        <Button variant="outline" onClick={() => setIsAddTeamMemberModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsAddTeamMemberModalOpen(false)}>
                          Send Invitation
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Reports
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}