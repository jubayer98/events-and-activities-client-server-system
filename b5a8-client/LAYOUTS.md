# EventHub - Event Management Application Layouts

This document describes the two main layouts used in the application: **CommonLayout** and **DashboardLayout**.

## Table of Contents

- [Overview](#overview)
- [CommonLayout](#commonlayout)
- [DashboardLayout](#dashboardlayout)
- [Components](#components)
- [Usage Examples](#usage-examples)

## Overview

The application uses two distinct layout systems:

1. **CommonLayout** - For public-facing pages (landing, events, about, contact)
2. **DashboardLayout** - For authenticated user dashboard and management pages

Both layouts are fully responsive and built with Tailwind CSS v4 and shadcn/ui components.

## CommonLayout

### Features

- **Fixed Navbar** with scroll effects
- **Responsive Footer** with multiple sections
- **Mobile-friendly** navigation with slide-out menu
- **User authentication** dropdowns
- Smooth transitions and animations

### Structure

```
CommonLayout
├── Navbar (Fixed top)
│   ├── Logo
│   ├── Navigation Links
│   ├── Auth Buttons (Login/Sign Up)
│   ├── User Dropdown Menu
│   └── Mobile Menu (Sheet)
└── Main Content Area
└── Footer
    ├── Brand Section
    ├── Link Sections (4 columns)
    ├── Social Media Links
    └── Legal Links
```

### File Location

- Layout: `src/components/layouts/CommonLayout.tsx`
- Navbar: `src/components/Navbar.tsx`
- Footer: `src/components/Footer.tsx`

### Key Features

#### Navbar
- **Fixed positioning** with backdrop blur on scroll
- **Gradient logo** with brand colors
- **Responsive menu** - Desktop links + Mobile sheet
- **User menu dropdown** with avatar
- **Smooth animations** on hover

#### Footer
- **4-column layout** (Company, Support, Events, Connect)
- **Social media icons** with hover effects
- **Brand section** with description
- **Bottom bar** with copyright and legal links

## DashboardLayout

### Features

- **Collapsible sidebar** navigation
- **Mobile-responsive** with drawer sidebar
- **User profile** dropdown in header
- **Notification** indicator
- **Stats dashboard** example

### Structure

```
DashboardLayout
├── Sidebar (Desktop) / Drawer (Mobile)
│   ├── Logo
│   ├── Navigation Menu
│   │   ├── Overview
│   │   ├── My Events
│   │   ├── Create Event
│   │   ├── My Bookings
│   │   └── Analytics
│   ├── Settings Section
│   │   ├── Settings
│   │   └── Help & Support
│   └── Back to Home Button
└── Main Content
    ├── Header
    │   ├── Mobile Menu Toggle
    │   ├── Page Title
    │   ├── Notifications
    │   └── User Dropdown
    └── Content Area
```

### File Location

- Layout: `src/components/layouts/DashboardLayout.tsx`
- Sidebar: `src/components/DashboardSidebar.tsx`

### Key Features

#### Sidebar
- **Icon + text navigation** items
- **Active state highlighting** based on current route
- **Grouped sections** (Main navigation + Settings)
- **Back to home** quick action
- **Collapsible on mobile**

#### Dashboard Header
- **Mobile hamburger menu**
- **Notification bell** with indicator
- **User avatar dropdown**
- **Responsive title** display

## Components

### Navbar Component

**Props:** None (uses client-side state)

**Features:**
- Scroll-based styling
- Mobile sheet menu
- User authentication state
- Dropdown menus

### Footer Component

**Props:** None

**Features:**
- Dynamic year in copyright
- Social media links
- Multi-column link sections
- Responsive grid layout

### DashboardSidebar Component

**Props:**
```typescript
interface DashboardSidebarProps {
  onClose?: () => void;  // Callback for mobile menu close
}
```

**Features:**
- Active route detection
- Icon-based navigation
- Grouped menu items
- Mobile-friendly

### DashboardLayout Component

**Props:**
```typescript
interface DashboardLayoutProps {
  children: ReactNode;
}
```

**Features:**
- Full-height layout
- Responsive sidebar
- Header with actions
- Content area with padding

## Usage Examples

### Using CommonLayout

```tsx
// src/app/events/page.tsx
import CommonLayout from "@/components/layouts/CommonLayout";

export default function EventsPage() {
  return (
    <CommonLayout>
      <div className="container mx-auto px-4 py-12">
        <h1>Browse Events</h1>
        {/* Your page content */}
      </div>
    </CommonLayout>
  );
}
```

### Using DashboardLayout

```tsx
// src/app/dashboard/my-events/page.tsx
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function MyEventsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">My Events</h2>
        {/* Your dashboard content */}
      </div>
    </DashboardLayout>
  );
}
```

## Responsive Breakpoints

The layouts use the following Tailwind breakpoints:

- **sm:** 640px - Small tablets
- **md:** 768px - Tablets
- **lg:** 1024px - Desktop (sidebar shows)
- **xl:** 1280px - Large desktop

## Color Scheme

### Primary Colors
- Blue: `from-blue-600` to `to-blue-700`
- Purple: `from-purple-600` to `to-purple-700`

### Gradients
- Logo: `bg-linear-to-br from-blue-600 to-purple-600`
- Text: `bg-linear-to-r from-blue-600 to-purple-600`
- Buttons: `bg-linear-to-r from-blue-600 to-purple-600`

### UI States
- Active: `bg-blue-50` / `text-blue-600`
- Hover: `hover:bg-gray-100`
- Border: `border-gray-200`

## Customization

### Modifying Navigation Links

**CommonLayout (Navbar):**
```tsx
// src/components/Navbar.tsx
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  // Add your links here
];
```

**DashboardLayout (Sidebar):**
```tsx
// src/components/DashboardSidebar.tsx
const menuItems = [
  {
    title: "Your Page",
    href: "/dashboard/your-page",
    icon: <YourIcon />,
  },
  // Add your menu items here
];
```

### Changing Brand Colors

Update the gradient classes throughout:
- `from-blue-600` → `from-your-color-600`
- `to-purple-600` → `to-your-color-600`

### Adding Footer Sections

```tsx
// src/components/Footer.tsx
const footerSections = [
  {
    title: "Your Section",
    links: [
      { href: "/link", label: "Link Name" },
    ],
  },
  // Add more sections
];
```

## Best Practices

1. **Always wrap pages** in the appropriate layout component
2. **Use consistent spacing** - `space-y-6` for dashboard content
3. **Mobile-first approach** - Design for mobile, enhance for desktop
4. **Accessibility** - All interactive elements have proper aria-labels
5. **Performance** - Fixed navbar uses `position: fixed` for smooth scrolling

## Dark Mode Support

Both layouts include full dark mode support:
- Use `dark:` prefix for dark mode styles
- Automatic based on system preferences
- Consistent color scheme across layouts

## Live Demo Pages

- **Homepage (CommonLayout):** `/`
- **Dashboard (DashboardLayout):** `/dashboard`

Run `npm run dev` and visit these pages to see the layouts in action!
