"use client"

import { useState } from "react"
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

  const handleJobClick = (jobIndex: number) => {
    router.push(`/job/${jobIndex}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-700">Opportunities</h1>
                <p className="text-gray-400 text-sm mt-1">Showing 73 results</p>
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
            {jobs.map((job, index) => {
              
              return (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <div className="p-6">
                    <JobCard
                      job={job}
                      onClick={() => handleJobClick(index)}
                      
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
