import { JobDetail } from "@/components/JobDetail"

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <JobDetail jobId={params.id} />
    </main>
  )
}
