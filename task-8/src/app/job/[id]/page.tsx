import { JobDetail } from "@/components/JobDetail";

interface JobDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-50">
      <JobDetail jobId={id} />
    </main>
  );
}
