// list of skills. -> each being a skill card
// server
import SkillCard from "./SkillCard";
import prisma from "../../lib/prisma"

interface Skill {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export default async function Skills() {
  const skills: Skill[] = await prisma.skill.findMany();

  const groupedSkills: { [key: string]: Skill[] } = skills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill);
    return acc;
  }, {} as { [key: string]: Skill[] });

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Skills</h1>
      {Object.entries(groupedSkills).map(([category, skillsInCategory]) => (
        <div key={category} className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{category}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skillsInCategory.length > 0 ? (
              skillsInCategory.map((skill) => (
                <SkillCard key={skill.id} name={skill.name} icon={skill.icon} />
              ))
            ) : (
              <p className="text-center text-secondary">No skills to display in this category.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
