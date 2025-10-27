// socials

'use client'

import { SocialIcon } from "react-social-icons"

export default function Socials() {
    // get this list of links from the database?
    const data = ["https://www.youtube.com/@teamesb03", "https://github.com/thatobaloyi", "https://www.linkedin.com/in/thato-baloyi/", "https://www.instagram.com/teamesb/", "https://www.twitch.tv/teamesb03"]
    return (
        <div className="flex gap-2 justify-center">
            {data.map((link) => (
                <SocialIcon key={link} url={link} style={{ height: 30, width: 30 }} bgColor="#363636" className="cursor-pointer transition-all duration-300 hover:p-5" />
            ))}
        </div>
    )
}
