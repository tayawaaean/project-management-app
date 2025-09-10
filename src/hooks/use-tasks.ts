'use client'

import React, { useState, useCallback } from 'react'
import { Task } from '@/lib/mockData'
import { useApi, useMutation, useOptimisticMutation, usePolling } from './use-api'
import { ApplicationError } from '@/lib/errors'

// Hook for fetching tasks
export function useTasks(options: {
  status?: string
  priority?: string
  projectId?: string
  assigneeId?: string
  search?: string
} = {}) {
  const queryParams = new URLSearchParams()

  if (options.status) queryParams.append('status', options.status)
  if (options.priority) queryParams.append('priority', options.priority)
  if (options.projectId) queryParams.append('projectId', options.projectId)
  if (options.assigneeId) queryParams.append('assigneeId', options.assigneeId)
  if (options.search) queryParams.append('search', options.search)

  const queryString = queryParams.toString()
  const url = `/tasks${queryString ? `?${queryString}` : ''}`

  return useApi<Task[]>(url, {
    onError: (error) => {
      console.error('Failed to fetch tasks:', error.message)
    },
  })
}

// Hook for fetching a single task
export function useTask(id: string) {
  return useApi<Task>(`/tasks/${id}`, {
    onError: (error) => {
      console.error(`Failed to fetch task ${id}:`, error.message)
    },
  })
}

// Hook for creating tasks
export function useCreateTask() {
  return useMutation('/tasks', 'POST', {
    onSuccess: (data) => {
      console.log('Task created successfully:', data)
    },
    onError: (error) => {
      console.error('Failed to create task:', error.message)
    },
  })
}

// Hook for updating tasks with optimistic updates (for Kanban drag & drop)
export function useUpdateTask() {
  return useOptimisticMutation('/tasks', 'PUT', {
    onMutate: (variables) => {
      // Return optimistic task data
      return variables as Task
    },
    onRollback: (previousData) => {
      console.log('Rolling back task update')
    },
    onSuccess: (data) => {
      console.log('Task updated successfully:', data)
    },
    onError: (error) => {
      console.error('Failed to update task:', error.message)
    },
  })
}

// Hook for deleting tasks
export function useDeleteTask() {
  return useMutation('/tasks', 'DELETE', {
    onSuccess: () => {
      console.log('Task deleted successfully')
    },
    onError: (error) => {
      console.error('Failed to delete task:', error.message)
    },
  })
}

// Hook for task statistics
export function useTaskStats() {
  return useApi<{
    totalTasks: number
    completedTasks: number
    inProgressTasks: number
    todoTasks: number
    overdueTasks: number
  }>('/tasks/stats', {
    onError: (error) => {
      console.error('Failed to fetch task stats:', error.message)
    },
  })
}

// Hook for task comments
export function useTaskComments(taskId: string) {
  return useApi(`/tasks/${taskId}/comments`, {
    onError: (error) => {
      console.error(`Failed to fetch comments for task ${taskId}:`, error.message)
    },
  })
}

// Hook for adding task comments
export function useAddTaskComment(taskId: string) {
  return useMutation(`/tasks/${taskId}/comments`, 'POST', {
    onSuccess: (data) => {
      console.log('Comment added successfully:', data)
    },
    onError: (error) => {
      console.error('Failed to add comment:', error.message)
    },
  })
}

// Hook for task time tracking
export function useTaskTimeTracking(taskId: string) {
  return useApi<{
    totalTime: number
    todayTime: number
    weekTime: number
    timeEntries: Array<{
      id: string
      startTime: string
      endTime: string
      duration: number
      description?: string
    }>
  }>(`/tasks/${taskId}/time-tracking`, {
    onError: (error) => {
      console.error(`Failed to fetch time tracking for task ${taskId}:`, error.message)
    },
  })
}

// Hook for starting/stopping time tracking
export function useTimeTracking(taskId: string) {
  return useMutation(`/tasks/${taskId}/time-tracking`, 'POST', {
    onSuccess: (data) => {
      console.log('Time tracking updated:', data)
    },
    onError: (error) => {
      console.error('Failed to update time tracking:', error.message)
    },
  })
}

// Hook for task search with debouncing
export function useTaskSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // Debounce search term
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const { data: tasks, loading, error, refetch } = useTasks({
    search: debouncedSearchTerm,
  })

  const search = useCallback((term: string) => {
    setSearchTerm(term)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
    setDebouncedSearchTerm('')
  }, [])

  return {
    tasks: tasks || [],
    loading,
    error,
    searchTerm,
    search,
    clearSearch,
    refetch,
  }
}

// Hook for task filters
export function useTaskFilters() {
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    projectId: 'all',
    assigneeId: 'all',
    search: '',
  })

  const updateFilter = useCallback((key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      status: 'all',
      priority: 'all',
      projectId: 'all',
      assigneeId: 'all',
      search: '',
    })
  }, [])

  const { data: tasks, loading, error } = useTasks(filters)

  return {
    tasks: tasks || [],
    filters,
    updateFilter,
    clearFilters,
    loading,
    error,
  }
}

// Hook for polling task updates (useful for real-time Kanban board)
export function useTaskPolling(options: {
  status?: string
  priority?: string
  projectId?: string
} = {}) {
  const queryParams = new URLSearchParams()

  if (options.status) queryParams.append('status', options.status)
  if (options.priority) queryParams.append('priority', options.priority)
  if (options.projectId) queryParams.append('projectId', options.projectId)

  const queryString = queryParams.toString()
  const url = `/tasks${queryString ? `?${queryString}` : ''}`

  return usePolling<Task[]>(url, 30000, { // Poll every 30 seconds
    onError: (error) => {
      console.error('Failed to poll tasks:', error.message)
    },
  })
}

// Hook for task drag and drop operations
export function useTaskDragAndDrop() {
  const updateTask = useUpdateTask()

  const moveTask = useCallback(async (
    taskId: string,
    newStatus: Task['status'],
    newProjectId?: string
  ) => {
    try {
      await updateTask.mutate({
        id: taskId,
        status: newStatus,
        projectId: newProjectId,
        updatedAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Failed to move task:', error)
      throw error
    }
  }, [updateTask])

  return {
    moveTask,
    loading: updateTask.loading,
    error: updateTask.error,
  }
}
