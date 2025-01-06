export function Footer() {
  return (
    <footer className="w-full border-t py-6">
      <div className="container flex justify-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} YourName. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

