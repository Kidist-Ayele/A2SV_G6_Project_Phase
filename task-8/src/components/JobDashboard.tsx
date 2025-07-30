"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { JobCard } from "@/components/JobCard"
import type { JobPosting } from "@/lib/types"

interface JobDashboardProps {
  jobs: JobPosting[]
}

export function JobDashboard({ jobs }: JobDashboardProps) {
  const router = useRouter()
  const [sortBy, setSortBy] = useState("most-relevant")

  const handleJobClick = (job: JobPosting) => {
    router.push(`/job/${job.id}`)
  }

  // Sort jobs based on selected criteria
  const sortedJobs = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) {
      return []
    }

    const jobsCopy = [...jobs]

    switch (sortBy) {
      case "newest":
        return jobsCopy.sort((a, b) => {
          const dateA = new Date(a.datePosted || a.createdAt || 0).getTime()
          const dateB = new Date(b.datePosted || b.createdAt || 0).getTime()
          return dateB - dateA
        })
      case "oldest":
        return jobsCopy.sort((a, b) => {
          const dateA = new Date(a.datePosted || a.createdAt || 0).getTime()
          const dateB = new Date(b.datePosted || b.createdAt || 0).getTime()
          return dateA - dateB
        })
      case "most-relevant":
      default:
        return jobsCopy
    }
  }, [jobs, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-700">Opportunities</h1>
                <p className="text-gray-400 text-sm mt-1">Showing {sortedJobs.length} results</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="most-relevant">Most relevant</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Job Cards */}
          <div className="border-t border-gray-200">
            {sortedJobs.length > 0 ? (
              sortedJobs.map((job, index) => (
                <div key={job.id} className="border-b border-gray-200 last:border-b-0">
                  <div className="p-6">
                    <JobCard job={job} onClick={() => handleJobClick(job)} />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">No job opportunities found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
