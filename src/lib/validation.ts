import { z } from 'zod'

// Common validation patterns
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// Project validation schema
export const projectSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name is required')
    .min(3, 'Project name must be at least 3 characters')
    .max(100, 'Project name must be less than 100 characters'),

  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),

  priority: z.enum(['Low', 'Medium', 'High', 'Critical'], {
    errorMap: () => ({ message: 'Please select a valid priority level' }),
  }),

  status: z.enum(['Planning', 'Active', 'On Hold', 'Completed', 'Cancelled']).optional(),

  deadline: z
    .string()
    .optional()
    .refine(
      (date) => !date || new Date(date) > new Date(),
      'Deadline must be in the future'
    ),

  budget: z
    .number()
    .min(0, 'Budget must be a positive number')
    .max(10000000, 'Budget cannot exceed $10,000,000')
    .optional(),

  team: z.array(z.string()).optional(),
})

export type ProjectFormData = z.infer<typeof projectSchema>

// Task validation schema
export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Task title is required')
    .min(3, 'Task title must be at least 3 characters')
    .max(200, 'Task title must be less than 200 characters'),

  description: z
    .string()
    .min(1, 'Description is required')
    .min(5, 'Description must be at least 5 characters')
    .max(2000, 'Description must be less than 2000 characters'),

  priority: z.enum(['Low', 'Medium', 'High', 'Critical'], {
    errorMap: () => ({ message: 'Please select a valid priority level' }),
  }),

  status: z.enum(['To Do', 'In Progress', 'Review', 'Done']).optional(),

  projectId: z
    .string()
    .min(1, 'Please select a project'),

  assignee: z
    .string()
    .min(1, 'Please assign this task to someone'),

  dueDate: z
    .string()
    .optional()
    .refine(
      (date) => !date || new Date(date) > new Date(),
      'Due date must be in the future'
    ),

  estimatedHours: z
    .number()
    .min(0.5, 'Estimated hours must be at least 0.5')
    .max(1000, 'Estimated hours cannot exceed 1000')
    .optional(),

  actualHours: z
    .number()
    .min(0, 'Actual hours cannot be negative')
    .optional(),

  tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').optional(),
})

export type TaskFormData = z.infer<typeof taskSchema>

// User/Team member validation schema
export const userSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  role: z.enum(['Admin', 'Manager', 'Developer', 'Designer', 'QA'], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),

  department: z.enum([
    'Engineering',
    'Design',
    'Product',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'Operations'
  ], {
    errorMap: () => ({ message: 'Please select a valid department' }),
  }),

  phone: z
    .string()
    .optional()
    .refine(
      (phone) => !phone || /^\+?[\d\s\-\(\)]{10,}$/.test(phone),
      'Please enter a valid phone number'
    ),

  avatar: z.string().url().optional(),
})

export type UserFormData = z.infer<typeof userSchema>

// Login validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Registration validation schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(passwordPattern, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),

  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type RegisterFormData = z.infer<typeof registerSchema>

// Password change validation schema
export const passwordChangeSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Current password is required'),

  newPassword: z
    .string()
    .min(1, 'New password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(passwordPattern, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),

  confirmPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>

// Profile update validation schema
export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  bio: z
    .string()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),

  phone: z
    .string()
    .optional()
    .refine(
      (phone) => !phone || /^\+?[\d\s\-\(\)]{10,}$/.test(phone),
      'Please enter a valid phone number'
    ),

  location: z
    .string()
    .max(100, 'Location must be less than 100 characters')
    .optional(),
})

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>

// Comment validation schema
export const commentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment cannot be empty')
    .min(2, 'Comment must be at least 2 characters')
    .max(1000, 'Comment must be less than 1000 characters'),
})

export type CommentFormData = z.infer<typeof commentSchema>

// Search validation schema
export const searchSchema = z.object({
  query: z
    .string()
    .max(100, 'Search query must be less than 100 characters'),
})

export type SearchFormData = z.infer<typeof searchSchema>

// File upload validation schema
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'].includes(file.type),
      'File must be a JPEG, PNG, GIF, WebP, or PDF'
    ),
})

export type FileUploadFormData = z.infer<typeof fileUploadSchema>

// Utility function to format validation errors
export function formatValidationErrors(error: any): Record<string, string> {
  if (!error?.issues) return {}

  return error.issues.reduce((acc: Record<string, string>, issue: any) => {
    acc[issue.path[0]] = issue.message
    return acc
  }, {})
}

// Utility function to get field error message
export function getFieldError(errors: any, field: string): string | undefined {
  return errors?.[field]?.message
}
