import Image from "next/image"

interface ProjectCardProps {
  name: string;
  description: string | null;
  language: string | null;
}

function ProjectCard({ name, description, language }: ProjectCardProps) {
  return (
    <article className="feature-card h-full overflow-hidden p-4 md:p-5">
      <div className="relative mb-4 h-44 overflow-hidden rounded-xl bg-muted">
        <Image
          src={`/images/${name}.png`}
          alt={`${name} preview`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h3 className="mb-2 text-lg font-semibold capitalize tracking-tight text-foreground">
        {name}
      </h3>
      <p className="mb-4 line-clamp-3 text-sm text-muted-foreground md:text-base">{description || 'No description provided.'}</p>
      {language && (
        <p className="mt-auto text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Primary stack <span className="ml-2 rounded-full bg-slate-900 px-2.5 py-1 text-white">{language}</span>
        </p>
      )}
    </article>
  )
}

export default ProjectCard