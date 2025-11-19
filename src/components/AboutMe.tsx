// about me component
import prisma from "../../lib/prisma"

export default async function AboutMe() {
    const aboutmeInfo = await prisma.aboutMe.findMany()
    
    return (
        <>
        <h1>About Me</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <p>{aboutmeInfo[0].aboutMe}</p>
        </div>
        </>
    )
}
