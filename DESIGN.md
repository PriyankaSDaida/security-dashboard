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
Authentication and global application state are managed via React Context APIs:
- **`ColorModeContext`**: Manages the application-wide theme (Light/Dark mode).
- **`DataContext`**: Manages the fetching and distribution of vulnerability data across the application.

### 3.3. Key Components
- **`App.tsx`**: The main entry point that sets up the providers (Theme, Data, Router) and defines the routes.
- **`ModernLayout`**: A shared layout component containing the responsive sidebar and header.
- **`theme.ts`**: Centralized theme definition using MUI's theming system, defining customized color palettes, typography, and component overrides.

## 4. Workflows & Views

### 4.1. Executive Dashboard (`/`)
**Purpose**: High-level risk assessment.
- **Key Features**:
    - Summary cards showing Total Vulnerabilities, Critical/High counts, and Mean Time to Remediate (MTTR).
    - Trend analysis charts.
    - Risk scores.

### 4.2. Detailed Dashboard (`/detailed`)
**Purpose**: Deeper dive into metrics.
- **Key Features**:
    - Breakdown of vulnerabilities by severity, package, or team.
    - Specific charts for analysis.

### 4.3. Vulnerability List / Analyst View (`/vulnerabilities`)
**Purpose**: Operational management of specific vulnerability findings.
- **Key Features**:
    - **Data Grid**: A powerful table view supporting sorting, filtering, and pagination.
    - **SLA Tracking**: Visual indicators for SLA status (On Track, At Risk, Overdue).
    - **Risk Context**: Badges for "Exploit Available", "Internet Facing", and "Asset Criticality".
    - **Workflow**: Assignment of owners and status tracking.

### 4.4. Compare View (`/compare`)
**Purpose**: Comparing vulnerability states over time or between different datasets.
- **Key Features**:
    - Visualization of regressions vs. fixed issues.
    - Comparison logic.

### 4.5. Settings (`/settings`)
**Purpose**: Configuration of dashboard preferences.

## 5. Data Model (`src/api/types.ts`)

The core entity is the `Vulnerability` object:

| Field | Type | Description |
| :--- | :--- | :--- |
| `cveId` | string | Unique identifier (e.g., CVE-2023-1234) |
| `severity` | enum | Critical, High, Medium, Low |
| `cvss` | number | CVSS Base Score |
| `packageName` | string | Affected library/package |
| `currentVersion` | string | Version currently installed |
| `fixedVersion` | string | Version containing the fix |
| `kaiStatus` | string | Analysis status (e.g., "valid", "investigate") |
| `exploitAvailable`| boolean | If a known exploit exists |
| `slaStatus` | enum | On Track, At Risk, Overdue |

## 6. Directory Structure
```
src/
├── api/             # API types and mock data services
├── components/      # Reusable UI components (Buttons, Cards, Layouts)
├── contexts/        # React Context providers
├── pages/           # Page-level components (Dashboards, Lists)
├── assets/          # Static assets (Images, Icons)
├── theme.ts         # MUI theme configuration
├── App.tsx          # Main App component
└── main.tsx         # Entry point
```

## 7. Future Considerations
- **Backend Integration**: Currently relies on `mockData` and local JSON. Future state will connect to a REST or GraphQL API.
- **Authentication**: Implementing OAuth/SSO for user login.
- **Role-Based Access Control (RBAC)**: Restricting views based on user roles (e.g., View-Only vs. Admin).
