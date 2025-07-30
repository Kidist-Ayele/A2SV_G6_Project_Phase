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
