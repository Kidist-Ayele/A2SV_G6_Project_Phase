"use client";

import { useState } from "react";
import { MapPin, Bookmark, BookmarkCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { JobPosting } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleBookmark } from "@/lib/features/jobsSlice";

interface JobCardProps {
  job: JobPosting;
  onClick: () => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { bookmarkedJobs } = useAppSelector((state) => state.jobs);
  const [isBookmarking, setIsBookmarking] = useState(false);

  const logoUrl =
    job.logoUrl || job.orgLogo || "/placeholder.png?height=48&width=48";

  // Check if this job is bookmarked by looking in the bookmarkedJobs array
  const isBookmarked = bookmarkedJobs.some(
    (bookmarkedJob) => bookmarkedJob.id === job.id
  );

  const getLocationString = () => {
    if (job.about?.location) {
      return job.about.location;
    }
    if (job.location && job.location.length > 0) {
      return job.location.join(", ");
    }
    if (job.orgPrimaryLocation) {
      return job.orgPrimaryLocation;
    }
    return "Remote";
  };

  const handleBookmarkToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking bookmark button

    if (!session?.accessToken) {
      // Redirect to signin or show message
      return;
    }

    setIsBookmarking(true);
    try {
      await dispatch(
        toggleBookmark({
          jobId: job.id,
          isBookmarked: isBookmarked,
          accessToken: session.accessToken,
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    } finally {
      setIsBookmarking(false);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer relative"
      onClick={onClick}
      data-testid="job-card"
    >
      {/* Bookmark button - positioned absolutely in top-right corner */}
      {session?.accessToken && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 z-10 hover:bg-gray-100"
          onClick={handleBookmarkToggle}
          disabled={isBookmarking}
          data-testid="bookmark-button"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 fill-current" />
          ) : (
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-blue-600" />
          )}
        </Button>
      )}

      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        {/* Company Logo from API data */}
        <img
          src={logoUrl || "/placeholder.png?height=48&width=48"}
          alt={`${job.company || "Company"} logo`}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0 self-center sm:self-start"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png?height=48&width=48";
          }}
        />

        <div className="flex-1 min-w-0">
          {/* Job title */}
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-1 line-clamp-2">
            {job.title}
          </h2>

          {/* Company and location */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-gray-400 text-sm mb-2 sm:mb-3">
            <span className="font-medium">{job.company}</span>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{getLocationString()}</span>
            </div>
          </div>

          {/* Job description */}
          <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
            {job.description}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center">
            {job.opType && (
              <>
                <Badge className="bg-green-50 text-green-700 hover:bg-green-100 text-xs px-2 sm:px-3 py-1 rounded-full">
                  {job.opType}
                </Badge>
                <span className="text-gray-300 hidden sm:inline">|</span>
              </>
            )}

            {/* Categories from API */}
            {job.categories && job.categories.length > 0 && (
              <>
                {job.categories.slice(0, 2).map((category, index) => (
                  <Badge
                    key={index}
                    className="text-yellow-400 hover:bg-yellow-100 text-xs px-2 sm:px-3 py-1 rounded-full"
                    style={{ borderColor: "yellow" }}
                  >
                    {category}
                  </Badge>
                ))}
                {job.categories.length > 2 && (
                  <span className="text-gray-300 hidden sm:inline">|</span>
                )}
              </>
            )}

            {/* Required skills as badges */}
            {job.requiredSkills &&
              job.requiredSkills.length > 0 &&
              job.requiredSkills.slice(0, 1).map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-purple-600 border-purple-300 text-xs px-3 sm:px-5 py-1 rounded-full"
                  style={{ borderColor: "purple" }}
                >
                  {skill}
                </Badge>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
