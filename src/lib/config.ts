/**
 * Environment configuration utility
 * Provides type-safe access to environment variables
 */

interface AppConfig {
  // Application
  appName: string
  appUrl: string
  appVersion: string

  // API
  apiUrl: string
  apiTimeout: number

  // Feature Flags
  enableNotifications: boolean
  enableFileUploads: boolean
  enableComments: boolean
  enableTimeTracking: boolean
  enableCalendarView: boolean

  // Development
  debugMode: boolean
  logLevel: string

  // File Upload
  maxFileSize: number
  allowedFileTypes: string[]
  uploadPath: string
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key]
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is required but not set`)
  }
  return value || defaultValue!
}

function getEnvBool(key: string, defaultValue: boolean = false): boolean {
  const value = process.env[key]?.toLowerCase()
  if (value === undefined) return defaultValue
  return value === 'true' || value === '1' || value === 'yes'
}

function getEnvNumber(key: string, defaultValue: number): number {
  const value = process.env[key]
  if (value === undefined) return defaultValue
  const parsed = parseInt(value, 10)
  return isNaN(parsed) ? defaultValue : parsed
}

function getEnvArray(key: string, defaultValue: string[] = []): string[] {
  const value = process.env[key]
  if (value === undefined) return defaultValue
  return value.split(',').map(item => item.trim())
}

export const config: AppConfig = {
  // Application
  appName: getEnvVar('NEXT_PUBLIC_APP_NAME', 'ProjectFlow'),
  appUrl: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  appVersion: getEnvVar('NEXT_PUBLIC_APP_VERSION', '1.0.0'),

  // API
  apiUrl: getEnvVar('NEXT_PUBLIC_API_URL', 'http://localhost:3001/api'),
  apiTimeout: getEnvNumber('NEXT_PUBLIC_API_TIMEOUT', 30000),

  // Feature Flags
  enableNotifications: getEnvBool('NEXT_PUBLIC_ENABLE_NOTIFICATIONS', true),
  enableFileUploads: getEnvBool('NEXT_PUBLIC_ENABLE_FILE_UPLOADS', true),
  enableComments: getEnvBool('NEXT_PUBLIC_ENABLE_COMMENTS', true),
  enableTimeTracking: getEnvBool('NEXT_PUBLIC_ENABLE_TIME_TRACKING', true),
  enableCalendarView: getEnvBool('NEXT_PUBLIC_ENABLE_CALENDAR_VIEW', true),

  // Development
  debugMode: getEnvBool('NEXT_PUBLIC_DEBUG_MODE', false),
  logLevel: getEnvVar('NEXT_PUBLIC_LOG_LEVEL', 'info'),

  // File Upload
  maxFileSize: getEnvNumber('NEXT_PUBLIC_MAX_FILE_SIZE', 10485760), // 10MB
  allowedFileTypes: getEnvArray('NEXT_PUBLIC_ALLOWED_FILE_TYPES', [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf'
  ]),
  uploadPath: getEnvVar('NEXT_PUBLIC_UPLOAD_PATH', '/uploads'),
}

// Validation function to ensure required environment variables are set
export function validateConfig(): void {
  const requiredVars = [
    'NEXT_PUBLIC_APP_NAME',
    'NEXT_PUBLIC_APP_URL',
  ]

  const missingVars = requiredVars.filter(varName => !process.env[varName])

  if (missingVars.length > 0) {
    console.warn(`Missing environment variables: ${missingVars.join(', ')}`)
    console.warn('Using default values. Consider setting these in your .env file.')
  }

  if (config.debugMode) {
    console.log('🔧 Configuration loaded:', config)
  }
}

// Export individual config values for convenience
export const {
  appName,
  appUrl,
  appVersion,
  apiUrl,
  apiTimeout,
  enableNotifications,
  enableFileUploads,
  enableComments,
  enableTimeTracking,
  enableCalendarView,
  debugMode,
  logLevel,
  maxFileSize,
  allowedFileTypes,
  uploadPath,
} = config
