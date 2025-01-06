import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getGithubRepos } from "../actions/github"
import { ChevronLeft, Star } from 'lucide-react'
import Link from 'next/link'

export default async function ProjectsPage() {
  const repos = await getGithubRepos()

  return (
    <div className="py-12">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <span className="text-purple-200/50">back to home</span>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Projects.exe
      </h1>

      <div className="space-y-4">
        {repos.map((repo) => (
          <Link 
            key={repo.id} 
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="p-6 bg-black/50 border border-purple-900/20 hover:border-purple-500/50 transition-colors group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold text-purple-200 group-hover:text-purple-100">
                    {repo.name}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-purple-200/50">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                </div>

                {repo.description && (
                  <p className="text-sm text-purple-200/70">
                    {repo.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {repo.language && (
                    <Badge variant="outline" className="border-purple-900/20 bg-black/50 text-purple-200/50">
                      {repo.language}
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-purple-900/20 bg-black/50 text-purple-200/50">
                    Updated: {new Date(repo.updated_at).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            </Card>
          </Link>
        ))}

        {repos.length === 0 && (
          <Card className="p-6 bg-black/50 border border-purple-900/20">
            <p className="text-purple-200/50 text-center">No repositories found</p>
          </Card>
        )}
      </div>
    </div>
  )
}

