"use client"
import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { JobPosting } from "@/lib/types"

interface JobCardProps {
  job: JobPosting
  onClick: () => void
 
}

export function JobCard({ job, onClick }: JobCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        
        {job.title.toLowerCase() === "social media manager" ? (
          <img
            src="/first.png"
            alt="Company logo"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
        ) : job.title.toLowerCase() === "web developer" ? (
          <img
            src="/second.jpg"
            alt="Company logo"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
        ) : job.title.toLowerCase() === "graphic designer" ? (
          <img
            src="/third.jpg"
            alt="Company logo"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
        ) : job.title.toLowerCase() === "data analyst" ? (
          <img
            src="/fourth.jpg"
            alt="Company logo"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />

        ) : job.title.toLowerCase() === "customer support specialist" ? (
          <img
            src="/first.png"
            alt="Company logo"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
        ) : null}

        <div className="flex-1">
          {/* Job title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-1 capitalize">{job.title}</h3>

          {/* Company and location */}
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
        <span>{job.company}</span>
        <span>•</span>
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>{job.about.location}</span>
        </div>
          </div>
          {/* Job description */}
          <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

          {/* Job details */}
          <div className="flex flex-wrap gap-2">
        <Badge className="bg-green-50 text-green-700 hover:bg-green-100 text-xs px-3 py-1 rounded-full">In Person</Badge> <span className="text-gray-300">|</span>
        <Badge className=" text-yellow-400 hover:bg-yellow-100 text-xs px-3 py-1 rounded-full" style={{ borderColor: "yellow"}}>Education</Badge>
        <Badge variant="outline" className="text-purple-600 border-purple-300 text-xs px-5 py-1 rounded-full" style={{ borderColor: "purple" }}>
          IT
        </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
