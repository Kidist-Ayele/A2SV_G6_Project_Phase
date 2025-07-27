"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchJobs } from "@/lib/features/jobsSlice"
import { JobDashboard } from "@/components/JobDashboard"
import LoadingSpinner from "@/components/LoadingSpinner"
import ErrorMessage from "@/components/ErrorMessage"

export default function Home() {
  const dispatch = useAppDispatch()
  const { jobs, loading, error } = useAppSelector((state) => state.jobs)

  useEffect(() => {
    dispatch(fetchJobs())
  }, [dispatch])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <main>
      <JobDashboard jobs={jobs} />
    </main>
  )
}
