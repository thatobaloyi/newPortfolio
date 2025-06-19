// for each work experience information, just shows information about each work experience -> just how the card is structured.
import {WorkExperience} from "../types"

interface WorkExperienceCardProps {
  workExperience: WorkExperience
}

export default function WorkExperienceCard({workExperience} : WorkExperienceCardProps) {
  return (
    <div >
        <h5 className="text-lg font-bold">{workExperience.position}</h5>
        <p>{workExperience.description}</p>
        <ul>
            {workExperience.skills.map((skill)=> (
                <li key={skill}>{skill}</li>
            ))}
        </ul>
    </div>
  )
}
