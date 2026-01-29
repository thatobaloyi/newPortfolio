import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const skillsData = [
    // Programming
    { name: 'Java', icon: 'faJava', category: 'Programming' },
    { name: 'Python', icon: 'faPython', category: 'Programming' },
    { name: 'C', icon: 'faC', category: 'Programming' },
    { name: 'JavaScript (ES6+)', icon: 'faJsSquare', category: 'Programming' },
    { name: 'PHP', icon: 'faPhp', category: 'Programming' },
    { name: 'SQL', icon: 'faDatabase', category: 'Programming' },
    { name: 'Assembly (x86)', icon: 'faMicrochip', category: 'Programming' },

    // Frameworks/Web
    { name: 'React.js', icon: 'faReact', category: 'Frameworks/Web' },
    { name: 'Next.js', icon: 'faNextjs', category: 'Frameworks/Web' }, // Assuming a custom icon or similar
    { name: 'Node.js', icon: 'faNodeJs', category: 'Frameworks/Web' },
    { name: 'Express.js', icon: 'faServer', category: 'Frameworks/Web' }, // Generic server icon
    { name: 'Nest.js', icon: 'faNestjs', category: 'Frameworks/Web' }, // Assuming a custom icon or similar
    { name: 'HTML5', icon: 'faHtml5', category: 'Frameworks/Web' },
    { name: 'CSS3', icon: 'faCss3Alt', category: 'Frameworks/Web' },

    // Databases
    { name: 'MySQL', icon: 'faDatabase', category: 'Databases' },
    { name: 'PostgreSQL', icon: 'faDatabase', category: 'Databases' },
    { name: 'MongoDB (NoSQL)', icon: 'faLeaf', category: 'Databases' }, // MongoDB icon is a leaf

    // Tools
    { name: 'Linux', icon: 'faLinux', category: 'Tools' },
    { name: 'Windows', icon: 'faWindows', category: 'Tools' },
    { name: 'macOS', icon: 'faApple', category: 'Tools' },
    { name: 'Git', icon: 'faGitAlt', category: 'Tools' },
    { name: 'GitHub', icon: 'faGithub', category: 'Tools' },
    { name: 'VS Code', icon: 'faCode', category: 'Tools' }, // Generic code editor icon
  ];

  for (const data of skillsData) {
    await prisma.skill.upsert({
      where: { name: data.name },
      update: data,
      create: data,
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
