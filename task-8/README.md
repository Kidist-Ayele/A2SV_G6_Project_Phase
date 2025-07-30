# Task 8 - Job Listing App with Authentication

This is a Next.js application with NextAuth.js authentication and Redux state management.

## Features

- Job listing dashboard with filtering
- User authentication (sign in/sign up)
- Email verification with OTP
- Redux state management
- Responsive design with Tailwind CSS
- TypeScript support

## Setup Instructions

### 1. Install Dependencies

First, install the missing dependencies:

```bash
npm install next-auth @radix-ui/react-label
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication Flow

1. **Sign Up**: Users can create an account at `/auth/signup`
2. **Email Verification**: Users verify their email with OTP at `/auth/verify-email`
3. **Sign In**: Users can sign in at `/auth/signin`
4. **Protected Routes**: The app uses NextAuth.js for session management

## API Endpoints

The authentication is connected to the backend at `https://akil-backend.onrender.com`


## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── verify-email/
│   │   └── error/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   └── job/
├── components/
│   ├── ui/
│   └── ...
└── lib/
    ├── store.ts
    ├── types.ts
    └── ...
```

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed
2. Check that the `.env.local` file exists with proper values
3. Ensure the backend API is accessible
4. Check the browser console for any errors
5. Verify that the API endpoints are responding correctly

## Technologies Used

- Next.js 15
- NextAuth.js
- Redux Toolkit
- TypeScript
- Tailwind CSS
- Radix UI Components
