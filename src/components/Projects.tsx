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

    try {
        const response = await fetch(API_URI, {
            next: { revalidate: 60 * 60 * 24 } // Revalidate cache max once a day
        });

        if (!response.ok) {
            return { error: 'Failed to fetch GitHub projects' };
        }

        const repos: GithubRepo[] = await response.json();
        return { repos };
    } catch (error) {
        return { error: 'An unexpected error occurred.' };
    }
}

function ProjectSkeleton() {
    return (
        <div className="bg-muted p-4 rounded-lg shadow-md animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
    );
}

async function Projects() {
    const { repos, error } = await getGithubProjects();

    return (
        <main className="m-8">
            <h1 className="text-3xl font-bold mb-8 text-center">My Projects</h1>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {repos ? (
                        repos.map((project: GithubRepo) => (
                            <a key={project.id} href={project.html_url} className="transition-all duration-500" target="_blank">
                                <ProjectCard name={project.name} description={project.description} html_url={project.html_url}
                                    language={project.language} />
                            </a>
                        ))
                    ) : (
                        Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)
                    )}
                </div>
            </div>
        </main>
    )
}

export default Projects;