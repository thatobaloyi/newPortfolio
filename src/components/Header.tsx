// Header component -> showing for each page
import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-border/30 bg-white/80 px-4 py-3 shadow-[0_14px_36px_rgba(15,23,42,0.12)] backdrop-blur-md md:px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground md:text-base">
          Thato Baloyi
        </Link>
        <nav className="flex items-center gap-1 text-sm md:gap-2 md:text-sm">
          <Link href="/" className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:bg-black/5 hover:text-foreground">Home</Link>
          <Link href="/blog" className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:bg-black/5 hover:text-foreground">Blog</Link>
          <Link href="/contact" className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:bg-black/5 hover:text-foreground">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
