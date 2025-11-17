
import Image from "next/image"
import Socials from "./Socials"
import prisma from "../../../lib/prisma"


export default async function Landing() {
    const data = await prisma.landing.findMany()
    const email = 'thato2313321@gmail.com'
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 pt-30" id="landing">

            <div className="relative w-40 h-40 rounded-full mb-8">
                <Image
                    src="https://media.licdn.com/dms/image/v2/D4D03AQHF5kgAU0Ki7A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731797429204?e=1755734400&v=beta&t=hhOx7Wo_Jljc8RsmG0GnNI0j_9KctENe7jWZwe1vPbI"
                    alt="Thato Baloyi Instagram Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full border-2 border-neutral-700" // Subtle border
                />
            </div>


            {/* Name */}
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center text-neutral-100">
                {data[0].name}
            </h1>

            {/* Title/Role */}
            <p className="text-xl md:text-2xl  mb-4 text-center text-neutral-100">
                {data[0].position}
            </p>

            {/* Bio/Description */}
            <p className="text-base  max-w-md text-center text-neutral-100">
                {data[0].description}
            </p>
            <br />
            <Socials />


            <div className="flex justify-center gap-5">
                <div className="mt-10">
                    <a
                        href={`mailto:${email}`}
                        className="px-6 py-3 text-lg font-semibold rounded-lg bg-neutral-200 text-neutral-900 hover:bg-neutral-300 transition-colors shadow-lg"
                        aria-label={`Get in touch with ${data[0].name} via email`}
                    >
                        📧 Get in Touch
                    </a>
                </div>

                <div className="mt-10">
                    <a
                        href='/files/resume.pdf'
                        className="px-6 py-3 text-lg font-semibold rounded-lg bg-neutral-900 text-neutral-200 hover:bg-neutral-300 transition-colors shadow-lg"
                        target="_blank"
                        aria-label={`Get in touch with ${data[0].name} via email`}
                    >
                        📄 Resume
                    </a>
                </div>
            </div>

            <Image src="https://cdn-icons-png.flaticon.com/128/15712/15712478.png" alt="" width={60} height={60} className="m-10" />
            {/* <button>Resume</button> */}

        </div>
    )
}
