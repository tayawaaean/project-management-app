'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { TaskCompletionChart } from '@/components/charts/task-completion-chart'
import { ProjectStatusChart } from '@/components/charts/project-status-chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  Calendar
} from 'lucide-react'
import { taskPriorityData, mockProjects, mockTasks } from '@/lib/mockData'

const COLORS = ['#22c55e', '#f59e0b', '#f97316', '#ef4444']

const teamProductivityData = [
  { member: 'Sarah J.', completed: 18, total: 22 },
  { member: 'Michael C.', completed: 15, total: 18 },
  { member: 'Emily R.', completed: 12, total: 16 },
  { member: 'David K.', completed: 9, total: 12 },
  { member: 'Lisa T.', completed: 14, total: 15 },
  { member: 'James W.', completed: 11, total: 14 },
]

const weeklyProgressData = [
  { week: 'Week 1', tasks: 12, projects: 2 },
  { week: 'Week 2', tasks: 15, projects: 1 },
  { week: 'Week 3', tasks: 18, projects: 3 },
  { week: 'Week 4', tasks: 22, projects: 2 },
]

export default function AnalyticsPage() {
  const totalTasks = mockTasks.length
  const completedTasks = mockTasks.filter(t => t.status === 'Done').length
  const completionRate = Math.round((completedTasks / totalTasks) * 100)

  const activeProjects = mockProjects.filter(p => p.status === 'Active').length
  const totalProjects = mockProjects.length

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
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Detailed insights into your project performance and team productivity.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 Days
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate}%</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{completedTasks} of {totalTasks} tasks</span>
                <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                  +15%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProjects}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>of {totalProjects} total projects</span>
                <Badge variant="default" className="text-xs bg-blue-100 text-blue-800">
                  +2
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Task Time</CardTitle>
              <TrendingDown className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 days</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>Per task completion</span>
                <Badge variant="destructive" className="text-xs">
                  -0.3d
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Velocity</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.5</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>Tasks per week</span>
                <Badge variant="default" className="text-xs bg-purple-100 text-purple-800">
                  +22%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Task Completion Trends */}
          <div className="md:col-span-2">
            <TaskCompletionChart />
          </div>

          {/* Project Status */}
          <div>
            <ProjectStatusChart />
          </div>

          {/* Team Productivity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Team Productivity</CardTitle>
                <CardDescription>
                  Task completion by team members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={teamProductivityData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="member"
                        className="text-muted-foreground"
                        fontSize={12}
                      />
                      <YAxis
                        className="text-muted-foreground"
                        fontSize={12}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px',
                        }}
                      />
                      <Bar dataKey="completed" fill="hsl(var(--primary))" />
                      <Bar dataKey="total" fill="hsl(var(--muted-foreground))" opacity={0.3} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Task Priority Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Task Priority</CardTitle>
                <CardDescription>
                  Distribution by priority level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskPriorityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {taskPriorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>
                  Tasks and projects completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="week"
                        className="text-muted-foreground"
                        fontSize={12}
                      />
                      <YAxis
                        className="text-muted-foreground"
                        fontSize={12}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px',
                        }}
                      />
                      <Bar dataKey="tasks" fill="hsl(var(--chart-1))" />
                      <Bar dataKey="projects" fill="hsl(var(--chart-2))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
