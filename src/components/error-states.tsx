'use client'

import React from 'react'
import { AlertTriangle, Wifi, RefreshCw, AlertCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ErrorType } from '@/lib/errors'

interface ErrorStateProps {
  type?: ErrorType
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  type = ErrorType.UNKNOWN,
  title,
  message,
  onRetry,
  className = '',
}) => {
  const getErrorConfig = (type: ErrorType) => {
    switch (type) {
      case ErrorType.NETWORK:
        return {
          icon: <Wifi className="h-5 w-5" />,
          title: title || 'Connection Error',
          message: message || 'Unable to connect to the server. Please check your internet connection.',
          variant: 'destructive' as const,
        }
      case ErrorType.VALIDATION:
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          title: title || 'Validation Error',
          message: message || 'Please check your input and try again.',
          variant: 'destructive' as const,
        }
      case ErrorType.AUTHENTICATION:
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          title: title || 'Authentication Required',
          message: message || 'Please sign in to continue.',
          variant: 'destructive' as const,
        }
      case ErrorType.AUTHORIZATION:
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          title: title || 'Access Denied',
          message: message || 'You do not have permission to perform this action.',
          variant: 'destructive' as const,
        }
      case ErrorType.NOT_FOUND:
        return {
          icon: <Info className="h-5 w-5" />,
          title: title || 'Not Found',
          message: message || 'The requested resource could not be found.',
          variant: 'default' as const,
        }
      case ErrorType.SERVER:
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          title: title || 'Server Error',
          message: message || 'Something went wrong on our end. Please try again later.',
          variant: 'destructive' as const,
        }
      default:
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          title: title || 'Something went wrong',
          message: message || 'An unexpected error occurred. Please try again.',
          variant: 'destructive' as const,
        }
    }
  }

  const config = getErrorConfig(type)

  return (
    <Alert variant={config.variant} className={className}>
      {config.icon}
      <AlertTitle>{config.title}</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>{config.message}</span>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="ml-4"
          >
            <RefreshCw className="mr-2 h-3 w-3" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}

// Inline error for form fields
export const FieldError: React.FC<{
  error?: string
  className?: string
}> = ({ error, className = '' }) => {
  if (!error) return null

  return (
    <p className={`text-sm text-destructive mt-1 ${className}`}>
      {error}
    </p>
  )
}

// Toast notification error
export const ErrorToast: React.FC<{
  title: string
  message?: string
  onClose?: () => void
}> = ({ title, message, onClose }) => (
  <div className="p-4 border border-destructive/20 rounded-md bg-destructive/5">
    <div className="flex items-start space-x-3">
      <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
      <div className="flex-1">
        <h4 className="text-sm font-medium text-destructive">{title}</h4>
        {message && (
          <p className="text-sm text-destructive/80 mt-1">{message}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-destructive/60 hover:text-destructive"
        >
          ×
        </button>
      )}
    </div>
  </div>
)

// Full page error state
export const PageError: React.FC<{
  title?: string
  message?: string
  onRetry?: () => void
  onGoBack?: () => void
}> = ({
  title = 'Something went wrong',
  message = 'We encountered an unexpected error. Please try again.',
  onRetry,
  onGoBack
}) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
    <div className="text-center space-y-4">
      <div className="mx-auto p-4 bg-destructive/10 rounded-full w-fit">
        <AlertTriangle className="h-12 w-12 text-destructive" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-muted-foreground max-w-md">{message}</p>
      </div>
      <div className="flex gap-2">
        {onRetry && (
          <Button onClick={onRetry}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
        {onGoBack && (
          <Button variant="outline" onClick={onGoBack}>
            Go Back
          </Button>
        )}
      </div>
    </div>
  </div>
)

// Empty state with error context
export const EmptyErrorState: React.FC<{
  title?: string
  message?: string
  icon?: React.ReactNode
  onRetry?: () => void
}> = ({
  title = 'No data available',
  message = 'We encountered an issue loading the data.',
  icon = <AlertTriangle className="h-8 w-8 text-muted-foreground" />,
  onRetry
}) => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <div className="text-center space-y-4">
      <div className="mx-auto p-3 bg-muted rounded-full w-fit">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-muted-foreground max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  </div>
)
