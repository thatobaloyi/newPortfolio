// about me component
import prisma from "../../lib/prisma"

export default async function AboutMe() {
    const aboutmeInfo = await prisma.aboutMe.findMany()
    
    return (
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h1 className="text-3xl font-bold mb-4 text-center">About Me</h1>
            <p className="text-lg text-secondary">{aboutmeInfo[0].aboutMe}</p>
        </div>
    )
}
