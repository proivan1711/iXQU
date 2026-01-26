# iXQU - Flow

A modern, privacy-focused Pomodoro timer application built with Next.js. iXQU helps you stay productive with the Pomodoro Technique while keeping all your data local to your browser.

## ✨ Features

### 🍅 Pomodoro Timer
- **Customizable Work Sessions**: Configure your pomodoro duration (15 minutes to 5 hours)
- **Flexible Breaks**: Set up short breaks (1-10 minutes) and long breaks (10-30 minutes)
- **Timer Controls**: 
  - Play/Pause functionality
  - Skip forward and backward with customizable skip duration (1-30 seconds)
  - Session restart capability
- **Visual Clock Display**: Clear, easy-to-read countdown timer
- **Mode Switching**: Seamlessly switch between pomodoro, short break, and long break modes

### 📊 Analytics Dashboard
- **Total Pomodoros Tracking**: View the total number of completed pomodoro sessions
- **Time Statistics**: Track total hours spent in productive work sessions
- **Daily Activity Charts**: Visualize your pomodoro time distribution across different days
- **Streak Counter**: Monitor your consistency with streak tracking
- **Local Data Storage**: All analytics data is stored locally in your browser using localStorage

### ⚙️ Settings
- **Customizable Durations**: 
  - Pomodoro session length (15 min - 5 hours)
  - Short break duration (1-10 minutes)
  - Long break duration (10-30 minutes)
  - Skip duration for quick time adjustments (1-30 seconds)
- **Persistent Settings**: Your preferences are saved locally for future sessions

### 🎨 User Experience
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Modern UI**: Built with Shadcn/UI components and Tailwind CSS
- **Intuitive Navigation**: Easy-to-use sidebar navigation with visual indicators
- **Privacy-Focused**: No data collection, no tracking, no servers - everything stays in your browser

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/) with [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Simple Icons](https://simpleicons.org/)
- **Charts**: [Recharts](https://recharts.org/)
- **Timer Logic**: [React Timer Hook](https://www.npmjs.com/package/react-timer-hook)
- **Theme**: [Next Themes](https://github.com/pacocoursey/next-themes)
- **Code Quality**: 
  - [Biome](https://biomejs.dev/) for linting and formatting
  - [Husky](https://typicode.github.io/husky/) for Git hooks
- **React Compiler**: Enabled for enhanced performance

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/proivan1711/iXQU.git
cd iXQU
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Available Scripts

- `pnpm run dev` - Start the development server
- `pnpm run build` - Build the application for production
- `pnpm run start` - Start the production server
- `pnpm run lint` - Run Biome linter checks
- `pnpm run format` - Format code with Biome (applies fixes)

## 📁 Project Structure

```
iXQU/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── analytics/          # Analytics page
│   │   ├── settings/           # Settings page
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page (Pomodoro timer)
│   ├── components/             # Shared components
│   │   ├── ui/                 # Shadcn/UI components
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   └── theme-provider.tsx  # Theme management
│   ├── features/               # Feature-based modules
│   │   ├── analytics/          # Analytics functionality
│   │   │   ├── components/     # Analytics-specific components
│   │   │   └── services/       # Analytics data management
│   │   ├── settings/           # Settings functionality
│   │   │   ├── components/     # Settings forms
│   │   │   ├── context/        # Settings context
│   │   │   └── services/       # Settings data management
│   │   └── timer/              # Timer functionality
│   │       ├── components/     # Timer components
│   │       └── config.ts       # Timer configuration
│   ├── contexts/               # React contexts
│   │   └── PomodoroContext.tsx # Pomodoro state management
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility libraries
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
└── package.json               # Project dependencies
```

## 🎯 Usage

### Starting a Pomodoro Session

1. Navigate to the Timer page (home page)
2. Click the play button to start a pomodoro session
3. Work until the timer completes
4. Take a break when prompted (short or long break)
5. Repeat the cycle

### Viewing Analytics

1. Click on "Analytics" in the sidebar
2. View your statistics:
   - Current streak
   - Total completed pomodoros
   - Total hours of focused work
   - Daily activity chart

### Customizing Settings

1. Navigate to "Settings" in the sidebar
2. Adjust the following:
   - Pomodoro duration
   - Short break duration
   - Long break duration
   - Skip duration for quick adjustments
3. Settings are automatically saved

## 🔒 Privacy

iXQU is built with privacy as a core principle:
- **No External Servers**: All data is stored locally in your browser
- **No Tracking**: No analytics, no cookies, no tracking scripts
- **No Account Required**: Start using immediately without sign-up
- **Offline Capable**: Works without an internet connection after initial load
- **Your Data, Your Control**: Export or clear your data anytime

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Ivan Lukan

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👤 Author

**Ivan Lukan**

---

Built with ❤️ using Next.js and React
