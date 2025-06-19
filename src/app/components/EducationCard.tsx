// Education Card -> showing each education information.
import { Education } from "../types"

interface EducationCardProps {
    education: Education
}

export default function EducationCard({ education }: EducationCardProps) {
    return (
        <div>
            <h5 className="text-lg font-bold">{education.institution}</h5>
            <p>{education.description}</p>
        </div>
    )
}
