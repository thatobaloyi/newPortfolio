// Header component -> showing for each page
import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed w-screen left-0 top-0 m-auto z-10">
      <div className="flex shadow justify-between mx-15 lg:mx-100 mt-5 px-5 rounded-full backdrop">
        <Link href="/" className="text-sm md:text-base font-bold flex items-center">Thato Baloyi</Link>
        <nav className="flex gap-2">
          <Link href="/">Home</Link>
          {/* <Link href="/about">About</Link> */}
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  )
}
