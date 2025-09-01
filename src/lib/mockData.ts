// Mock data for Project Management Dashboard

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Manager' | 'Developer' | 'Designer' | 'QA';
  status: 'online' | 'offline' | 'away';
  department: string;
  joinDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  owner: User;
  status: 'Planning' | 'Active' | 'On Hold' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  progress: number; // 0-100
  startDate: string;
  deadline: string;
  budget: number;
  team: User[];
  tasks: Task[];
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignee: User;
  projectId: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  user: User;
  action: string;
  target: string;
  targetType: 'project' | 'task' | 'user';
  timestamp: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'Admin',
    status: 'online',
    department: 'Engineering',
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    role: 'Manager',
    status: 'online',
    department: 'Product',
    joinDate: '2022-08-20'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    role: 'Developer',
    status: 'away',
    department: 'Engineering',
    joinDate: '2023-03-10'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    role: 'Designer',
    status: 'online',
    department: 'Design',
    joinDate: '2022-11-05'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    role: 'QA',
    status: 'offline',
    department: 'Quality Assurance',
    joinDate: '2023-05-22'
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    role: 'Developer',
    status: 'online',
    department: 'Engineering',
    joinDate: '2023-07-01'
  },
  {
    id: '7',
    name: 'Anna Martinez',
    email: 'anna.martinez@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    role: 'Designer',
    status: 'online',
    department: 'Design',
    joinDate: '2023-09-15'
  },
  {
    id: '8',
    name: 'Robert Taylor',
    email: 'robert.taylor@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    role: 'Manager',
    status: 'away',
    department: 'Marketing',
    joinDate: '2022-12-08'
  }
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design new user dashboard',
    description: 'Create wireframes and mockups for the new user dashboard interface',
    status: 'In Progress',
    priority: 'High',
    assignee: mockUsers[3],
    projectId: '1',
    dueDate: '2024-01-25',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T14:30:00Z',
    estimatedHours: 24,
    actualHours: 18,
    tags: ['UI/UX', 'Design'],
    comments: [
      {
        id: '1',
        user: mockUsers[1],
        content: 'Looking good! Can we add more spacing between elements?',
        createdAt: '2024-01-15T11:20:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Implement authentication system',
    description: 'Set up user authentication with JWT tokens and secure routes',
    status: 'Review',
    priority: 'Critical',
    assignee: mockUsers[2],
    projectId: '1',
    dueDate: '2024-01-22',
    createdAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-20T16:45:00Z',
    estimatedHours: 32,
    actualHours: 28,
    tags: ['Backend', 'Security'],
    comments: []
  },
  {
    id: '3',
    title: 'Write unit tests for API endpoints',
    description: 'Create comprehensive unit tests for all REST API endpoints',
    status: 'To Do',
    priority: 'Medium',
    assignee: mockUsers[4],
    projectId: '1',
    dueDate: '2024-01-30',
    createdAt: '2024-01-12T13:15:00Z',
    updatedAt: '2024-01-12T13:15:00Z',
    estimatedHours: 16,
    actualHours: 0,
    tags: ['Testing', 'Backend'],
    comments: []
  },
  {
    id: '4',
    title: 'Mobile responsive design',
    description: 'Ensure all components are fully responsive on mobile devices',
    status: 'Done',
    priority: 'Medium',
    assignee: mockUsers[3],
    projectId: '2',
    dueDate: '2024-01-20',
    createdAt: '2024-01-05T08:30:00Z',
    updatedAt: '2024-01-19T17:00:00Z',
    estimatedHours: 20,
    actualHours: 22,
    tags: ['Frontend', 'Mobile'],
    comments: []
  },
  {
    id: '5',
    title: 'Database optimization',
    description: 'Optimize database queries and add proper indexing',
    status: 'In Progress',
    priority: 'High',
    assignee: mockUsers[5],
    projectId: '2',
    dueDate: '2024-01-28',
    createdAt: '2024-01-14T09:45:00Z',
    updatedAt: '2024-01-18T12:20:00Z',
    estimatedHours: 25,
    actualHours: 15,
    tags: ['Database', 'Performance'],
    comments: [
      {
        id: '2',
        user: mockUsers[1],
        content: 'Great progress on the query optimization!',
        createdAt: '2024-01-16T10:30:00Z'
      }
    ]
  },
  {
    id: '6',
    title: 'User feedback integration',
    description: 'Integrate user feedback system into the application',
    status: 'To Do',
    priority: 'Low',
    assignee: mockUsers[6],
    projectId: '3',
    dueDate: '2024-02-05',
    createdAt: '2024-01-16T14:00:00Z',
    updatedAt: '2024-01-16T14:00:00Z',
    estimatedHours: 12,
    actualHours: 0,
    tags: ['Frontend', 'UX'],
    comments: []
  },
  {
    id: '7',
    title: 'Marketing campaign setup',
    description: 'Set up marketing campaign tracking and analytics',
    status: 'Done',
    priority: 'Medium',
    assignee: mockUsers[7],
    projectId: '3',
    dueDate: '2024-01-18',
    createdAt: '2024-01-10T11:30:00Z',
    updatedAt: '2024-01-17T15:45:00Z',
    estimatedHours: 18,
    actualHours: 16,
    tags: ['Marketing', 'Analytics'],
    comments: []
  },
  {
    id: '8',
    title: 'Security audit and fixes',
    description: 'Perform security audit and fix identified vulnerabilities',
    status: 'Review',
    priority: 'Critical',
    assignee: mockUsers[2],
    projectId: '1',
    dueDate: '2024-01-26',
    createdAt: '2024-01-13T16:20:00Z',
    updatedAt: '2024-01-21T13:10:00Z',
    estimatedHours: 30,
    actualHours: 26,
    tags: ['Security', 'Audit'],
    comments: []
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'Complete e-commerce solution with payment integration and inventory management',
    owner: mockUsers[1],
    status: 'Active',
    priority: 'High',
    progress: 65,
    startDate: '2024-01-01',
    deadline: '2024-03-15',
    budget: 150000,
    team: [mockUsers[1], mockUsers[2], mockUsers[3], mockUsers[4], mockUsers[5]],
    tasks: mockTasks.filter(task => task.projectId === '1'),
    tags: ['E-commerce', 'Payment', 'Frontend', 'Backend']
  },
  {
    id: '2',
    name: 'Mobile App Redesign',
    description: 'Redesign mobile application with modern UI/UX and improved performance',
    owner: mockUsers[1],
    status: 'Active',
    priority: 'Medium',
    progress: 45,
    startDate: '2024-01-08',
    deadline: '2024-02-28',
    budget: 85000,
    team: [mockUsers[3], mockUsers[4], mockUsers[5], mockUsers[6]],
    tasks: mockTasks.filter(task => task.projectId === '2'),
    tags: ['Mobile', 'UI/UX', 'Performance']
  },
  {
    id: '3',
    name: 'Analytics Dashboard',
    description: 'Build comprehensive analytics dashboard for business intelligence',
    owner: mockUsers[7],
    status: 'Planning',
    priority: 'Medium',
    progress: 20,
    startDate: '2024-01-20',
    deadline: '2024-04-10',
    budget: 120000,
    team: [mockUsers[7], mockUsers[6], mockUsers[1], mockUsers[2]],
    tasks: mockTasks.filter(task => task.projectId === '3'),
    tags: ['Analytics', 'Dashboard', 'Business Intelligence']
  },
  {
    id: '4',
    name: 'API Gateway Migration',
    description: 'Migrate legacy API gateway to modern microservices architecture',
    owner: mockUsers[2],
    status: 'On Hold',
    priority: 'High',
    progress: 30,
    startDate: '2024-01-15',
    deadline: '2024-05-20',
    budget: 200000,
    team: [mockUsers[2], mockUsers[5], mockUsers[0], mockUsers[3]],
    tasks: [],
    tags: ['Microservices', 'API', 'Migration']
  },
  {
    id: '5',
    name: 'Customer Support Portal',
    description: 'Build customer support portal with ticketing system and knowledge base',
    owner: mockUsers[1],
    status: 'Completed',
    priority: 'Medium',
    progress: 100,
    startDate: '2023-11-01',
    deadline: '2024-01-15',
    budget: 95000,
    team: [mockUsers[1], mockUsers[6], mockUsers[4], mockUsers[7]],
    tasks: [],
    tags: ['Support', 'Ticketing', 'Knowledge Base']
  }
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: '1',
    user: mockUsers[2],
    action: 'completed task',
    target: 'Security audit and fixes',
    targetType: 'task',
    timestamp: '2024-01-21T13:10:00Z'
  },
  {
    id: '2',
    user: mockUsers[3],
    action: 'created new task',
    target: 'Design new user dashboard',
    targetType: 'task',
    timestamp: '2024-01-20T09:15:00Z'
  },
  {
    id: '3',
    user: mockUsers[1],
    action: 'updated project',
    target: 'E-Commerce Platform',
    targetType: 'project',
    timestamp: '2024-01-19T16:30:00Z'
  },
  {
    id: '4',
    user: mockUsers[7],
    action: 'completed task',
    target: 'Marketing campaign setup',
    targetType: 'task',
    timestamp: '2024-01-18T15:45:00Z'
  },
  {
    id: '5',
    user: mockUsers[5],
    action: 'started working on',
    target: 'Database optimization',
    targetType: 'task',
    timestamp: '2024-01-18T12:20:00Z'
  },
  {
    id: '6',
    user: mockUsers[4],
    action: 'added comment to',
    target: 'Write unit tests for API endpoints',
    targetType: 'task',
    timestamp: '2024-01-17T10:30:00Z'
  }
];

// Statistics for dashboard
export const dashboardStats = {
  totalProjects: mockProjects.length,
  activeProjects: mockProjects.filter(p => p.status === 'Active').length,
  completedTasks: mockTasks.filter(t => t.status === 'Done').length,
  totalTasks: mockTasks.length,
  teamMembers: mockUsers.length,
  onTrackProjects: mockProjects.filter(p => p.progress >= 50).length,
  overdueTasks: mockTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Done').length
};

// Chart data for dashboard
export const taskCompletionData = [
  { month: 'Jan', completed: 12, total: 15 },
  { month: 'Feb', completed: 8, total: 12 },
  { month: 'Mar', completed: 15, total: 18 },
  { month: 'Apr', completed: 10, total: 14 },
  { month: 'May', completed: 18, total: 20 },
  { month: 'Jun', completed: 22, total: 25 }
];

export const projectStatusData = [
  { name: 'Active', value: mockProjects.filter(p => p.status === 'Active').length, color: '#6366f1' },
  { name: 'Planning', value: mockProjects.filter(p => p.status === 'Planning').length, color: '#f59e0b' },
  { name: 'On Hold', value: mockProjects.filter(p => p.status === 'On Hold').length, color: '#6b7280' },
  { name: 'Completed', value: mockProjects.filter(p => p.status === 'Completed').length, color: '#22c55e' }
];

export const taskPriorityData = [
  { name: 'Low', value: mockTasks.filter(t => t.priority === 'Low').length, color: '#22c55e' },
  { name: 'Medium', value: mockTasks.filter(t => t.priority === 'Medium').length, color: '#f59e0b' },
  { name: 'High', value: mockTasks.filter(t => t.priority === 'High').length, color: '#f97316' },
  { name: 'Critical', value: mockTasks.filter(t => t.priority === 'Critical').length, color: '#ef4444' }
];
