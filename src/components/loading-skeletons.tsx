'use client'

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// Base skeleton component
export const SkeletonLoader: React.FC<{
  className?: string
  animate?: boolean
}> = ({ className = '', animate = true }) => (
  <Skeleton className={`${animate ? 'animate-pulse' : ''} ${className}`} />
)

// Card skeleton for dashboard/overview cards
export const CardSkeleton: React.FC = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <SkeletonLoader className="h-4 w-[100px]" />
      <SkeletonLoader className="h-4 w-4" />
    </CardHeader>
    <CardContent>
      <SkeletonLoader className="h-8 w-[60px] mb-1" />
      <SkeletonLoader className="h-3 w-[120px]" />
    </CardContent>
  </Card>
)

// Chart skeleton
export const ChartSkeleton: React.FC = () => (
  <Card>
    <CardHeader>
      <SkeletonLoader className="h-5 w-[150px]" />
      <SkeletonLoader className="h-4 w-[200px]" />
    </CardHeader>
    <CardContent>
      <div className="h-[300px] flex items-end space-x-2">
        {Array.from({ length: 12 }, (_, i) => (
          <SkeletonLoader
            key={i}
            className="w-6"
            style={{ height: `${Math.random() * 200 + 50}px` }}
          />
        ))}
      </div>
    </CardContent>
  </Card>
)

// Table skeleton
export const TableSkeleton: React.FC<{
  rows?: number
  columns?: number
}> = ({ rows = 5, columns = 4 }) => (
  <Card>
    <CardHeader>
      <SkeletonLoader className="h-6 w-[120px]" />
      <SkeletonLoader className="h-4 w-[180px]" />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {/* Table header */}
        <div className="flex space-x-4">
          {Array.from({ length: columns }, (_, i) => (
            <SkeletonLoader key={i} className="h-4 flex-1" />
          ))}
        </div>

        {/* Table rows */}
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="flex space-x-4">
            {Array.from({ length: columns }, (_, colIndex) => (
              <SkeletonLoader
                key={colIndex}
                className={`flex-1 ${colIndex === 0 ? 'h-10' : 'h-4'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

// Project card skeleton
export const ProjectCardSkeleton: React.FC = () => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader>
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <SkeletonLoader className="h-5 w-[140px]" />
          <SkeletonLoader className="h-4 w-[200px]" />
        </div>
        <SkeletonLoader className="h-6 w-16" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <SkeletonLoader className="h-4 w-4" />
          <SkeletonLoader className="h-4 w-[100px]" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <SkeletonLoader className="h-3 w-[60px]" />
            <SkeletonLoader className="h-3 w-[30px]" />
          </div>
          <SkeletonLoader className="h-2 w-full" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {Array.from({ length: 3 }, (_, i) => (
              <SkeletonLoader key={i} className="h-6 w-6 rounded-full" />
            ))}
          </div>
          <SkeletonLoader className="h-4 w-[80px]" />
        </div>
      </div>
    </CardContent>
  </Card>
)

// Task card skeleton
export const TaskCardSkeleton: React.FC = () => (
  <Card className="p-4">
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <SkeletonLoader className="h-4 w-[160px]" />
          <SkeletonLoader className="h-3 w-[120px]" />
        </div>
        <SkeletonLoader className="h-5 w-12" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SkeletonLoader className="h-6 w-6 rounded-full" />
          <SkeletonLoader className="h-3 w-[80px]" />
        </div>
        <SkeletonLoader className="h-3 w-[60px]" />
      </div>
    </div>
  </Card>
)

// Form skeleton
export const FormSkeleton: React.FC = () => (
  <Card>
    <CardHeader>
      <SkeletonLoader className="h-6 w-[140px]" />
      <SkeletonLoader className="h-4 w-[200px]" />
    </CardHeader>
    <CardContent className="space-y-6">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonLoader className="h-4 w-[80px]" />
          <SkeletonLoader className="h-10 w-full" />
        </div>
      ))}

      <div className="flex justify-end space-x-2">
        <SkeletonLoader className="h-10 w-[80px]" />
        <SkeletonLoader className="h-10 w-[100px]" />
      </div>
    </CardContent>
  </Card>
)

// Kanban board skeleton
export const KanbanSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: 4 }, (_, columnIndex) => (
      <Card key={columnIndex}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <SkeletonLoader className="h-5 w-[100px]" />
            <SkeletonLoader className="h-5 w-8" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 3 }, (_, taskIndex) => (
              <TaskCardSkeleton key={taskIndex} />
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

// Activity feed skeleton
export const ActivityFeedSkeleton: React.FC = () => (
  <Card>
    <CardHeader>
      <SkeletonLoader className="h-6 w-[120px]" />
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex items-start space-x-3">
            <SkeletonLoader className="h-8 w-8 rounded-full" />
            <div className="space-y-2 flex-1">
              <SkeletonLoader className="h-4 w-full" />
              <SkeletonLoader className="h-3 w-[60px]" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

// Profile skeleton
export const ProfileSkeleton: React.FC = () => (
  <Card>
    <CardHeader>
      <div className="flex items-center space-x-4">
        <SkeletonLoader className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <SkeletonLoader className="h-6 w-[140px]" />
          <SkeletonLoader className="h-4 w-[180px]" />
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="space-y-2">
            <SkeletonLoader className="h-4 w-[60px]" />
            <SkeletonLoader className="h-10 w-full" />
          </div>
        ))}
      </div>
      <SkeletonLoader className="h-24 w-full" />
      <SkeletonLoader className="h-10 w-[120px]" />
    </CardContent>
  </Card>
)

// Generic list skeleton
export const ListSkeleton: React.FC<{
  itemCount?: number
  showAvatar?: boolean
}> = ({ itemCount = 5, showAvatar = false }) => (
  <Card>
    <CardHeader>
      <SkeletonLoader className="h-6 w-[100px]" />
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {Array.from({ length: itemCount }, (_, i) => (
          <div key={i} className="flex items-center space-x-3">
            {showAvatar && <SkeletonLoader className="h-10 w-10 rounded-full" />}
            <div className="space-y-2 flex-1">
              <SkeletonLoader className="h-4 w-[140px]" />
              <SkeletonLoader className="h-3 w-[100px]" />
            </div>
            <SkeletonLoader className="h-6 w-16" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

// Loading overlay component
export const LoadingOverlay: React.FC<{
  isLoading: boolean
  children: React.ReactNode
  message?: string
}> = ({ isLoading, children, message = 'Loading...' }) => (
  <div className="relative">
    {children}
    {isLoading && (
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    )}
  </div>
)

// Inline loading spinner
export const InlineLoader: React.FC<{
  size?: 'sm' | 'md' | 'lg'
  className?: string
}> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  return (
    <div
      className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]} ${className}`}
    />
  )
}

// Shimmer effect skeleton
export const ShimmerSkeleton: React.FC<{
  className?: string
  children?: React.ReactNode
}> = ({ className = '', children }) => (
  <div className={`relative overflow-hidden bg-muted rounded ${className}`}>
    {children}
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>
)
