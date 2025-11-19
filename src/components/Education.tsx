// this is a component that fetches educational information from the database and show each education on the browser using the education card component.
//server
import EducationCard from "./EducationCard"
import { Education as PrismaEducationType } from "@prisma/client"
import prisma from "../../lib/prisma"

export default async function Education() {
  // data to get from the database
  const data: PrismaEducationType[] = await prisma.education.findMany()

  return (
    <div>
      <h1>Education</h1>
      { data && data.length > 0 ? data.map((education: PrismaEducationType ) => (
        <EducationCard key={education.id} education={education} />
      )): "Educational background not found"}
    </div>
  )
}
