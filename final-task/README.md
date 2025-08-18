# Job Listing Application with Bookmark Functionality

A modern, responsive job listing application built with Next.js, featuring bookmark functionality, authentication, and comprehensive testing.

## 🚀 Features

### Core Functionality

- **Job Listings**: Browse and search through job opportunities
- **Bookmark System**: Save and manage favorite job postings
- **User Authentication**: Secure sign-in/sign-up with NextAuth.js
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Job Details**: Detailed view of individual job postings

### Technical Features

- **Redux State Management**: Global state management with Redux Toolkit
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern, responsive styling
- **Comprehensive Testing**: Unit tests (Jest) and E2E tests (Cypress)
- **Mock API Integration**: Client-side bookmark persistence with localStorage

## 📱 Screenshots

### Homepage - Job Listings

![Homepage - Job Listings](screenshots/homepage-job-listings.png)
_Main dashboard showing job cards with bookmark buttons and responsive design_

### Job Detail Page

![Job Detail Page](screenshots/job-detail-page.png)
_Detailed view of a job posting with bookmark functionality_

### Authentication Pages

![Sign In Page](screenshots/signin-page.png)
_User authentication with responsive design_

![Sign Up Page](screenshots/signup-page.png)
_User registration form with role selection_

### Bookmarks View

![Bookmarks View](screenshots/bookmarks-view.png)
_Filtered view showing only bookmarked job opportunities_

### Mobile Responsive Design

![Mobile View](screenshots/mobile-responsive.png)
_Mobile-optimized interface with touch-friendly interactions_

## 🛠️ Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Redux Toolkit** - State management
- **NextAuth.js** - Authentication
- **Jest + Cypress** - Testing framework
- **Lucide React** - Icons

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd A2SV_G6_Project_Phase/final-task
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Unit Tests

Run unit tests with Jest:

```bash
npm test
```

### End-to-End Tests

Run Cypress E2E tests:

```bash
# Start the development server first
npm run dev

# In another terminal, run Cypress
npm run cypress:run
```
