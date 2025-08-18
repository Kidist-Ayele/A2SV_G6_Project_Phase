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

<img width="1306" height="1977" alt="screencapture-localhost-3000-2025-08-18-12_15_06(1)" src="https://github.com/user-attachments/assets/7749a434-ece5-4de3-a9ce-d47612515578" />


_Main dashboard showing job cards with bookmark buttons and responsive design_

### Job Detail Page

<img width="1280" height="845" alt="image" src="https://github.com/user-attachments/assets/3e52c49f-cb0f-4a64-bc2b-cd6c4957ecf9" />


_Detailed view of a job posting with bookmark functionality_

### Bookmarks View

<img width="973" height="1280" alt="image" src="https://github.com/user-attachments/assets/f4975728-6c31-4856-bdd8-9c6572e9785c" />

_Filtered view showing only bookmarked job opportunities_

### Mobile Responsive Design

<img width="407" height="562" alt="image" src="https://github.com/user-attachments/assets/aff17a18-ce95-4d96-b32d-50879c7a72d9" />

<img width="408" height="560" alt="image" src="https://github.com/user-attachments/assets/5816e162-8aa1-43ee-831d-c7942c30a0ec" />


_Mobile-optimized interface with touch-friendly interactions_

### Test results 

#### - Cypress Result 

<img width="1280" height="602" alt="image" src="https://github.com/user-attachments/assets/df334bcc-bb51-456b-9f59-62a6a440fe3a" />

#### - Jest Result 
<img width="1227" height="655" alt="image" src="https://github.com/user-attachments/assets/56ca0769-046d-4e60-9921-4d2a1e777f42" />

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
   git clone [<repository-url>](https://github.com/Kidist-Ayele/A2SV_G6_Project_Phase.git)
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
npm run dev
npm run cypress:run
```
