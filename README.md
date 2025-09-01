# ProjectFlow - Project Management Dashboard

A modern, responsive project management dashboard built with Next.js, TypeScript, and Tailwind CSS. ProjectFlow provides an intuitive interface for managing projects, tasks, teams, and analytics in one comprehensive platform.

![ProjectFlow Dashboard](https://img.shields.io/badge/ProjectFlow-Dashboard-blue?style=for-the-badge&logo=next.js)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📊 Dashboard Overview
- **Real-time Analytics**: View project progress, task completion rates, and team performance
- **Quick Actions**: Create projects, tasks, and add team members with modal dialogs
- **Activity Feed**: Track recent activities and updates across all projects
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🚀 Project Management
- **Project Creation**: Create new projects with detailed information (name, description, priority, deadline, budget)
- **Project Cards**: Visual project cards with progress indicators, team avatars, and status badges
- **Project Status Tracking**: Monitor project status (Planning, Active, On Hold, Completed, Cancelled)
- **Priority Management**: Set and track project priorities (Low, Medium, High, Critical)

### 📋 Task Management
- **Kanban Board**: Drag-and-drop task management with visual columns
- **Task Creation**: Create tasks with assignments, due dates, and priority levels
- **Task Status**: Track task progress (To Do, In Progress, Review, Done)
- **List View**: Alternative list view for detailed task management

### 👥 Team Management
- **Team Dashboard**: Comprehensive team overview with member statistics
- **Member Profiles**: View team member details, roles, and task assignments
- **Role Management**: Assign and manage team member roles (Admin, Manager, Developer, Designer, QA)
- **Department Organization**: Organize teams by departments

### ⚙️ Settings & Configuration
- **Profile Management**: Update personal information and avatar
- **Notification Preferences**: Customize email and in-app notifications
- **Appearance Settings**: Toggle dark mode and customize theme colors
- **Security Settings**: Password management and two-factor authentication setup

### 📈 Analytics & Reporting
- **Task Completion Charts**: Visual representation of task completion trends
- **Project Status Distribution**: Overview of project status across the organization
- **Team Performance Metrics**: Track team productivity and task completion rates
- **Quick Statistics**: Real-time stats for weekly and monthly performance

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons

### UI Components
- **shadcn/ui**: Modern, accessible component library
- **Radix UI**: Unstyled, accessible UI primitives
- **React Hook Form**: Performant forms with easy validation

### Development Tools
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **PostCSS**: CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/project-management-dashboard.git
   cd project-management-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
project-management-dashboard/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── analytics/     # Analytics page
│   │   ├── login/         # Login page
│   │   ├── projects/      # Projects page
│   │   ├── settings/      # Settings page
│   │   ├── tasks/         # Tasks page
│   │   ├── teams/         # Teams page
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Dashboard home page
│   ├── components/        # Reusable components
│   │   ├── charts/        # Chart components
│   │   ├── dashboard/     # Dashboard-specific components
│   │   ├── layout/       # Layout components
│   │   ├── projects/     # Project-related components
│   │   ├── tasks/        # Task-related components
│   │   └── ui/           # UI components (shadcn/ui)
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions and mock data
├── components.json       # shadcn/ui configuration
├── next.config.ts        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (`from-blue-600 to-indigo-600`)
- **Success**: Green (`text-green-600`)
- **Warning**: Yellow/Orange (`text-yellow-600`, `text-orange-600`)
- **Error**: Red (`text-red-600`)
- **Muted**: Gray (`text-muted-foreground`)

### Typography
- **Headings**: Inter font family with various weights
- **Body**: System font stack for optimal readability
- **Code**: Monospace font for technical content

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Modals**: Centered dialogs with backdrop blur
- **Forms**: Clean, accessible form controls

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS with custom configuration for:
- Custom color palette
- Extended spacing scale
- Custom animations
- Dark mode support

### shadcn/ui Components
Components are configured through `components.json`:
- Custom color scheme
- Border radius preferences
- Typography settings
- Animation configurations

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Touch-friendly buttons and controls
- Swipe gestures for navigation
- Optimized layouts for small screens
- Collapsible sidebar navigation

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Write meaningful component names
- Add proper JSDoc comments
- Ensure responsive design
- Test on multiple devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Made with ❤️ by the ProjectFlow Team**