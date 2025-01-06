import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Your Name
        </Link>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/#about">About</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#skills">Skills</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#projects">Projects</Link>
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}

