'use server'

import { GitHubRepo } from '@/types/github'

export async function getGithubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch('https://api.github.com/users/zinedinarnaut/repos', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error('Failed to fetch repositories')
    }

    const repos = await response.json()
    return repos
      .filter((repo: GitHubRepo) => !repo.fork) // Filter out forked repositories
      .sort((a: GitHubRepo, b: GitHubRepo) => 
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}

