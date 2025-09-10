'use client'

import React, { useState, useCallback } from 'react'
import { Project } from '@/lib/mockData'
import { useApi, useMutation, useOptimisticMutation } from './use-api'
import { ApplicationError } from '@/lib/errors'

// Hook for fetching projects
export function useProjects(options: {
  status?: string
  priority?: string
  search?: string
} = {}) {
  const queryParams = new URLSearchParams()

  if (options.status) queryParams.append('status', options.status)
  if (options.priority) queryParams.append('priority', options.priority)
  if (options.search) queryParams.append('search', options.search)

  const queryString = queryParams.toString()
  const url = `/projects${queryString ? `?${queryString}` : ''}`

  return useApi<Project[]>(url, {
    onError: (error) => {
      console.error('Failed to fetch projects:', error.message)
    },
  })
}

// Hook for fetching a single project
export function useProject(id: string) {
  return useApi<Project>(`/projects/${id}`, {
    onError: (error) => {
      console.error(`Failed to fetch project ${id}:`, error.message)
    },
  })
}

// Hook for creating projects
export function useCreateProject() {
  return useMutation('/projects', 'POST', {
    onSuccess: (data) => {
      console.log('Project created successfully:', data)
    },
    onError: (error) => {
      console.error('Failed to create project:', error.message)
    },
  })
}

// Hook for updating projects with optimistic updates
export function useUpdateProject() {
  return useOptimisticMutation('/projects', 'PUT', {
    onMutate: (variables) => {
      // Return optimistic data
      return variables as Project
    },
    onRollback: (previousData) => {
      console.log('Rolling back project update')
    },
    onSuccess: (data) => {
      console.log('Project updated successfully:', data)
    },
    onError: (error) => {
      console.error('Failed to update project:', error.message)
    },
  })
}

// Hook for deleting projects
export function useDeleteProject() {
  return useMutation('/projects', 'DELETE', {
    onSuccess: () => {
      console.log('Project deleted successfully')
    },
    onError: (error) => {
      console.error('Failed to delete project:', error.message)
    },
  })
}

// Hook for project statistics
export function useProjectStats() {
  return useApi<{
    totalProjects: number
    activeProjects: number
    completedProjects: number
    onTrackProjects: number
  }>('/projects/stats', {
    onError: (error) => {
      console.error('Failed to fetch project stats:', error.message)
    },
  })
}

// Hook for project timeline/activities
export function useProjectActivities(projectId: string) {
  return useApi(`/projects/${projectId}/activities`, {
    onError: (error) => {
      console.error(`Failed to fetch activities for project ${projectId}:`, error.message)
    },
  })
}

// Custom hook for project search with debouncing
export function useProjectSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // Debounce search term
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const { data: projects, loading, error, refetch } = useProjects({
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
    projects: projects || [],
    loading,
    error,
    searchTerm,
    search,
    clearSearch,
    refetch,
  }
}

// Hook for project filters
export function useProjectFilters() {
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: '',
  })

  const updateFilter = useCallback((key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      status: 'all',
      priority: 'all',
      search: '',
    })
  }, [])

  const { data: projects, loading, error } = useProjects(filters)

  return {
    projects: projects || [],
    filters,
    updateFilter,
    clearFilters,
    loading,
    error,
  }
}
