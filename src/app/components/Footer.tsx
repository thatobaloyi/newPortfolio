// footer component -> showing for each page on the website.
import Socials from "./Socials"
export default function Footer() {
  return (
    <div className="text-center p-5 absolute bottom-0 w-full">
        <p>&copy; Thato Baloyi { new Date().getFullYear()}</p>
        <Socials/>
    </div>
  )
}
