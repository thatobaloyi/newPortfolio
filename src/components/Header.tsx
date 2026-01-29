// Header component -> showing for each page
import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed w-screen left-0 top-0 m-auto z-10">
      <div className="flex shadow justify-between mx-auto max-w-5xl mt-5 px-5 rounded-full bg-white/30 backdrop-blur-sm">
        <Link href="/" className="text-sm md:text-base font-bold flex items-center text-black/60">Thato Baloyi</Link>
        <nav className="flex gap-4 items-center">
          <Link href="/" className="text-black/60  hover:text-primary transition-colors">Home</Link>
          {/* <Link href="/about" className="text-secondary hover:text-primary transition-colors">About</Link> */}
          <Link href="/blog" className="text-black/60 hover:text-primary transition-colors">Blog</Link>
          <Link href="/contact" className="text-black/60 hover:text-primary transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
