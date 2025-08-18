import type { JobPosting } from "./types"

const API_BASE_URL = "https://akil-backend.onrender.com"

export async function fetchJobOpportunities(): Promise<{ success: boolean; data?: any[]; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/search`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return { success: true, data: data.data }
  } catch (error: any) {
    console.error("API fetchJobOpportunities error:", error)
    return { success: false, message: error.message }
  }
}

export async function fetchJobById(id: string): Promise<{ success: boolean; data?: any; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return { success: true, data: data.data }
  } catch (error: any) {
    console.error("API fetchJobById error:", error)
    return { success: false, message: error.message }
  }
}

// Bookmark API functions - Mock implementation since backend doesn't have bookmark endpoints yet
export async function getBookmarks(accessToken: string): Promise<{ success: boolean; data?: any[]; message?: string }> {
  try {
    console.log("Fetching bookmarks from localStorage (mock implementation)")
    
    // Get bookmarks from localStorage
    const storedBookmarks = localStorage.getItem('bookmarkedJobs')
    const bookmarkedJobIds = storedBookmarks ? JSON.parse(storedBookmarks) : []
    
    console.log("Bookmarked job IDs:", bookmarkedJobIds)
    
    // Return the list of bookmarked job IDs
    return { success: true, data: bookmarkedJobIds }
  } catch (error: any) {
    console.error("Mock getBookmarks error:", error)
    return { success: false, message: error.message }
  }
}

export async function createBookmark(eventId: string, accessToken: string): Promise<{ success: boolean; data?: any; message?: string }> {
  try {
    console.log("Creating bookmark for eventId:", eventId, "(mock implementation)")
    
    // Get existing bookmarks from localStorage
    const storedBookmarks = localStorage.getItem('bookmarkedJobs')
    const bookmarkedJobIds = storedBookmarks ? JSON.parse(storedBookmarks) : []
    
    // Add the new bookmark if it's not already there
    if (!bookmarkedJobIds.includes(eventId)) {
      bookmarkedJobIds.push(eventId)
      localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobIds))
      console.log("Bookmark added successfully")
    } else {
      console.log("Job already bookmarked")
    }
    
    return { success: true, data: { eventId, bookmarked: true } }
  } catch (error: any) {
    console.error("Mock createBookmark error:", error)
    return { success: false, message: error.message }
  }
}

export async function removeBookmark(eventId: string, accessToken: string): Promise<{ success: boolean; data?: any; message?: string }> {
  try {
    console.log("Removing bookmark for eventId:", eventId, "(mock implementation)")
    
    // Get existing bookmarks from localStorage
    const storedBookmarks = localStorage.getItem('bookmarkedJobs')
    const bookmarkedJobIds = storedBookmarks ? JSON.parse(storedBookmarks) : []
    
    // Remove the bookmark
    const updatedBookmarks = bookmarkedJobIds.filter((id: string) => id !== eventId)
    localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks))
    
    console.log("Bookmark removed successfully")
    return { success: true, data: { eventId, bookmarked: false } }
  } catch (error: any) {
    console.error("Mock removeBookmark error:", error)
    return { success: false, message: error.message }
  }
}

export function transformApiJobToJobPosting(apiJob: any): JobPosting {
  return {
    id: apiJob.id,
    title: apiJob.title || "Untitled Position",
    description: apiJob.description || "No description available",
    responsibilities: apiJob.responsibilities,
    requirements: apiJob.requirements,
    idealCandidate: apiJob.idealCandidate,
    categories: apiJob.categories || [],
    opType: apiJob.opType,
    startDate: apiJob.startDate,
    endDate: apiJob.endDate,
    deadline: apiJob.deadline,
    location: apiJob.location || [],
    requiredSkills: apiJob.requiredSkills || [],
    whenAndWhere: apiJob.whenAndWhere,
    orgID: apiJob.orgID,
    company: apiJob.orgName || "Unknown Company", // Map orgName to company
    orgEmail: apiJob.orgEmail,
    orgPrimaryPhone: apiJob.orgPrimaryPhone,
    logoUrl: apiJob.logoUrl || apiJob.orgLogo, // Use logoUrl or orgLogo from API
    orgLogo: apiJob.orgLogo,
    isBookmarked: apiJob.isBookmarked,
    isRolling: apiJob.isRolling,
    questions: apiJob.questions,
    perksAndBenefits: apiJob.perksAndBenefits,
    createdAt: apiJob.createdAt,
    updatedAt: apiJob.updatedAt,
    datePosted: apiJob.datePosted,
    status: apiJob.status,
    applicantsCount: apiJob.applicantsCount,
    viewsCount: apiJob.viewsCount,
    orgPrimaryLocation: apiJob.orgPrimaryLocation,
    about: apiJob.about
      ? {
          location: apiJob.about.location || apiJob.location?.[0] || apiJob.orgPrimaryLocation || "Remote",
        }
      : {
          location: apiJob.location?.[0] || apiJob.orgPrimaryLocation || "Remote",
        },
  }
}
