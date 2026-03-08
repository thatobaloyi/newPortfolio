
import Image from "next/image"
import Socials from "./Socials"
import prisma from "../../lib/prisma"


export default async function Landing() {
    const data = await prisma.landing.findMany()
    const profile = data[0]
    const shortBio = (profile?.description ?? "I design and build software experiences that are practical, elegant, and performance-focused.")
        .split(".")
        .slice(0, 2)
        .join(".")
        .trim() + "."
    const email = 'thato2313321@gmail.com'
    return (
        <section className="relative px-4 pb-10 pt-28 md:pt-32">
            <div className="panel mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1.3fr_0.9fr] md:items-center md:px-10 md:py-14">
                <div>
                    <p className="eyebrow">Software Developer</p>
                    <h1 className="mb-2 max-w-2xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                        {profile?.name ?? "Thato Baloyi"}
                    </h1>

                    <p className="mb-4 text-lg text-muted-foreground md:text-xl">
                        {profile?.position ?? "Software Developer"}
                    </p>

                    <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                        {shortBio}
                    </p>

                    <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
                    <a
                        href={`mailto:${email}`}
                        className="btn-primary inline-flex h-9 items-center px-4 py-2 text-sm font-medium"
                        aria-label={`Get in touch with ${profile?.name ?? "Thato Baloyi"} via email`}
                    >
                        Get In Touch
                    </a>

                    <a
                        href='/files/resume.pdf'
                        className="btn-outline inline-flex h-9 items-center px-4 py-2 text-sm font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${profile?.name ?? "Thato Baloyi"} resume in a new tab`}
                    >
                        View Resume
                    </a>
                    </div>

                    <Socials />
                </div>

                <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
                    <div className="relative rounded-[2rem] border border-border/35 bg-white p-6 shadow-sm">
                        <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full border border-border/40 md:h-52 md:w-52">
                            <Image
                                src="https://www.useaxisapp.com/api/assets/5f7c1f5f-0184-4bec-ae11-5b206c85c91b/founder"
                                alt="Thato Baloyi Instagram Profile Picture"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="mt-5 text-center text-sm text-muted-foreground">
                            Full-stack developer focused on building practical, reliable products with strong backend architecture.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
