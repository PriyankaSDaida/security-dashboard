# Security Vulnerability Dashboard

A high-performance React application for visualizing and analyzing security vulnerabilities. Built with **React**, **TypeScript**, **Material UI (MUI)**, and **Recharts**.

## Features

- **Dashboard Overview**: Interactive charts showing Severity Distribution, Risk Factors, and Trends.
- **Vulnerability List**: Virtualized Data Grid capable of handling 50k+ records smoothly.
- **Advanced Filtering**:
  - **Analysis Filter**: Removes "invalid - norisk" entries.
  - **AI Analysis Filter**: Removes "ai-invalid-norisk" entries.
  - Real-time search and sorting.
- **Visual Feedback**: Animated filter impact indicators showing how many records are hidden.
- **Premium UI**: Custom Dark Theme with glassmorphism effects.

## Architecture

- **Data Layer**:
  - `DataContext`: Manages global state, filtering logic, and data loading.
  - **Virtualization**: Uses `@mui/x-data-grid` to render only visible rows, ensuring performance with large datasets.
  - **Web Worker** (`src/api/data.worker.ts`): Ready for off-main-thread data loading of the 300MB+ JSON file.
- **Mock Data**: Currently configured to generate 50,000 realistic mock records for development stability (avoiding 300MB downloads on every reload).

## Setup & Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Design Decisions

- **MUI Grid v2**: utilized for responsive layout.
- **Recharts**: Chosen for its composable React-centric API and animation support.
- **Framer Motion**: Used for subtle UI transitions (filter chips, impact alerts).
- **Git LFS Handling**: The provided data URL points to a Git LFS pointer. The application is set up with a Mock Generator to simulate the data structure and scale ensuring immediate playability.
