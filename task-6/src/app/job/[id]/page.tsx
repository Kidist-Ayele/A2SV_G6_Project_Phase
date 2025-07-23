import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JobDetail } from "@/components/JobDetail"
import { jobsData } from "@/lib/jobsData"

interface JobPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function JobPage({ params }: JobPageProps) {
  const { id } = await params
  const jobIndex = Number.parseInt(id)
  const job = jobsData.job_postings[jobIndex]

  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              Back to Job List
            </Button>
          </Link>
        </div>

        {/* Job Detail */}
        <JobDetail job={job} />
      </div>
    </div>
  )
}
