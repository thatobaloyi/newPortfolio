// all the work experiences are shown in this card, -> fetched from the database and shown here.
// server

import WorkExperienceCard from "./WorkExperienceCard"

import prisma from "../../lib/prisma";

export default async function WorkExperience() {
  // will get this data from the database

  const data = await prisma.workExperience.findMany()
 
  return (
  
    <div>
      <h1>Work Expericence</h1>
      {data && data.length > 0 ? data.map((experience, index) => (
        <WorkExperienceCard key={index} workExperience={experience}/>
      )): "Work Experience Not Found"}
    </div>
  )
}
