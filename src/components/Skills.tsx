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
    <section className="panel mb-10 p-6 space-y-4">
      <p className="eyebrow">Toolkit</p>
      <h2 className="section-title">Core Skills</h2>
      <p className="section-subtitle text-sm md:text-base">
        Technologies I use to design, build, test, and ship software.
      </p>
      {Object.entries(groupedSkills).map(([category, skillsInCategory]) => (
        <div key={category} className="mb-8 last:mb-0">
          <h3 className="mb-4 inline-block rounded-md bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
            {category}
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {skillsInCategory.length > 0 ? (
              skillsInCategory.map((skill) => (
                <SkillCard key={skill.id} name={skill.name} icon={skill.icon} />
              ))
            ) : (
              <p className="text-center text-slate-500">No skills to display in this category.</p>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}
