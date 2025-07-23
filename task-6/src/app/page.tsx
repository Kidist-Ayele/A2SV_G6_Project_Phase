import { JobDashboard } from "@/components/JobDashboard"
import { jobsData } from "@/lib/jobsData"

export default function Home() {
  return <JobDashboard jobs={jobsData.job_postings} />
}
