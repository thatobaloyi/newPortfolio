// all the work experiences are shown in this card, -> fetched from the database and shown here.
// server

import WorkExperienceCard from "./WorkExperienceCard"

import prisma from "../../lib/prisma";

export default async function WorkExperience() {
  // will get this data from the database

  const data = await prisma.workExperience.findMany()
 
  return (
  
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Work Experience</h1>
      {data && data.length > 0 ? data.map((experience, index) => (
        <WorkExperienceCard key={index} workExperience={experience}/>
      )): <p className="text-center text-secondary">Work Experience Not Found</p>}
    </div>
  )
}
