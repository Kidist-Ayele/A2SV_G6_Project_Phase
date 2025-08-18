# 🔐 Job Listing App with Authentication

This is a Next.js application with NextAuth.js authentication and Redux state management.

## Features

- Job listing dashboard with filtering
- User authentication (sign in/sign up)
- Email verification with OTP
- Redux state management
- Responsive design with Tailwind CSS
- TypeScript support

## Authentication Flow

1. **Sign Up**: Users can create an account at `/auth/signup`
2. **Email Verification**: Users verify their email with OTP at `/auth/verify-email`
3. **Sign In**: Users can sign in at `/auth/signin`
4. **Protected Routes**: The app uses NextAuth.js for session management

## API Endpoints

The authentication is connected to the backend at `https://akil-backend.onrender.com`


## 📷 Preview

## `/`
 <img width="1314" height="1108" alt="screencapture-localhost-3000-2025-07-30-19_26_11" src="https://github.com/user-attachments/assets/5c90c2d6-4414-4ae3-9282-57ad40ef6622" />

## `/auth/signup`

<img width="1366" height="641" alt="screencapture-localhost-3000-auth-signup-2025-07-30-19_31_51" src="https://github.com/user-attachments/assets/c1e4b449-8184-411c-ad4d-9c6cc913f993" />

## `/auth/verify-email`

<img width="1309" height="641" alt="screencapture-localhost-3000-auth-verify-email-2025-07-30-19_32_40(1)" src="https://github.com/user-attachments/assets/8d3a01c3-7842-46dc-adca-9810c50f2a88" />


## `/auth/signin`

 <img width="1366" height="641" alt="screencapture-localhost-3000-auth-signin-2025-07-30-19_30_49" src="https://github.com/user-attachments/assets/ab628319-10f0-455e-a436-956a36eaa910" />
    
## `After signin`

<img width="1351" height="644" alt="image" src="https://github.com/user-attachments/assets/63fe111f-e7a7-4742-b38e-0a74eb0a9f9e" />

## `Responsiveness`

<img width="839" height="584" alt="image" src="https://github.com/user-attachments/assets/ab80f16b-7eea-40cc-9081-859128b60330" />


## Setup Instructions


### 1. Clone the repo
```
git clone https://github.com/Kidist-Ayele/A2SV_G6_Project_Phase.git   
cd A2SV_G6_Project_Phase/task-7
```
### 2. Install Dependencies

First, install the missing dependencies:

```bash
npm install next-auth @radix-ui/react-label
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
    

## Technologies Used

- Next.js
- NextAuth.js
- Redux Toolkit
- TypeScript
- Tailwind CSS
