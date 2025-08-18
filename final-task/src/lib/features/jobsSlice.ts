import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { JobPosting } from "@/lib/types"
import { createBookmark, removeBookmark, getBookmarks } from "@/lib/api"
import { RootState } from "../store"

interface JobsState {
  jobs: JobPosting[]
  selectedJob: JobPosting | null
  bookmarkedJobs: JobPosting[]
  loading: boolean
  selectedJobLoading: boolean
  bookmarksLoading: boolean
  error: string | null
  selectedJobError: string | null
  bookmarksError: string | null
}

const initialState: JobsState = {
  jobs: [],
  selectedJob: null,
  bookmarkedJobs: [],
  loading: false,
  selectedJobLoading: false,
  bookmarksLoading: false,
  error: null,
  selectedJobError: null,
  bookmarksError: null,
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

// Fetch bookmarks async thunk
export const fetchBookmarks = createAsyncThunk(
  "jobs/fetchBookmarks",
  async (accessToken: string, { rejectWithValue, getState }) => {
    try {
      const result = await getBookmarks(accessToken)
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch bookmarks")
      }
      
      // Get the current state to access all jobs
      const state = getState() as RootState
      const allJobs = state.jobs.jobs
      
      // Map bookmarked job IDs to actual job objects
      const bookmarkedJobIds = result.data || []
      const bookmarkedJobs = allJobs.filter(job => bookmarkedJobIds.includes(job.id))
      
      console.log("Bookmarked jobs:", bookmarkedJobs)
      return bookmarkedJobs
    } catch (error) {
      console.error("Redux fetchBookmarks error:", error)
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch bookmarks")
    }
  }
)

export const toggleBookmark = createAsyncThunk(
  "jobs/toggleBookmark",
  async ({ jobId, isBookmarked, accessToken }: { jobId: string; isBookmarked: boolean; accessToken: string }, { rejectWithValue, dispatch }) => {
    try {
      let result
      if (isBookmarked) {
        result = await removeBookmark(jobId, accessToken)
      } else {
        result = await createBookmark(jobId, accessToken)
      }
      
      if (!result.success) {
        throw new Error(result.message || "Failed to toggle bookmark")
      }
      
      // Refresh bookmarks after toggling
      dispatch(fetchBookmarks(accessToken))
      
      return { jobId, isBookmarked: !isBookmarked }
    } catch (error) {
      console.error("Redux toggleBookmark error:", error)
      return rejectWithValue(error instanceof Error ? error.message : "Failed to toggle bookmark")
    }
  }
)

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
    clearBookmarksError: (state) => {
      state.bookmarksError = null
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
      // Fetch bookmarks
      .addCase(fetchBookmarks.pending, (state) => {
        state.bookmarksLoading = true
        state.bookmarksError = null
      })
      .addCase(fetchBookmarks.fulfilled, (state, action: PayloadAction<JobPosting[]>) => {
        state.bookmarksLoading = false
        state.bookmarkedJobs = action.payload
        state.bookmarksError = null
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.bookmarksLoading = false
        state.bookmarksError = action.payload as string
      })
      // Toggle bookmark
      .addCase(toggleBookmark.fulfilled, (state, action: PayloadAction<{ jobId: string; isBookmarked: boolean }>) => {
        const { jobId, isBookmarked } = action.payload
        
        // Update in jobs array
        const jobIndex = state.jobs.findIndex(job => job.id === jobId)
        if (jobIndex !== -1) {
          state.jobs[jobIndex].isBookmarked = isBookmarked
        }
        
        // Update in selected job
        if (state.selectedJob && state.selectedJob.id === jobId) {
          state.selectedJob.isBookmarked = isBookmarked
        }
        
        // Update in bookmarked jobs array
        if (isBookmarked) {
          const job = state.jobs.find(job => job.id === jobId)
          if (job && !state.bookmarkedJobs.find(bJob => bJob.id === jobId)) {
            state.bookmarkedJobs.push({ ...job, isBookmarked: true })
          }
        } else {
          state.bookmarkedJobs = state.bookmarkedJobs.filter(job => job.id !== jobId)
        }
      })
      .addCase(toggleBookmark.rejected, (state, action) => {
        state.bookmarksError = action.payload as string
      })
  },
})

export const { clearSelectedJob, clearError, clearSelectedJobError, clearBookmarksError, setSelectedJob } = jobsSlice.actions
export default jobsSlice.reducer
