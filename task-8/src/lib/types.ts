export interface JobFilters {
  location: string
  type: string
  experience: string
}


// NextAuth type extensions
declare module "next-auth" {
  interface User {
    accessToken?: string
  }
  
  interface Session {
    accessToken?: string
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}
