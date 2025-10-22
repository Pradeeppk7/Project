# AI Learning Companion

An intelligent, agentic tutoring platform designed to help instructors create structured, AI-assisted courses and allow students to learn adaptively through contextual tutoring.

## Features

- **Authentication System**: Role-based login and signup (Instructor/Student)
- **Route Protection**: Guards for instructor and student specific paths
- **Modern UI**: Consistent design system with Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful gradients
- **Mock Authentication**: Demo credentials for testing

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

### Instructor
- Email: `instructor@example.com`
- Password: `password`

### Student
- Email: `student@example.com`
- Password: `password`

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── dashboard/         # Instructor dashboard
│   └── student-dashboard/ # Student dashboard
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── auth/             # Authentication components
├── store/                # Zustand state management
├── types/                # TypeScript type definitions
└── styles/               # Global styles and Tailwind config
```

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Class Variance Authority** - Component variant management

## Design System

The application uses a comprehensive design system with:

- **Colors**: Primary (blue), Secondary (gray), Accent (purple), Success, Warning, Error
- **Typography**: Inter font family with consistent sizing
- **Spacing**: Consistent spacing scale
- **Components**: Button, Input, Card with multiple variants
- **Shadows**: Soft, medium, and large shadow utilities

## Authentication Flow

1. Users can sign up or login with role selection (Instructor/Student)
2. Mock authentication validates credentials and role
3. Route guards protect role-specific pages
4. Automatic redirection based on authentication status and role

## Future Enhancements

- Real authentication with backend integration
- Course creation and management features
- AI-powered tutoring capabilities
- Student progress tracking
- Advanced analytics dashboard