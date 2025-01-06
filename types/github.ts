export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  created_at: string
  updated_at: string
  language: string | null
  stargazers_count: number
  fork: boolean
}

