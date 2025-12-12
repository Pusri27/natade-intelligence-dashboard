# 🚀 Natade Intelligence

> AI-Powered Product Intelligence Platform for Dropshipping Excellence

A premium, production-ready analytics dashboard built with modern web technologies. This project showcases advanced frontend development skills including complex animations, responsive design, state management, and accessibility best practices.

---

## ✨ Features

### 🎨 Premium UI/UX
- **Dark/Light Theme** - Smooth animated theme switching with localStorage persistence
- **Glassmorphism Design** - Modern frosted-glass effects throughout the UI
- **Micro-interactions** - Magnetic buttons, hover spotlights, haptic feedback
- **Smooth Animations** - Page transitions, scroll reveals, parallax effects

### 📊 Dashboard Components
- **KPI Cards** - Animated counters with sparkline charts
- **Revenue Charts** - Interactive area, bar, and pie charts with Recharts
- **AI Insights** - Cards with confidence scores and actionable recommendations
- **Trending Table** - Sortable, filterable product data table
- **Live Activity Feed** - Real-time notifications with animation

### ⚡ Advanced Features
- **Command Palette** - Press `⌘K` for quick navigation (like Vercel/Linear)
- **Keyboard Shortcuts** - Press `?` to view all shortcuts
- **Radial Quick Actions** - Floating action button with radial menu
- **Cinematic Preloader** - Animated logo reveal on first load
- **Infinite Marquee** - Smooth scrolling platform logos

### ♿ Accessibility (A11y)
- Skip navigation link for keyboard users
- ARIA labels on all interactive elements
- Focus management and visible focus states
- Screen reader announcements
- Reduced motion support

### 🛡️ Error Handling
- Custom 404 page with animated design
- Global error boundary with retry functionality
- Skeleton loading states for all pages

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **State** | Zustand |
| **Icons** | Lucide React |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Landing page
│   ├── not-found.tsx       # Custom 404 page
│   ├── global-error.tsx    # Error boundary
│   ├── dashboard/          # Dashboard page
│   ├── products/           # Products page
│   └── insights/           # AI Insights page
├── components/
│   ├── layout/             # Navbar, Footer, CommandPalette
│   ├── landing/            # Hero, Features, Stats, CTA
│   ├── dashboard/          # KPICard, Charts, Tables
│   └── ui/                 # Reusable UI components (30+)
├── store/                  # Zustand global state
├── data/                   # Mock JSON data
├── lib/                    # Utility functions
└── types/                  # TypeScript definitions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Pusri27/natade-intelligence-dashboard.git

# Navigate to project
cd natade-intelligence-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🎯 Key Highlights

### For Recruiters/Interviewers

This project demonstrates proficiency in:

- **Modern React Patterns** - Server/Client components, hooks, context
- **TypeScript** - Full type safety with interfaces and generics
- **CSS Architecture** - Tailwind CSS v4 with custom design system
- **Animation** - Complex Framer Motion animations and gestures
- **State Management** - Zustand with persistence middleware
- **Performance** - Lazy loading, code splitting, optimized renders
- **Accessibility** - WCAG compliance, keyboard navigation, screen readers
- **Error Handling** - Boundaries, fallbacks, loading states

---

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero, features, stats, CTA sections |
| Dashboard | `/dashboard` | KPIs, charts, insights, activity feed |
| Products | `/products` | Product grid with search and filters |
| Insights | `/insights` | AI-generated insights with filtering |
| 404 | `/*` | Custom animated error page |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` | Open command palette |
| `?` | Show keyboard shortcuts |
| `G` then `D` | Go to Dashboard |
| `G` then `P` | Go to Products |
| `G` then `I` | Go to Insights |
| `T` | Toggle theme |
| `Esc` | Close modals |

---

## 👤 Author

**Pusri**

- GitHub: [@Pusri27](https://github.com/Pusri27)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
</p>
