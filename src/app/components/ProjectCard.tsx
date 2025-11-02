import Image from "next/image"

interface ProjectCardProps {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
}

function ProjectCard({ name, description, html_url, language }: ProjectCardProps) {
  return (
    <div className="flex flex-col p-4 bg-gray-100 justify-center items-center gap-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">

      <Image src={`/images/${name}.png`} alt="" width={500} height={500}
        className="rounded-md mb-4" />
      {/* Name, with URL Link */}
      <h5 className="text-lg font-medium text-gray-800 hover:text-gray-400 hover:text-xl transition-all duration-500">
        <a href={html_url} target="_blank">{name}</a>
      </h5>

      {/* Description */}
      <p>{description || 'No Description Provided.'}</p>

      {/* Language */}
      {language && <p>Primary Language: <span className="bg-blue-200 text-gray-800 text-xs px-3 py-1 cursor-pointer rounded-full hover:bg-blue-300 transition-colors duration-200">{language}</span></p>}
    </div>
  )
}

export default ProjectCard