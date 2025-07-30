// "use client";

// import { useEffect } from "react";
// import { JobDetail } from "@/components/JobDetail";
// import { LoadingSpinner } from "@/components/LoadingSpinner";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { fetchSingleJob, clearSelectedJob } from "@/lib/features/jobsSlice";
// import type { JobPosting } from "@/lib/types";

// interface JobDetailWrapperProps {
//   jobId: string;
// }

// export function JobDetailWrapper({ jobId }: JobDetailWrapperProps) {
//   const dispatch = useAppDispatch();
//   const { selectedJob, selectedJobLoading, selectedJobError, jobs } =
//     useAppSelector((state) => state.jobs);

//   useEffect(() => {
//     if (jobId) {
//       console.log("JobDetailWrapper: Fetching job with ID:", jobId);
//       dispatch(fetchSingleJob(jobId));
//     }

//     // Cleanup when component unmounts
//     return () => {
//       dispatch(clearSelectedJob());
//     };
//   }, [dispatch, jobId]);

//   // Show loading state
//   if (selectedJobLoading) {
//     return <LoadingSpinner />;
//   }

//   // If we have a job from Redux, show it
//   if (selectedJob) {
//     return <JobDetail job={selectedJob} />;
//   }

//   // If there's an error, try to find the job in the already loaded jobs list
//   if (selectedJobError) {
//     console.log(
//       "Error fetching single job, trying to find in jobs list:",
//       selectedJobError
//     );

//     // Try to find the job in the already loaded jobs
//     const jobFromList = jobs.find((job: JobPosting) => job.id === jobId);
//     if (jobFromList) {
//       console.log("Found job in jobs list:", jobFromList);
//       return <JobDetail job={jobFromList} />;
//     }

//     // Show error message but don't trigger not-found
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-8">
//         <div className="text-center">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">
//             Unable to Load Job Details
//           </h2>
//           <p className="text-gray-600 mb-4">
//             We're having trouble loading this job. Please try again.
//           </p>
//           <p className="text-sm text-gray-500">Error: {selectedJobError}</p>
//           <button
//             onClick={() => dispatch(fetchSingleJob(jobId))}
//             className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // If no job and no error, show a generic loading/empty state
//   return (
//     <div className="bg-white rounded-lg shadow-sm p-8">
//       <div className="text-center">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">
//           Loading Job Details...
//         </h2>
//         <p className="text-gray-600">
//           Please wait while we fetch the job information.
//         </p>
//       </div>
//     </div>
//   );
// }
