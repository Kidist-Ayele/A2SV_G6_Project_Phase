"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchSingleJob, clearSelectedJob } from "@/lib/features/jobsSlice";
import {
  MapPin,
  PlusCircle,
  Flame,
  CalendarCheck,
  CalendarClock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

interface JobDetailProps {
  jobId: string;
}

export function JobDetail({ jobId }: JobDetailProps) {
  const dispatch = useAppDispatch();

 
  const {
    selectedJob,
    selectedJobLoading,
    selectedJobError,
    jobs, 
  } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    console.log("JobDetail: Fetching job with ID:", jobId);
    dispatch(fetchSingleJob(jobId));

    return () => {
      dispatch(clearSelectedJob());
    };
  }, [dispatch, jobId]);

  // Debug logs
  console.log("JobDetail state:", {
    selectedJob,
    selectedJobLoading,
    selectedJobError,
    jobId,
  });

  // Fallback: try to find job in the jobs array if selectedJob is null
  const job = selectedJob || jobs.find((j) => j.id === jobId);

  if (selectedJobLoading) {
    return <LoadingSpinner />;
  }

  if (selectedJobError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
        </div>
        <ErrorMessage message={selectedJobError} />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4 bg-gray-100 hover:bg-gray-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-lg">Job not found.</p>
          <p className="text-gray-400 text-sm mt-2">Job ID: {jobId}</p>
          <p className="text-gray-400 text-sm">Available jobs: {jobs.length}</p>
        </div>
      </div>
    );
  }

  // Helper functions to safely parse data
  const parseResponsibilities = (responsibilities: string) => {
    if (!responsibilities) return [];
    return responsibilities.split("\n").filter((item) => item.trim() !== "");
  };

  const parseIdealCandidate = (idealCandidate: string) => {
    if (!idealCandidate) return [];
    return idealCandidate.split("\n").filter((item) => item.trim() !== "");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getLocationString = () => {
    if (job.about?.location) {
      return job.about.location;
    }
    if (job.location && job.location.length > 0) {
      return job.location.join(", ");
    }
    return job.orgPrimaryLocation || "Remote";
  };

  const responsibilities = parseResponsibilities(job.responsibilities || "");
  const idealCandidateTraits = parseIdealCandidate(job.idealCandidate || "");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/">
            <Button
            variant="ghost"
            className="mb-4 bg-gray-100 hover:bg-gray-200"
            >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
            </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex">
          {/* Left side - Main Content */}
          <div className="flex-1 p-8 pr-4">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            {responsibilities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Responsibilities
                </h2>
                <ul className="space-y-3">
                  {responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                        style={{
                          border: "2.5px solid #56CDAD",
                          backgroundColor: "transparent",
                        }}
                      >
                        <svg
                          className="w-3 h-3"
                          style={{ color: "#56CDAD" }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">
                        {responsibility.trim()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ideal Candidate */}
            {idealCandidateTraits.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Ideal Candidate we want
                </h2>
                <div className="space-y-4">
                  {idealCandidateTraits.map((trait, index) => {
                    const colonIndex = trait.indexOf(":");
                    if (colonIndex > 0) {
                      const boldPart = trait.substring(0, colonIndex + 1);
                      const regularPart = trait.substring(colonIndex + 1);
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">
                            <span className="font-semibold">{boldPart}</span>
                            {regularPart}
                          </span>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{trait.trim()}</span>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            )}

            {/* When & Where */}
            {job.whenAndWhere && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  When & Where
                </h2>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center mt-0.5">
                    <MapPin className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-gray-700">{job.whenAndWhere}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right side - About Sidebar */}
          <div className="w-80 p-8 pl-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-6">About</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center">
                  <PlusCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Posted On</div>
                  <div className="font-medium text-gray-700">
                    {formatDate(job.datePosted || job.createdAt || "")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center">
                  <Flame className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Deadline</div>
                  <div className="font-medium text-gray-700">
                    {formatDate(job.deadline || "")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Location</div>
                  <div className="font-medium text-gray-700">
                    {getLocationString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center">
                  <CalendarClock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Start Date</div>
                  <div className="font-medium text-gray-700">
                    {formatDate(job.startDate || "")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center">
                  <CalendarCheck className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">End Date</div>
                  <div className="font-medium text-gray-700">
                    {formatDate(job.endDate || "")}
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-6 border-2 border-gray-700" />

            {/* Categories - Fixed with safe access */}
            {job.categories && job.categories.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {job.categories.map((category, index) => (
                    <Badge
                      style={{ borderRadius: "80px" }}
                      key={index}
                      className={`font-semibold ${
                        index === 0
                          ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <hr className="my-6 border-2 border-gray-700" />

            {/* Required Skills - Fixed with safe access */}
            {job.requiredSkills && job.requiredSkills.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">
                  Required Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-blue-600"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
