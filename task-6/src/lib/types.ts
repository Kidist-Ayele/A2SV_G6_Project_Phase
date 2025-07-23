export interface JobPosting {
  title: string
  description: string
  responsibilities: string[]
  ideal_candidate: {
    age: string
    gender: string
    traits: string[]
  }
  when_where: string
  about: {
    posted_on: string
    deadline: string
    location: string
    start_date: string
    end_date: string
    categories: string[]
    required_skills: string[]
  }
  company: string
}

export interface JobData {
  job_postings: JobPosting[]
}

export interface Job {
  id: string
  title: string
  type: string
  company: {
    name: string
    logo: string
    description: string
  }
  location: string
  salary: string
  postedDate: string
  applicants: number
  description: string
  requirements: string[]
  skills: string[]
}
