'use client'

import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { taskCompletionData } from '@/lib/mockData'

export function TaskCompletionChart() {
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="card-glass p-4 shadow-glow border-border/50">
          <p className="text-heading-4 text-gradient-primary font-semibold mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-body-small">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Completed: <span className="font-semibold text-blue-600">{payload[0].value}</span>
            </p>
            <p className="text-body-small">
              <span className="inline-block w-3 h-3 bg-slate-400 rounded-full mr-2"></span>
              Total: <span className="font-semibold text-slate-600">{payload[1].value}</span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.7,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ y: -5 }}
    >
      <Card className="card-glass hover:shadow-glow transition-all duration-500 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

        <CardHeader className="relative z-10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <CardTitle className="text-heading-3 text-gradient-primary">Task Completion Trends</CardTitle>
          </div>
          <CardDescription className="text-body">
            Monthly task completion vs total tasks over time
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="h-[320px] relative">
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={taskCompletionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="2 2" className="stroke-muted/30" />
                <XAxis
                  dataKey="month"
                  className="text-muted-foreground"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  className="text-muted-foreground"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip content={<CustomTooltip />} />

                {/* Area fills */}
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Completed"
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6, className: 'animate-pulse' }}
                  activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#64748b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Total"
                  dot={{ fill: '#64748b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#64748b', strokeWidth: 2, fill: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
