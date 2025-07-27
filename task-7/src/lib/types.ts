export interface JobPosting {
  id: string
  title: string
  description: string
  responsibilities?: string
  requirements?: string
  idealCandidate?: string
  categories?: string[]
  opType?: string
  startDate?: string
  endDate?: string
  deadline?: string
  location?: string[]
  requiredSkills?: string[]
  whenAndWhere?: string
  orgID?: string
  company: string // This maps to orgName from API
  orgName?: string // Keep both for compatibility
  orgEmail?: string
  orgPrimaryPhone?: string
  logoUrl?: string
  orgLogo?: string
  isBookmarked?: boolean
  isRolling?: boolean
  questions?: string
  perksAndBenefits?: string
  createdAt?: string
  updatedAt?: string
  datePosted?: string
  status?: string
  applicantsCount?: number
  viewsCount?: number
  orgPrimaryLocation?: string
  about?: {
    location?: string
    posted_on?: string
    deadline?: string
    start_date?: string
    end_date?: string
    categories?: string[]
    required_skills?: string[]
  }
}
