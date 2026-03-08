// app/components/SkillCard.tsx
"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import specific icons you need
import { 
  faJsSquare, faPython, faJava, faPhp, faReact, faNodeJs, faHtml5, faCss3Alt, 
  faGitAlt, faGithub, faLinux, faWindows, faApple 
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faMicrochip, faServer, faCode, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface SkillCardProps {
  name: string;
  icon: string;
}

const iconMap: { [key: string]: IconDefinition } = {
  // Programming
  'faJava': faJava,
  'faPython': faPython,
  'faC': faCode, // Using faCode for C, as there's no specific faC
  'faJsSquare': faJsSquare,
  'faPhp': faPhp,
  'faDatabase': faDatabase, // For SQL
  'faMicrochip': faMicrochip, // For Assembly (x86)

  // Frameworks/Web
  'faReact': faReact,
  'faNextjs': faJsSquare, // Using faJsSquare for Next.js, as there's no specific faNextjs
  'faNodeJs': faNodeJs,
  'faServer': faServer, // For Express.js
  'faNestjs': faCode, // Using faCode for Nest.js, as there's no specific faNestjs
  'faHtml5': faHtml5,
  'faCss3Alt': faCss3Alt,

  // Databases
  'faLeaf': faLeaf, // For MongoDB (NoSQL)

  // Tools
  'faLinux': faLinux,
  'faWindows': faWindows,
  'faApple': faApple, // For macOS
  'faGitAlt': faGitAlt,
  'faGithub': faGithub,
  'faCode': faCode, // For VS Code
};

const iconToneMap: { [key: string]: string } = {
  faJava: "bg-orange-100 text-orange-700",
  faPython: "bg-sky-100 text-sky-700",
  faC: "bg-slate-100 text-slate-700",
  faJsSquare: "bg-amber-100 text-amber-700",
  faPhp: "bg-indigo-100 text-indigo-700",
  faDatabase: "bg-cyan-100 text-cyan-700",
  faMicrochip: "bg-zinc-100 text-zinc-700",
  faReact: "bg-blue-100 text-blue-700",
  faNextjs: "bg-neutral-100 text-neutral-700",
  faNodeJs: "bg-emerald-100 text-emerald-700",
  faServer: "bg-violet-100 text-violet-700",
  faNestjs: "bg-rose-100 text-rose-700",
  faHtml5: "bg-orange-100 text-orange-700",
  faCss3Alt: "bg-blue-100 text-blue-700",
  faLeaf: "bg-green-100 text-green-700",
  faLinux: "bg-yellow-100 text-yellow-700",
  faWindows: "bg-sky-100 text-sky-700",
  faApple: "bg-slate-100 text-slate-700",
  faGitAlt: "bg-orange-100 text-orange-700",
  faGithub: "bg-neutral-100 text-neutral-700",
  faCode: "bg-zinc-100 text-zinc-700",
};

export default function SkillCard({ name, icon }: SkillCardProps) {
  const IconComponent: IconDefinition | undefined = iconMap[icon];
  const iconTone = iconToneMap[icon] ?? "bg-slate-100 text-slate-700";

  return (
    <div className="feature-card flex min-h-28 flex-col items-center justify-center p-4 text-center">
      {IconComponent && (
        <span className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-black/5 ${iconTone}`}>
          <FontAwesomeIcon icon={IconComponent} className="text-xl" />
        </span>
      )}
      <p className="text-sm font-semibold tracking-tight text-foreground md:text-base">{name}</p>
    </div>
  );
}