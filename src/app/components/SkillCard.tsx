// app/components/SkillCard.tsx
"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import specific icons you need
import { faJs, faPython, faJava, faGitAlt, faReact, faNodeJs, faHtml5, faCss3Alt, faPhp, faGithub, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faFileCode, faN } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface SkillCardProps {
  name: string;
  icon: string;
}

const iconMap: { [key: string]: IconDefinition } = {
  "fa-brands fa-js": faJs,
  "fa-brands fa-python": faPython,
  "fa-brands fa-java": faJava,
  "fa-brands fa-git-alt": faGitAlt,
  "fa-solid fa-database": faDatabase,
  "fa-brands fa-react": faReact,
  "fa-brands fa-node-js": faNodeJs,
  "fa-solid fa-file-code": faFileCode,
  "fa-solid fa-n": faN,
  "fa-brands fa-html5": faHtml5,
  "fa-brands fa-css3-alt": faCss3Alt,
  "fa-brands fa-php": faPhp,
  "github": faGithub,
  "Microsoft": faMicrosoft,
};

export default function SkillCard({ name, icon }: SkillCardProps) {
  const IconComponent: IconDefinition | undefined = iconMap[icon];

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {IconComponent && <FontAwesomeIcon icon={IconComponent} className="text-lg mb-2 text-gray-700" />}
      <p className="text-lg font-medium text-gray-800">{name}</p>
    </div>
  );
}