# ProjectFlow - Project Management Dashboard

A modern, production-ready project management dashboard built with Next.js 14, TypeScript, TailwindCSS, and ShadCN UI.

![ProjectFlow Dashboard](https://img.shields.io/badge/ProjectFlow-Dashboard-blue?style=for-the-badge&logo=next.js)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css)

## 🚀 Features

### Core Functionality
- **Dashboard Home**: Overview cards, interactive charts, and recent activity feed
- **Projects Management**: Create, view, search, and filter projects with detailed information
- **Tasks Kanban Board**: Drag-and-drop Kanban board with task management
- **Teams Overview**: Team member management with status indicators and statistics
- **Settings Panel**: Profile management, notifications, appearance, and security settings

### Technical Features
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Complete theme switching with system preference detection
- **Smooth Animations**: Framer Motion animations throughout the application
- **Modern UI**: Clean, professional design with ShadCN UI components
- **TypeScript**: Full type safety and excellent developer experience
- **Mock Data**: Comprehensive mock data for development and demonstration

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom design system
- **UI Components**: ShadCN UI
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Theme**: Custom color scheme (Indigo primary, Emerald success, Amber warnings)

## 🎨 Design System

### Colors
- **Primary**: Indigo (#6366f1)
- **Success**: Emerald (#22c55e)
- **Warning**: Amber (#f59e0b)
- **Neutral**: Slate (#1e293b, #334155)

### Features
- Solar-inspired branding for the login page
- Consistent spacing and typography
- Accessible color contrasts
- Smooth hover states and transitions
- Professional card-based layouts

## 📂 Project Structure

```
project-management-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── login/             # Login page
│   │   ├── projects/          # Projects page
│   │   ├── tasks/             # Tasks page
│   │   ├── teams/             # Teams page
│   │   ├── settings/          # Settings page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Dashboard home
│   ├── components/            # Reusable components
│   │   ├── ui/                # ShadCN UI components
│   │   ├── layout/            # Layout components (Navbar, Sidebar)
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── charts/            # Chart components
│   │   ├── tasks/             # Task-related components
│   │   └── projects/          # Project-related components
│   ├── lib/                   # Utilities and data
│   │   ├── mockData.ts        # Mock data for the application
│   │   └── utils.ts           # Utility functions
│   └── hooks/                 # Custom React hooks
├── public/                    # Static assets
└── package.json              # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-management-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages Overview

### 1. Login Page (`/login`)
- Solar-inspired design with animated background
- Email/password form with validation
- Demo credentials hint (any email/password works)

### 2. Dashboard Home (`/`)
- Overview statistics cards
- Interactive charts (task completion trends, project status)
- Recent activity feed
- Quick actions panel

### 3. Projects Page (`/projects`)
- Project grid/list view toggle
- Search and filter functionality
- Create new project modal
- Project cards with progress indicators
- Detailed project information

### 4. Tasks Page (`/tasks`)
- Kanban board with drag-and-drop
- Task cards with priority indicators
- Search and filter options
- Create new task modal
- Both Kanban and list view modes

### 5. Teams Page (`/teams`)
- Team member overview with status indicators
- Statistics dashboard
- Member table with detailed information
- Role and department filtering

### 6. Settings Page (`/settings`)
- Profile management
- Notification preferences
- Theme switching (light/dark mode)
- Security settings

## 🎯 Key Components

### Layout Components
- **Navbar**: Top navigation with search, notifications, and user menu
- **Sidebar**: Collapsible navigation with smooth animations
- **DashboardLayout**: Main layout wrapper with responsive behavior

### Dashboard Components
- **OverviewCards**: Statistics cards with trend indicators
- **TaskCompletionChart**: Line chart for task completion trends
- **ProjectStatusChart**: Pie chart for project status distribution
- **ActivityFeed**: Recent activity timeline

### Task Components
- **TaskCard**: Reusable task card with priority and status indicators
- **Kanban Board**: Drag-and-drop task management

### Project Components
- **ProjectCard**: Project overview with progress and team information

## 🔧 Customization

### Colors
Update the color scheme in `src/app/globals.css`:
```css
--primary: oklch(0.608 0.222 266.659); /* Indigo */
--success: oklch(0.723 0.219 142.496); /* Emerald */
--warning: oklch(0.795 0.184 84.429); /* Amber */
```

### Mock Data
Modify mock data in `src/lib/mockData.ts` to customize:
- User profiles and avatars
- Project information and progress
- Task details and assignments
- Team member data

### Components
All components are modular and reusable. Customize individual components in their respective directories.

## 📱 Responsive Design

The dashboard is fully responsive with:
- **Desktop**: Full feature set with expanded sidebar
- **Tablet**: Collapsed sidebar, adjusted grid layouts
- **Mobile**: Single column layouts, bottom navigation, touch-friendly interactions

## 🎨 Animations

Smooth animations powered by Framer Motion:
- Page transitions
- Component hover states
- Loading states
- Modal animations
- Drag-and-drop interactions

## 🔐 Authentication

The login page includes:
- Form validation
- Loading states
- Solar-inspired branding
- Responsive design
- Demo mode (accepts any credentials)

## 📊 Charts and Analytics

Interactive charts using Recharts:
- Task completion trends (line chart)
- Project status distribution (pie chart)
- Priority distribution (bar charts)
- Customizable color schemes

## 🏗️ Production Ready Features

- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Responsive**: Mobile-first design
- **Accessible**: WCAG compliant colors and interactions
- **Performance**: Optimized bundle size
- **SEO**: Proper meta tags and structure

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
The application can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Digital Ocean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Next.js** for the amazing framework
- **ShadCN UI** for beautiful components
- **TailwindCSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Recharts** for data visualization
- **React Icons** for comprehensive icon set

---

Built with ❤️ using Next.js 14 and modern web technologies.

**Demo**: Visit [http://localhost:3000](http://localhost:3000) after running `npm run dev`#   p r o j e c t - m a n a g e m e n t - a p p  
 