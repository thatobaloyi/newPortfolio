import ProjectCard from "./ProjectCard";

interface GithubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
}

interface AxisAssetItem {
    id: string;
    name: string;
    slug: string;
    url: string;
}

interface AxisAssetsResponse {
    items: AxisAssetItem[];
}

const AXIS_BASE_URL = process.env.AXIS_BASE_URL ?? "https://www.useaxisapp.com";
const AXIS_PROJECTS_PLAYLIST_URL =
    process.env.AXIS_PROJECTS_PLAYLIST_URL ??
    "https://www.useaxisapp.com/api/assets/83b021f7-1fff-4cc2-a6e8-a39cbb510a32/projects/playlist";


const normalizeWords = (value: string): string => {
    return value
        .toLowerCase()
        .replace(/\.[a-z0-9]+$/i, "")
        .replace(/[^a-z0-9]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
};

const normalizeCompact = (value: string): string => normalizeWords(value).replace(/\s+/g, "");

const resolveAxisUrl = (rawUrl: string): string => {
    try {
        const parsed = new URL(rawUrl);
        if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
            const base = new URL(AXIS_BASE_URL);
            return `${base.origin}${parsed.pathname}`;
        }
        return rawUrl;
    } catch {
        return rawUrl;
    }
};

async function getAxisProjectImages() {
    const uri = AXIS_PROJECTS_PLAYLIST_URL;

    try {
        const response = await fetch(uri, {
            cache: "no-store",
        });

        if (!response.ok) {
            return { items: [] as AxisAssetItem[] };
        }

        const payload: AxisAssetsResponse = await response.json();
        return { items: payload.items ?? [] };
    } catch {
        return { items: [] as AxisAssetItem[] };
    }
}

function findAxisImageUrlForRepo(repoName: string, assets: AxisAssetItem[]): string | null {
    const repoWords = normalizeWords(repoName);
    const repoCompact = normalizeCompact(repoName);

    const directMatch = assets.find((item) => {
        const nameWords = normalizeWords(item.name);
        const slugWords = normalizeWords(item.slug);
        const nameCompact = normalizeCompact(item.name);
        const slugCompact = normalizeCompact(item.slug);

        return (
            nameWords === repoWords ||
            slugWords === repoWords ||
            nameCompact === repoCompact ||
            slugCompact === repoCompact
        );
    });

    return directMatch ? resolveAxisUrl(directMatch.url) : null;
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
        const filteredRepos = repos.filter((repo) => repo.name !== 'thatobaloyi')
        return { repos: filteredRepos };
    } catch {
        return { error: 'An unexpected error occurred.' };
    }
}

function ProjectSkeleton() {
    return (
        <div className="feature-card animate-pulse p-4">
            <div className="mb-4 h-44 w-full rounded-lg bg-muted"></div>
            <div className="mb-2 h-5 w-2/3 rounded bg-muted"></div>
            <div className="mb-2 h-4 w-full rounded bg-muted"></div>
            <div className="h-4 w-5/6 rounded bg-muted"></div>
        </div>
    );
}

async function Projects() {
    const [{ repos, error }, { items }] = await Promise.all([
        getGithubProjects(),
        getAxisProjectImages(),
    ]);

    return (
        <section className="panel mb-6 p-6 space-y-4">
            <p className="eyebrow">Work</p>
            <h2 className="section-title">Selected Projects</h2>
            <p className="section-subtitle text-sm md:text-base">
                A few things I have built and shared publicly.
            </p>
            {error && <p className="mb-6 text-center text-red-600">{error}</p>}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {repos ? (
                        repos.map((project: GithubRepo) => (
                            <a key={project.id} href={project.html_url} className="block transition-all duration-500" target="_blank" rel="noopener noreferrer">
                                <ProjectCard
                                    name={project.name}
                                    description={project.description}
                                    language={project.language}
                                    imageUrl={findAxisImageUrlForRepo(project.name, items)}
                                />
                            </a>
                        ))
                    ) : (
                        Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)
                    )}
            </div>
        </section>
    )
}

export default Projects;