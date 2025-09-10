/**
 * Error handling utilities and types
 */

export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export interface AppError {
  type: ErrorType
  message: string
  code?: string | number
  details?: any
  timestamp: Date
  stack?: string
}

export class ApplicationError extends Error implements AppError {
  public readonly type: ErrorType
  public readonly code?: string | number
  public readonly details?: any
  public readonly timestamp: Date

  constructor(
    type: ErrorType,
    message: string,
    code?: string | number,
    details?: any
  ) {
    super(message)
    this.name = 'ApplicationError'
    this.type = type
    this.code = code
    this.details = details
    this.timestamp = new Date()

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApplicationError)
    }
  }
}

// Specific error classes
export class NetworkError extends ApplicationError {
  constructor(message: string = 'Network request failed', details?: any) {
    super(ErrorType.NETWORK, message, undefined, details)
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, field?: string, details?: any) {
    super(ErrorType.VALIDATION, message, undefined, { field, ...details })
  }
}

export class AuthenticationError extends ApplicationError {
  constructor(message: string = 'Authentication failed') {
    super(ErrorType.AUTHENTICATION, message)
  }
}

export class AuthorizationError extends ApplicationError {
  constructor(message: string = 'Access denied') {
    super(ErrorType.AUTHORIZATION, message)
  }
}

export class NotFoundError extends ApplicationError {
  constructor(resource: string = 'Resource') {
    super(ErrorType.NOT_FOUND, `${resource} not found`)
  }
}

export class ServerError extends ApplicationError {
  constructor(message: string = 'Internal server error', code?: number) {
    super(ErrorType.SERVER, message, code)
  }
}

// Error handling utilities
export function isAppError(error: any): error is AppError {
  return error && typeof error === 'object' && 'type' in error && 'timestamp' in error
}

export function createErrorFromResponse(response: Response): ApplicationError {
  switch (response.status) {
    case 400:
      return new ValidationError('Bad request')
    case 401:
      return new AuthenticationError('Unauthorized')
    case 403:
      return new AuthorizationError('Forbidden')
    case 404:
      return new NotFoundError('Resource')
    case 500:
    case 502:
    case 503:
    case 504:
      return new ServerError('Server error', response.status)
    default:
      return new ApplicationError(ErrorType.UNKNOWN, `HTTP ${response.status}: ${response.statusText}`)
  }
}

export function createErrorFromUnknown(error: unknown): ApplicationError {
  if (isAppError(error)) {
    return error
  }

  if (error instanceof Error) {
    // Check for common error types
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return new NetworkError(error.message)
    }
    if (error.message.includes('auth') || error.message.includes('login')) {
      return new AuthenticationError(error.message)
    }

    return new ApplicationError(ErrorType.UNKNOWN, error.message, undefined, { originalError: error.message })
  }

  return new ApplicationError(ErrorType.UNKNOWN, 'An unexpected error occurred', undefined, { originalError: error })
}

// Error logging utility
export function logError(error: AppError | Error, context?: string): void {
  const errorInfo = {
    message: error.message,
    type: isAppError(error) ? error.type : 'UNKNOWN',
    code: isAppError(error) ? error.code : undefined,
    timestamp: isAppError(error) ? error.timestamp : new Date(),
    stack: error.stack,
    context,
  }

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('🚨 Error:', errorInfo)
  }

  // In production, you might want to send to an error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: send to error tracking service
    // errorTrackingService.captureException(error, { extra: errorInfo })
    console.error('🚨 Production Error:', errorInfo)
  }
}

// Retry utility for network requests
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error

      if (attempt === maxRetries) {
        break
      }

      // Exponential backoff
      const waitTime = delay * Math.pow(2, attempt)
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
  }

  throw lastError!
}
