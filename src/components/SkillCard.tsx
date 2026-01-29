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

export default function SkillCard({ name, icon }: SkillCardProps) {
  const IconComponent: IconDefinition | undefined = iconMap[icon];

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {IconComponent && <FontAwesomeIcon icon={IconComponent} className="text-3xl mb-2 text-primary" />}
      <p className="text-lg font-medium text-text text-center">{name}</p>
    </div>
  );
}