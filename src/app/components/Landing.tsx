import Image from "next/image"
import Socials from "./Socials"
export default function Landing() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
            <div className="relative w-48 h-48 rounded-full overflow-hidden mb-8">
                <Image
                    src="https://media.licdn.com/dms/image/v2/D4D03AQHF5kgAU0Ki7A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731797429204?e=1755734400&v=beta&t=hhOx7Wo_Jljc8RsmG0GnNI0j_9KctENe7jWZwe1vPbI"
                    alt="Thato Baloyi Instagram Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full border-2 border-neutral-700 " // Subtle border
                />
            </div>
            {/* Name */}
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
                Thato Baloyi
            </h1>

            {/* Title/Role */}
            <p className="text-xl md:text-2xl text-gray-400 mb-4 text-center">
                Full Stack Developer (MERN) | Aspiring IT Technician
            </p>

            {/* Bio/Description */}
            <p className="text-base text-gray-400 max-w-md text-center">
                A 3rd-year Computer Science and Information Systems student at Rhodes University,
                I bring practical experience as a MERN Full Stack Developer, a Computer Science Tutor,
                and a Lecture Venue Technician. Passionate about building and supporting tech solutions.
            </p>
            <br />
            <Socials />
        </div>
    )
}
