# 💰 FinanceFlow

A modern, offline-first personal finance management application built with React, TypeScript, and Tailwind CSS.

## Features

✨ **Core Features**
- 📊 Interactive Dashboard with financial overview
- 💸 Transaction Management (Expense, Income, Investment)
- 📈 Investment Tracking
- 💰 Budget Management
- 📉 Advanced Analytics & Insights
- 🏠 Household Finance Sharing
- 🔐 100% Private - All data stored locally

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Theme
- **State Management**: Zustand
- **Database**: Dexie.js (IndexedDB)
- **Build Tool**: Vite
- **Charts**: Recharts (for analytics)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Ujju2468/financeflow.git
cd financeflow

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # Base UI components
│   └── layout/      # Layout components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── stores/          # Zustand state management
├── services/        # Services (DB, API)
├── utils/           # Utility functions
├── types/           # TypeScript types
├── constants/       # Constants & config
├── config/          # Configuration files
└── App.tsx          # Root component
```

## Key Features Explained

### Offline-First Architecture
- All data stored in browser's IndexedDB
- Works completely offline
- No data sent to external servers
- Full privacy and data ownership

### Smart Analytics
- Monthly spending breakdown
- Category-wise analysis
- Income vs Expense trends
- Budget tracking and alerts

### Household Finance Management
- Share expenses with family
- Track individual spending
- Set allowances
- Transparent financial overview

## Color Palette

- **Primary**: Sky Blue (#0ea5e9) - Trust & Technology
- **Success**: Emerald Green (#22c55e) - Positive outcomes
- **Warning**: Amber (#f59e0b) - Attention needed
- **Danger**: Rose Red (#ff3333) - Critical alerts
- **Neutral**: Slate - Text & backgrounds

## API Integration (Future)

The application is designed to support backend integration:
- Authentication endpoints
- Cloud sync capabilities
- Data backup & recovery
- Multi-device synchronization

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please read our CONTRIBUTING guidelines.

---

**Made with ❤️ by Ujjawal Patel**
