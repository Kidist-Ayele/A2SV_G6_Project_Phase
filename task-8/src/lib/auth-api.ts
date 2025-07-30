interface SignupData {
    name: string
    email: string
    password: string
    confirmPassword: string
    role: string
  }
  
  interface VerifyEmailData {
    email: string
    OTP: string
  }
  
  interface SigninData {
    email: string
    password: string
  }
  
  const API_BASE_URL = "https://akil-backend.onrender.com"
  
  export async function signupUser(data: SignupData) {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
  
      const result = await response.json()
  
      if (!response.ok) {
        throw new Error(result.message || "Signup failed")
      }
  
      return { success: true, data: result }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Signup failed",
      }
    }
  }
  
  export async function verifyEmail(data: VerifyEmailData) {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
  
      const result = await response.json()
  
      if (!response.ok) {
        throw new Error(result.message || "Email verification failed")
      }
  
      return { success: true, data: result }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Email verification failed",
      }
    }
  }
  