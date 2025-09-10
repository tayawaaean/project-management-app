'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { config } from '@/lib/config'
import { ApplicationError, createErrorFromResponse, createErrorFromUnknown, withRetry } from '@/lib/errors'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: ApplicationError | null
}

interface UseApiOptions<T = unknown> {
  immediate?: boolean
  retryCount?: number
  retryDelay?: number
  onSuccess?: (data: T) => void
  onError?: (error: ApplicationError) => void
}

interface UseApiReturn<T> extends ApiState<T> {
  refetch: () => Promise<void>
  reset: () => void
}

// Generic API hook for GET requests
export function useApi<T>(
  url: string,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const {
    immediate = true,
    retryCount = 3,
    retryDelay = 1000,
    onSuccess,
    onError,
  } = options

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const abortControllerRef = useRef<AbortController | null>(null)

  const execute = useCallback(async (signal?: AbortSignal) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(`${config.apiUrl}${url}`, {
        signal,
        headers: {
          'Content-Type': 'application/json',
          // Add auth headers here if needed
          // 'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw createErrorFromResponse(response)
      }

      const data = await response.json()

      setState({
        data,
        loading: false,
        error: null,
      })

      onSuccess?.(data)
    } catch (error) {
      const appError = createErrorFromUnknown(error)

      setState(prev => ({
        ...prev,
        loading: false,
        error: appError,
      }))

      onError?.(appError)
    }
  }, [url, onSuccess, onError])

  const refetch = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    await withRetry(
      () => execute(abortControllerRef.current!.signal),
      retryCount,
      retryDelay
    )
  }, [execute, retryCount, retryDelay])

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    setState({
      data: null,
      loading: false,
      error: null,
    })
  }, [])

  useEffect(() => {
    if (immediate) {
      refetch()
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [immediate, refetch])

  return {
    ...state,
    refetch,
    reset,
  }
}

// Hook for POST/PUT/PATCH/DELETE mutations
export function useMutation<TData = any, TVariables = any>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options: UseApiOptions & {
    onMutate?: (variables: TVariables) => void
  } = {}
) {
  const {
    retryCount = 1,
    retryDelay = 1000,
    onSuccess,
    onError,
    onMutate,
  } = options

  const [state, setState] = useState<{
    data: TData | null
    loading: boolean
    error: ApplicationError | null
  }>({
    data: null,
    loading: false,
    error: null,
  })

  const mutate = useCallback(async (variables?: TVariables) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    onMutate?.(variables)

    try {
      const response = await withRetry(async () => {
        const res = await fetch(`${config.apiUrl}${url}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            // Add auth headers here if needed
            // 'Authorization': `Bearer ${token}`,
          },
          body: variables ? JSON.stringify(variables) : undefined,
        })

        if (!res.ok) {
          throw createErrorFromResponse(res)
        }

        return res
      }, retryCount, retryDelay)

      let data: TData | null = null
      if (method !== 'DELETE') {
        data = await response.json()
      }

      setState({
        data,
        loading: false,
        error: null,
      })

      onSuccess?.(data)
      return data
    } catch (error) {
      const appError = createErrorFromUnknown(error)

      setState(prev => ({
        ...prev,
        loading: false,
        error: appError,
      }))

      onError?.(appError)
      throw appError
    }
  }, [url, method, retryCount, retryDelay, onSuccess, onError, onMutate])

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    })
  }, [])

  return {
    ...state,
    mutate,
    reset,
  }
}

// Hook for optimistic updates
export function useOptimisticMutation<TData = any, TVariables = any>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options: UseApiOptions & {
    onMutate?: (variables: TVariables) => TData
    onRollback?: (previousData: TData | null) => void
  } = {}
) {
  const {
    retryCount = 1,
    retryDelay = 1000,
    onSuccess,
    onError,
    onMutate,
    onRollback,
  } = options

  const [state, setState] = useState<{
    data: TData | null
    loading: boolean
    error: ApplicationError | null
  }>({
    data: null,
    loading: false,
    error: null,
  })

  const mutate = useCallback(async (variables?: TVariables) => {
    const previousData = state.data

    // Optimistic update
    if (onMutate) {
      const optimisticData = onMutate(variables)
      setState(prev => ({ ...prev, data: optimisticData, loading: true, error: null }))
    } else {
      setState(prev => ({ ...prev, loading: true, error: null }))
    }

    try {
      const response = await withRetry(async () => {
        const res = await fetch(`${config.apiUrl}${url}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            // Add auth headers here if needed
          },
          body: variables ? JSON.stringify(variables) : undefined,
        })

        if (!res.ok) {
          throw createErrorFromResponse(res)
        }

        return res
      }, retryCount, retryDelay)

      let data: TData | null = null
      if (method !== 'DELETE') {
        data = await response.json()
      }

      setState({
        data,
        loading: false,
        error: null,
      })

      onSuccess?.(data)
      return data
    } catch (error) {
      // Rollback on error
      if (onRollback) {
        onRollback(previousData)
      }
      setState(prev => ({ ...prev, data: previousData }))

      const appError = createErrorFromUnknown(error)

      setState(prev => ({
        ...prev,
        loading: false,
        error: appError,
      }))

      onError?.(appError)
      throw appError
    }
  }, [url, method, retryCount, retryDelay, onSuccess, onError, onMutate, onRollback, state.data])

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    })
  }, [])

  return {
    ...state,
    mutate,
    reset,
  }
}

// Hook for polling data
export function usePolling<T>(
  url: string,
  interval: number = 30000, // 30 seconds
  options: UseApiOptions & { enabled?: boolean } = {}
): UseApiReturn<T> & { stopPolling: () => void; startPolling: () => void } {
  const { enabled = true, ...apiOptions } = options

  const [pollingEnabled, setPollingEnabled] = useState(enabled)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const api = useApi<T>(url, { ...apiOptions, immediate: false })

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setPollingEnabled(false)
  }, [])

  const startPolling = useCallback(() => {
    setPollingEnabled(true)
  }, [])

  useEffect(() => {
    if (pollingEnabled && !api.loading) {
      intervalRef.current = setInterval(() => {
        api.refetch()
      }, interval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [pollingEnabled, interval, api.loading, api.refetch])

  // Initial fetch
  useEffect(() => {
    if (enabled) {
      api.refetch()
    }
  }, [enabled, api.refetch])

  return {
    ...api,
    stopPolling,
    startPolling,
  }
}

// Hook for infinite scrolling/pagination
export function useInfiniteQuery<T>(
  url: string,
  options: {
    limit?: number
    getNextPageParam?: (lastPage: any, allPages: any[]) => any
  } = {}
) {
  const { limit = 20, getNextPageParam } = options

  const [pages, setPages] = useState<T[][]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApplicationError | null>(null)
  const [hasNextPage, setHasNextPage] = useState(true)

  const fetchNextPage = useCallback(async () => {
    if (loading || !hasNextPage) return

    setLoading(true)
    setError(null)

    try {
      const cursor = getNextPageParam
        ? getNextPageParam(pages[pages.length - 1], pages)
        : pages.length * limit

      const response = await fetch(
        `${config.apiUrl}${url}?limit=${limit}&cursor=${cursor}`
      )

      if (!response.ok) {
        throw createErrorFromResponse(response)
      }

      const data = await response.json()

      if (data.length < limit) {
        setHasNextPage(false)
      }

      setPages(prev => [...prev, data])
    } catch (err) {
      setError(createErrorFromUnknown(err))
    } finally {
      setLoading(false)
    }
  }, [url, limit, pages, loading, hasNextPage, getNextPageParam])

  const reset = useCallback(() => {
    setPages([])
    setLoading(false)
    setError(null)
    setHasNextPage(true)
  }, [])

  const data = pages.flat()

  return {
    data,
    loading,
    error,
    hasNextPage,
    fetchNextPage,
    reset,
  }
}
