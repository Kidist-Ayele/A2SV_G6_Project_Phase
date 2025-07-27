import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { JobPosting } from "@/lib/types"

interface JobsState {
  jobs: JobPosting[]
  selectedJob: JobPosting | null
  loading: boolean
  selectedJobLoading: boolean
  error: string | null
  selectedJobError: string | null
}

const initialState: JobsState = {
  jobs: [],
  selectedJob: null,
  loading: false,
  selectedJobLoading: false,
  error: null,
  selectedJobError: null,
}

// Simple fetch function for jobs
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://akil-backend.onrender.com/opportunities/search")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    // Transform the data to match our JobPosting interface
    const transformedJobs = data.data.map((job: any) => ({
      id: job.id,
      title: job.title || "Untitled Position",
      description: job.description || "No description available",
      responsibilities: job.responsibilities,
      requirements: job.requirements,
      idealCandidate: job.idealCandidate,
      categories: job.categories || [],
      opType: job.opType,
      startDate: job.startDate,
      endDate: job.endDate,
      deadline: job.deadline,
      location: job.location || [],
      requiredSkills: job.requiredSkills || [],
      whenAndWhere: job.whenAndWhere,
      orgID: job.orgID,
      company: job.orgName || "Unknown Company",
      orgName: job.orgName,
      orgEmail: job.orgEmail,
      orgPrimaryPhone: job.orgPrimaryPhone,
      logoUrl: job.logoUrl || job.orgLogo,
      orgLogo: job.orgLogo,
      isBookmarked: job.isBookmarked,
      isRolling: job.isRolling,
      questions: job.questions,
      perksAndBenefits: job.perksAndBenefits,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      datePosted: job.datePosted,
      status: job.status,
      applicantsCount: job.applicantsCount,
      viewsCount: job.viewsCount,
      orgPrimaryLocation: job.orgPrimaryLocation,
      about: job.about || {
        location: job.location?.[0] || job.orgPrimaryLocation || "Remote",
      },
    }))

    return transformedJobs
  } catch (error) {
    console.error("Redux fetchJobs error:", error)
    return rejectWithValue(error instanceof Error ? error.message : "An error occurred while fetching jobs")
  }
})

// Fetch single job
export const fetchSingleJob = createAsyncThunk("jobs/fetchSingleJob", async (jobId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://akil-backend.onrender.com/opportunities/${jobId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    // Transform single job data
    const job = data.data
    const transformedJob = {
      id: job.id,
      title: job.title || "Untitled Position",
      description: job.description || "No description available",
      responsibilities: job.responsibilities,
      requirements: job.requirements,
      idealCandidate: job.idealCandidate,
      categories: job.categories || [],
      opType: job.opType,
      startDate: job.startDate,
      endDate: job.endDate,
      deadline: job.deadline,
      location: job.location || [],
      requiredSkills: job.requiredSkills || [],
      whenAndWhere: job.whenAndWhere,
      orgID: job.orgID,
      company: job.orgName || "Unknown Company",
      orgName: job.orgName,
      orgEmail: job.orgEmail,
      orgPrimaryPhone: job.orgPrimaryPhone,
      logoUrl: job.logoUrl || job.orgLogo,
      orgLogo: job.orgLogo,
      isBookmarked: job.isBookmarked,
      isRolling: job.isRolling,
      questions: job.questions,
      perksAndBenefits: job.perksAndBenefits,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      datePosted: job.datePosted,
      status: job.status,
      applicantsCount: job.applicantsCount,
      viewsCount: job.viewsCount,
      orgPrimaryLocation: job.orgPrimaryLocation,
      about: job.about || {
        location: job.location?.[0] || job.orgPrimaryLocation || "Remote",
      },
    }

    return transformedJob
  } catch (error) {
    console.error("Redux fetchSingleJob error:", error)
    return rejectWithValue(error instanceof Error ? error.message : "Unable to load job details")
  }
})

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearSelectedJob: (state) => {
      state.selectedJob = null
      state.selectedJobError = null
    },
    clearError: (state) => {
      state.error = null
    },
    clearSelectedJobError: (state) => {
      state.selectedJobError = null
    },
    setSelectedJob: (state, action: PayloadAction<JobPosting>) => {
      state.selectedJob = action.payload
      state.selectedJobError = null
      state.selectedJobLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<JobPosting[]>) => {
        state.loading = false
        state.jobs = action.payload
        state.error = null
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        console.error("Jobs fetch rejected:", action.payload)
      })
      // Fetch single job
      .addCase(fetchSingleJob.pending, (state) => {
        state.selectedJobLoading = true
        state.selectedJobError = null
      })
      .addCase(fetchSingleJob.fulfilled, (state, action: PayloadAction<JobPosting>) => {
        state.selectedJobLoading = false
        state.selectedJob = action.payload
        state.selectedJobError = null
      })
      .addCase(fetchSingleJob.rejected, (state, action) => {
        state.selectedJobLoading = false
        state.selectedJobError = action.payload as string
      })
  },
})

export const { clearSelectedJob, clearError, clearSelectedJobError, setSelectedJob } = jobsSlice.actions
export default jobsSlice.reducer
