import ProjectCard from "./ProjectCard";

interface GithubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
}

async function getGithubProjects() {
    const GITHUB_USERNAME = 'thatobaloyi';
    const API_URI = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

    const response = await fetch(API_URI, {
        next: { revalidate: 60 * 60 * 24 } // Revalidate cache max once a day
    });

    if (!response.ok) {

        throw new Error('Failed to fetch GitHub projects');
    }

    const repos: GithubRepo[] = await response.json();

    return repos

}


async function Projects() {
    const projects = await getGithubProjects();

    return (
        <main className="m-8">
            <h1>My Projects</h1>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project: GithubRepo) => (
                        <a key={project.id} href={project.html_url} className="transition-all duration-500" target="_blank">
                            <ProjectCard  name={project.name} description={project.description} html_url={project.html_url}
                                language={project.language} />
                        </a>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Projects