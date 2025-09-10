'use client'

import { useForm, UseFormProps, UseFormReturn, FieldValues, Path } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useCallback } from 'react'

// Generic hook for form validation with Zod
export function useValidatedForm<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  options: UseFormProps<T> = {}
): UseFormReturn<T> & {
  isSubmitting: boolean
  setIsSubmitting: (value: boolean) => void
} {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<T>({
    ...options,
    resolver: zodResolver(schema),
  })

  return {
    ...form,
    isSubmitting,
    setIsSubmitting,
  }
}

// Hook for project forms
export function useProjectForm() {
  const { projectSchema } = require('@/lib/validation')

  return useValidatedForm(projectSchema, {
    defaultValues: {
      name: '',
      description: '',
      priority: 'Medium' as const,
      status: 'Planning' as const,
      deadline: '',
      budget: undefined,
      team: [],
    },
  })
}

// Hook for task forms
export function useTaskForm() {
  const { taskSchema } = require('@/lib/validation')

  return useValidatedForm(taskSchema, {
    defaultValues: {
      title: '',
      description: '',
      priority: 'Medium' as const,
      status: 'To Do' as const,
      projectId: '',
      assignee: '',
      dueDate: '',
      estimatedHours: undefined,
      actualHours: 0,
      tags: [],
    },
  })
}

// Hook for user/team member forms
export function useUserForm() {
  const { userSchema } = require('@/lib/validation')

  return useValidatedForm(userSchema, {
    defaultValues: {
      name: '',
      email: '',
      role: 'Developer' as const,
      department: 'Engineering' as const,
      phone: '',
      avatar: '',
    },
  })
}

// Hook for login forms
export function useLoginForm() {
  const { loginSchema } = require('@/lib/validation')

  return useValidatedForm(loginSchema, {
    defaultValues: {
      email: '',
      password: '',
    },
  })
}

// Hook for registration forms
export function useRegisterForm() {
  const { registerSchema } = require('@/lib/validation')

  return useValidatedForm(registerSchema, {
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
}

// Hook for password change forms
export function usePasswordChangeForm() {
  const { passwordChangeSchema } = require('@/lib/validation')

  return useValidatedForm(passwordChangeSchema, {
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })
}

// Hook for profile update forms
export function useProfileUpdateForm() {
  const { profileUpdateSchema } = require('@/lib/validation')

  return useValidatedForm(profileUpdateSchema, {
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      phone: '',
      location: '',
    },
  })
}

// Hook for comment forms
export function useCommentForm() {
  const { commentSchema } = require('@/lib/validation')

  return useValidatedForm(commentSchema, {
    defaultValues: {
      content: '',
    },
  })
}

// Hook for search forms
export function useSearchForm() {
  const { searchSchema } = require('@/lib/validation')

  return useValidatedForm(searchSchema, {
    defaultValues: {
      query: '',
    },
  })
}

// Generic form submission handler
export function useFormSubmission<T extends FieldValues>(
  onSubmit: (data: T) => Promise<void> | void,
  options: {
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
    successMessage?: string
    errorMessage?: string
  } = {}
) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = useCallback(async (data: T) => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      await onSubmit(data)
      setSubmitSuccess(true)

      if (options.onSuccess) {
        options.onSuccess(data)
      }

      if (options.successMessage) {
        // You could integrate with a toast notification system here
        console.log('Success:', options.successMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : options.errorMessage || 'An error occurred'
      setSubmitError(errorMessage)

      if (options.onError) {
        options.onError(error as Error)
      }

      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [onSubmit, options])

  const reset = useCallback(() => {
    setSubmitError(null)
    setSubmitSuccess(false)
    setIsSubmitting(false)
  }, [])

  return {
    handleSubmit,
    isSubmitting,
    submitError,
    submitSuccess,
    reset,
  }
}

// Hook for form field validation feedback
export function useFieldValidation() {
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  const markFieldAsTouched = useCallback((fieldName: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName))
  }, [])

  const isFieldTouched = useCallback((fieldName: string) => {
    return touchedFields.has(fieldName)
  }, [touchedFields])

  const resetTouchedFields = useCallback(() => {
    setTouchedFields(new Set())
  }, [])

  return {
    markFieldAsTouched,
    isFieldTouched,
    resetTouchedFields,
  }
}

// Hook for async form validation
export function useAsyncValidation() {
  const [validatingFields, setValidatingFields] = useState<Set<string>>(new Set())

  const startFieldValidation = useCallback((fieldName: string) => {
    setValidatingFields(prev => new Set(prev).add(fieldName))
  }, [])

  const endFieldValidation = useCallback((fieldName: string) => {
    setValidatingFields(prev => {
      const newSet = new Set(prev)
      newSet.delete(fieldName)
      return newSet
    })
  }, [])

  const isFieldValidating = useCallback((fieldName: string) => {
    return validatingFields.has(fieldName)
  }, [validatingFields])

  return {
    startFieldValidation,
    endFieldValidation,
    isFieldValidating,
  }
}

// Hook for form persistence (save draft)
export function useFormPersistence<T extends FieldValues>(
  key: string,
  defaultValues: T
) {
  const getPersistedData = useCallback((): Partial<T> | null => {
    if (typeof window === 'undefined') return null

    try {
      const stored = localStorage.getItem(`form_draft_${key}`)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  }, [key])

  const persistData = useCallback((data: Partial<T>) => {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(`form_draft_${key}`, JSON.stringify(data))
    } catch (error) {
      console.warn('Failed to persist form data:', error)
    }
  }, [key])

  const clearPersistedData = useCallback(() => {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(`form_draft_${key}`)
    } catch (error) {
      console.warn('Failed to clear persisted form data:', error)
    }
  }, [key])

  const getInitialValues = useCallback((): T => {
    const persisted = getPersistedData()
    return persisted ? { ...defaultValues, ...persisted } : defaultValues
  }, [defaultValues, getPersistedData])

  return {
    getPersistedData,
    persistData,
    clearPersistedData,
    getInitialValues,
  }
}
