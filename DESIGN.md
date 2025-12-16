# Security Dashboard - Design Document

## 1. Project Overview
The **Security Dashboard** is a React-based web application designed to provide comprehensive visibility into security vulnerabilities within an organization's software assets. It serves two primary personas:
- **Executives**: Who need high-level metrics, trends, and risk summaries.
- **Security Analysts**: Who need detailed lists, filtering capabilities, and workflow tools to manage and remediate vulnerabilities.

## 2. Technology Stack
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Component Library**: Material UI (MUI) v6
- **Styling**: Emotion (via MUI), CSS Baseline
- **Routing**: React Router DOM v6
- **Data Visualization**: Recharts
- **Animations**: Framer Motion
- **Icons**: MUI Icons

## 3. Architecture Overview

### 3.1. Application Structure
The application is structured as a Single Page Application (SPA) using client-side routing. It is wrapped in a global `ModernLayout` which provides the persistent navigation sidebar and top header.

### 3.2. State Management
Authentication, notifications, and global application state are managed via React Context APIs and TanStack Query:
- **`AuthContext`**: Manages user session, login/logout logic, and route protection.
- **`DataContext`**: Manages filtering logic and search state.
- **`NotificationContext`**: Provides a global snackbar system for user feedback.
- **`ColorModeContext`**: Manages the application-wide theme (Light/Dark mode).
- **React Query (`@tanstack/react-query`)**: Handles server state, data fetching, caching, and loading states for vulnerability data.

### 3.3. Key Components
- **`App.tsx`**: The main entry point that sets up the providers and defines the routes using `ProtectedRoute`.
- **`ModernLayout`**: A shared layout component containing the responsive sidebar and header.
- **`theme.ts`**: Centralized theme definition using MUI's theming system.

## 4. Workflows & Views

### 4.1. Executive Dashboard (`/`)
**Purpose**: High-level risk assessment.
- **Key Features**:
    - Summary cards showing Total Vulnerabilities, Critical/High counts, and Mean Time to Remediate (MTTR).
    - Trend analysis charts and Risk scores.

### 4.2. Detailed Dashboard (`/detailed`)
**Purpose**: Deeper dive into metrics.

### 4.3. Vulnerability List / Analyst View (`/vulnerabilities`)
**Purpose**: Operational management of specific vulnerability findings.
- **Key Features**:
    - **Data Grid**: A powerful table view supporting sorting, filtering, and pagination.
    - **SLA Tracking**: Visual indicators for SLA status (On Track, At Risk, Overdue).
    - **Risk Context**: Badges for "Exploit Available", "Internet Facing".
    - **CSV Export**: Ability to export filtered datasets.

### 4.4. Compare View (`/compare`)
**Purpose**: Comparing vulnerability states over time or between different datasets (e.g., branches).
- **Key Features**:
    - Visualization of regressions vs. fixed issues.
    - Differential analysis tables.

### 4.5. Login (`/login`)
**Purpose**: Entry point for user authentication.

## 5. Data Model (`src/api/types.ts`)

The core entity is the `Vulnerability` object:

| Field | Type | Description |
| :--- | :--- | :--- |
| `cveId` | string | Unique identifier (e.g., CVE-2023-1234) |
| `severity` | enum | Critical, High, Medium, Low |
| `cveId` | string | Unique identifier |
| `packageName` | string | Affected library/package |
| `currentVersion` | string | Version currently installed |
| `fixedVersion` | string | Version containing the fix |
| `kaiStatus` | string | Analysis status (e.g., "valid", "investigate") |
| `exploitAvailable`| boolean | If a known exploit exists |
| `slaStatus` | enum | On Track, At Risk, Overdue |

## 6. Infrastructure & DevOps

### 6.1. Testing Strategy
The project uses a modern testing stack for speed and reliability:
- **Vitest**: Unit and integration test runner.
- **React Testing Library**: Component testing.
- **JSDOM**: Browser environment simulation.

### 6.2. CI/CD Pipeline
Automated via **GitHub Actions** (`.github/workflows/ci.yml`):
- **Triggers**: On push to `main` and all Pull Requests.
- **Jobs**:
  1. **Linting**: Enforces code quality using ESLint.
  2. **Testing**: Runs the Vitest suite.
  3. **Build**: Verifies the application builds successfully.

## 7. Directory Structure
```
src/
├── api/             # API types and mock data services
├── components/      # Reusable UI components
├── contexts/        # React Context providers (Auth, Data, Notification)
├── pages/           # Page-level components
├── assets/          # Static assets
├── theme.ts         # MUI theme configuration
├── App.tsx          # Main App component
└── main.tsx         # Entry point
```

## 8. Future Considerations
- **Backend Integration**: Currently relies on `mockData`. Future state will connect to a REST or GraphQL API.
- **Role-Based Access Control (RBAC)**: Restricting views based on user roles (e.g., View-Only vs. Admin).
