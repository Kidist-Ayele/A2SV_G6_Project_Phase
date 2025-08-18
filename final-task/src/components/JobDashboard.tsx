"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/JobCard";
import { Bookmark, BookmarkCheck } from "lucide-react";
import type { JobPosting } from "@/lib/types";
import { fetchBookmarks } from "@/lib/features/jobsSlice";

interface JobDashboardProps {
  jobs: JobPosting[];
}

export function JobDashboard({ jobs }: JobDashboardProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { bookmarkedJobs, bookmarksLoading, bookmarksError } = useAppSelector(
    (state) => state.jobs
  );
  const [sortBy, setSortBy] = useState("most-relevant");
  const [showBookmarks, setShowBookmarks] = useState(false);

  const handleJobClick = (job: JobPosting) => {
    router.push(`/job/${job.id}`);
  };

  // Fetch bookmarks when user is authenticated
  useEffect(() => {
    if (session?.accessToken) {
      dispatch(fetchBookmarks(session.accessToken));
    }
  }, [session?.accessToken, dispatch]);

  // Sort jobs based on selected criteria
  const sortedJobs = useMemo(() => {
    const jobsToSort = showBookmarks ? bookmarkedJobs : jobs;

    if (!jobsToSort || !Array.isArray(jobsToSort)) {
      return [];
    }

    const jobsCopy = [...jobsToSort];

    switch (sortBy) {
      case "newest":
        return jobsCopy.sort((a, b) => {
          const dateA = new Date(a.datePosted || a.createdAt || 0).getTime();
          const dateB = new Date(b.datePosted || b.createdAt || 0).getTime();
          return dateB - dateA;
        });
      case "oldest":
        return jobsCopy.sort((a, b) => {
          const dateA = new Date(a.datePosted || a.createdAt || 0).getTime();
          const dateB = new Date(b.datePosted || b.createdAt || 0).getTime();
          return dateA - dateB;
        });
      case "most-relevant":
      default:
        return jobsCopy;
    }
  }, [jobs, bookmarkedJobs, sortBy, showBookmarks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-6">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
                  {showBookmarks ? "Bookmarked Opportunities" : "Opportunities"}
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  {showBookmarks
                    ? `Showing ${sortedJobs.length} bookmarked results`
                    : `Showing ${sortedJobs.length} results`}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                {/* Bookmarks toggle button for authenticated users */}
                {session?.accessToken && (
                  <Button
                    variant={showBookmarks ? "default" : "outline"}
                    onClick={() => setShowBookmarks(!showBookmarks)}
                    className="flex items-center gap-2 w-full sm:w-auto"
                    disabled={bookmarksLoading}
                  >
                    {showBookmarks ? (
                      <>
                        <BookmarkCheck className="w-4 h-4" />
                        <span className="hidden sm:inline">Bookmarked</span>
                        <span className="sm:hidden">Bookmarked</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                          {bookmarkedJobs.length}
                        </span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4" />
                        <span className="hidden sm:inline">Bookmarks</span>
                        <span className="sm:hidden">Bookmarks</span>
                        <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-600">
                          {bookmarkedJobs.length}
                        </span>
                      </>
                    )}
                  </Button>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                  <span className="text-sm text-gray-400 whitespace-nowrap">
                    Sort by:
                  </span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-40 border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-relevant">
                        Most relevant
                      </SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Job Cards */}
          <div className="border-t border-gray-200">
            {bookmarksLoading && showBookmarks ? (
              <div className="p-4 sm:p-6 text-center text-gray-500">
                Loading bookmarks...
              </div>
            ) : bookmarksError && showBookmarks ? (
              <div className="p-4 sm:p-6 text-center text-red-500">
                Error loading bookmarks: {bookmarksError}
              </div>
            ) : sortedJobs.length > 0 ? (
              sortedJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <div className="p-4 sm:p-6">
                    <JobCard job={job} onClick={() => handleJobClick(job)} />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 sm:p-6 text-center text-gray-500">
                {showBookmarks
                  ? "No bookmarked opportunities found. Start bookmarking jobs you're interested in!"
                  : "No job opportunities found."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
