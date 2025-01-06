import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react'

export function Profile() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="absolute bottom-0 left-4 transform translate-y-1/2">
          <div className="rounded-full border-4 border-background">
            <img
              alt="Profile picture"
              className="rounded-full object-cover"
              height="80"
              src="/placeholder.svg?height=80&width=80"
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width="80"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">YourName</h2>
            <p className="text-sm text-muted-foreground">@yourusername</p>
          </div>
          <Badge variant="secondary" className="mt-1">
            Online
          </Badge>
        </div>
        <Separator className="my-4" />
        <p className="text-sm">
          Full-stack developer passionate about creating beautiful and functional web applications.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="icon">
          <GithubIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <TwitterIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <LinkedinIcon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

