import {MapPin, PlusCircle, Flame, CalendarCheck, CalendarClock  } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { JobPosting } from "@/lib/types"

interface JobDetailProps {
  job: JobPosting
}

export function JobDetail({ job }: JobDetailProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex">
        {/* Left side - Main Content */}
        <div className="flex-1 p-8 pr-4">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{job.description}</p>
          </div>

          {/* Responsibilities */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h2>
            <ul className="space-y-3">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                    style={{
                      border: "2.5px solid #56CDAD",
                      backgroundColor: "transparent",
                    }}
                  >
                    <svg className="w-3 h-3" style={{ color: "#56CDAD" }} fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal Candidate */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ideal Candidate we want</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <span className="font-semibold text-gray-700">
                  <span>Young (</span>
                  {job.ideal_candidate.age} year old) {job.ideal_candidate.gender.toLowerCase()} social media manager
                </span>
              </div>
             {job.ideal_candidate.traits.map((trait, index) => {
                const colonIndex = trait.indexOf(":")
                if (colonIndex > 0) {
                  const boldPart = trait.substring(0, colonIndex + 1)
                  const regularPart = trait.substring(colonIndex + 1)
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">
                        <span className="font-semibold">{boldPart}</span>
                        {regularPart}
                      </span>
                    </div>
                  )
                } else {
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{trait}</span>
                    </div>
                  )
                }
              })}
            </div>
          </div>

          {/* When & Where */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">When & Where</h2>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center mt-0.5">
                <MapPin className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-gray-700">{job.when_where}</span>
            </div>
          </div>
        </div>

        {/* Right side - About Sidebar */}
        <div className="w-80 p-8 pl-4 ">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">About</h3>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center">
                <PlusCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Posted On</div>
                <div className="font-medium text-gray-900">{job.about.posted_on}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center">
                <Flame className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Deadline</div>
                <div className="font-medium text-gray-900">{job.about.deadline}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Location</div>
                <div className="font-medium text-gray-900">{job.about.location}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center">
                <CalendarClock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Start Date</div>
                <div className="font-medium text-gray-900">{job.about.start_date}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center">
                <CalendarCheck className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">End Date</div>
                <div className="font-medium text-gray-900">{job.about.end_date}</div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-2 border-gray-700" />
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {job.about.categories.map((category, index) => (
                <Badge
                  style={{ borderRadius: "80px" }}
                  key={index}
                  className={`font-semibold ${
                    category === "Marketing"
                      ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                      : "bg-green-50 text-green-600 hover:bg-green-100"
                  }`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          <hr className="my-6 border-2 border-gray-700" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.about.required_skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-blue-600 ">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
