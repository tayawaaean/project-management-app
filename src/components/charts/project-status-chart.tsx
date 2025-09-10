'use client'

import { motion } from 'framer-motion'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieLabelRenderProps
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { projectStatusData } from '@/lib/mockData'

const COLORS = ['#6366f1', '#f59e0b', '#6b7280', '#22c55e']
const GRADIENT_COLORS = [
  'from-blue-500 to-indigo-600',
  'from-amber-500 to-orange-600',
  'from-slate-500 to-slate-600',
  'from-emerald-500 to-green-600'
]

const STATUS_ICONS = {
  'Active': '🔥',
  'Planning': '📋',
  'On Hold': '⏸️',
  'Completed': '✅'
}

export function ProjectStatusChart() {
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="card-glass p-4 shadow-glow border-border/50">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">{STATUS_ICONS[data.name as keyof typeof STATUS_ICONS]}</span>
            <div>
              <p className="text-heading-4 text-gradient-primary font-semibold">{data.name}</p>
              <p className="text-body-small text-muted-foreground">Project Status</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-body">
              Count: <span className="font-semibold text-foreground">{data.value}</span>
            </p>
            <p className="text-body-small">
              Percentage: <span className="font-semibold text-foreground">{((data.value / projectStatusData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%</span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-caption font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ y: -5 }}
    >
      <Card className="card-glass hover:shadow-glow transition-all duration-500 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

        <CardHeader className="relative z-10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <CardTitle className="text-heading-3 text-gradient-primary">Projects by Status</CardTitle>
          </div>
          <CardDescription className="text-body">
            Distribution of projects across different statuses
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="h-[320px] relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="2" fill="currentColor"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {GRADIENT_COLORS.map((gradient, index) => (
                    <radialGradient key={index} id={`gradient${index}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={COLORS[index]} stopOpacity={0.8} />
                      <stop offset="100%" stopColor={COLORS[index]} stopOpacity={0.3} />
                    </radialGradient>
                  ))}
                </defs>

                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={CustomLabel}
                  outerRadius={90}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={300}
                  animationDuration={800}
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#gradient${index})`}
                      stroke={COLORS[index]}
                      strokeWidth={2}
                      className="hover:opacity-80 transition-opacity duration-300"
                    />
                  ))}
                </Pie>

                <Tooltip content={<CustomTooltip />} />

                {/* Custom Legend */}
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value, entry: { color: string }) => (
                    <span className="text-body-small flex items-center">
                      <span className="mr-2">{STATUS_ICONS[value as keyof typeof STATUS_ICONS]}</span>
                      <span className="font-medium">{value}</span>
                      <span className="ml-2 text-muted-foreground">({entry.payload.value})</span>
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
