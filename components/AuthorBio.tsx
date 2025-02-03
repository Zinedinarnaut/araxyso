import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface AuthorBioProps {
    name: string
    bio: string
    avatar: string
    className?: string
}

export function AuthorBio({ name, bio, avatar, className }: AuthorBioProps) {
    return (
        <div
            className={cn(
                "flex items-center space-x-4 bg-purple-900/10 border border-purple-500/20 rounded-lg p-4",
                className,
            )}
        >
            <Avatar className="h-16 w-16">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="text-lg font-semibold text-purple-200">{name}</h3>
                <p className="text-purple-200/70">{bio}</p>
            </div>
        </div>
    )
}

