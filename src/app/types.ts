// I will need to have types here to fetch information from the mongoDB database using prisma so I can dynamically show information on the website.

// about me, skills, workExperience(title, duration, description), education(title, institution, duration, description )

export interface WorkExperience{
    position: string,
    duration: string,
    description: string,
    skills: string[]
}

export interface Education {
    title: string,
    institution: string,
    duration: string,
    description: string
}