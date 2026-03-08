// socials

'use client'

import { SocialIcon } from "react-social-icons"

export default function Socials() {
    // get this list of links from the database?
    const data = ["https://www.youtube.com/@teamesb03", "https://github.com/thatobaloyi", "https://www.linkedin.com/in/thato-baloyi/", "https://www.instagram.com/teamesb/", "https://www.twitch.tv/teamesb03"]
    return (
        <div className="flex flex-wrap justify-center gap-3">
            {data.map((link) => (
                <SocialIcon
                    key={link}
                    url={link}
                    style={{ height: 34, width: 34 }}
                    bgColor="#0f172a"
                    fgColor="#f8fafc"
                    className="cursor-pointer rounded-md transition duration-200 hover:opacity-85"
                />
            ))}
        </div>
    )
}
