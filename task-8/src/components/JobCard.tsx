"use client"

import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { JobPosting } from "@/lib/types"

interface JobCardProps {
  job: JobPosting
  onClick: () => void
}

export function JobCard({ job, onClick }: JobCardProps) {
  

  const logoUrl = job.logoUrl || job.orgLogo || "/placeholder.png?height=48&width=48"

  
  const getLocationString = () => {
   
    if (job.about?.location) {
      return job.about.location
    }
    if (job.location && job.location.length > 0) {
      return job.location.join(", ")
    }
    if (job.orgPrimaryLocation) {
      return job.orgPrimaryLocation
    }
    return "Remote"
  }

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Company Logo from API data */}
        <img
          src={logoUrl || "/placeholder.png?height=48&width=48"}
          alt={`${job.company || "Company"} logo`}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
          
            e.currentTarget.src = "/placeholder.png?height=48&width=48"
          }}
        />

        <div className="flex-1">
          {/* Job title */}
          <h2 className="text-lg font-semibold text-gray-700 mb-1">{job.title}</h2>

          {/* Company and location */}
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
            <span>{job.company}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{getLocationString()}</span>
            </div>
          </div>

          {/* Job description */}
          <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

        
          <div className="flex flex-wrap gap-2 items-center">
            {job.opType && (
              <>
                <Badge className="bg-green-50 text-green-700 hover:bg-green-100 text-xs px-3 py-1 rounded-full">
                  {job.opType}
                </Badge>
                <span className="text-gray-300">|</span>
              </>
            )}

            {/* Categories from API */}
            {job.categories && job.categories.length > 0 && (
              <>
                {job.categories.slice(0, 2).map((category, index) => (
                  <Badge
                    key={index}
                    className=" text-yellow-400 hover:bg-yellow-100 text-xs px-3 py-1 rounded-full" style={{ borderColor: "yellow"}}
                  >
                    {category}
                  </Badge>
                ))}
                {job.categories.length > 2 && <span className="text-gray-300">|</span>}
              </>
            )}

            {/* Required skills as badges */}
            {job.requiredSkills &&
              job.requiredSkills.length > 0 &&
              job.requiredSkills.slice(0, 1).map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-purple-600 border-purple-300 text-xs px-5 py-1 rounded-full" style={{ borderColor: "purple" }}
                >
                  {skill}
                </Badge>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
