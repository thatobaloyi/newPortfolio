// list of skills. -> each being a skill card
// server
import SkillCard from "./SkillCard";
import prisma from "../../lib/prisma"

export default async function Skills() {

  const skills = await prisma.skill.findMany();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h1 className="text-3xl font-bold mb-4">Skills</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills.length > 0 ? (
          skills.map((skill) => (
            // TypeScript will now check if 'skill' conforms to the Skill interface
            <SkillCard key={skill.id} name={skill.name} icon={skill.icon} />
          ))
        ) : (
          <p>No skills to display.</p>
        )}
      </div>
      
    </div>
  )
}
