// I will need to have types here to fetch information from the mongoDB database using prisma so I can dynamically show information on the website.

// about me, skills, workExperience(title, duration, description), education(title, institution, duration, description )

// types.ts

/**
 * Interface representing the "About Me" and general "Skills" information.
 * Corresponds to the `AboutMe` Prisma model.
 */
export interface AboutMe {
  id: string; // MongoDB's _id, represented as a string in Prisma Client
  aboutMe: string; // Text for the "about me" section
  skills: string[]; // Array of strings for general skills
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for last update
}

/**
 * Interface representing a single Work Experience entry.
 * Corresponds to the `WorkExperience` Prisma model.
 */
export interface WorkExperience {
  id: string; // MongoDB's _id, represented as a string
  company: string
  position: string; // e.g., "Software Engineer"
  duration: string; // e.g., "Jan 2020 - Dec 2023"
  description: string[]; // Detailed description of responsibilities/achievements
  skills: string[]; // Skills used in this specific work experience
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for last update
}

/**
 * Interface representing a single Education entry.
 * Corresponds to the `Education` Prisma model.
 */
// types.ts (Update this based on what you want to display)

export interface Education {
  title: string; // e.g., "Bachelor of Science (BSc) in Computer Science & Information Systems"
  institution: string; // e.g., "Rhodes University"
  duration: string; // e.g., "2022 - Present", "Expected Graduation: Late 2025"
  description: string | null; // Optional: A brief summary of your overall experience (like your introduction paragraph)
  keyCoursework: string[] | null; // Optional: ["Python", "Java", "Computer Networks", "Web Development"]
  achievements?: string[] | null; // Optional: ["Achieved first place in first-year computer science class"]
  // You could also add:
  // GPA?: string;
  // relevantProjects?: { title: string; link: string; }[];
}

// types/index.ts or app/components/types.ts

export interface Skill {
  _id: string; // MongoDB's default ID
  name: string;
  icon: string; // This will be the string representation of the icon (e.g., "fa-brands fa-js")
}

// You can also create a union type if you ever need to refer to any of these broadly
export type PortfolioItem = AboutMe | WorkExperience | Education | Skill;
