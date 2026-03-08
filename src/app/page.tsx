
import Landing from "../components/Landing";
import Projects from "../components/Projects";
import PageWrapper from "../components/PageWrapper";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import WorkExperience from "../components/WorkExperience";

export default function Home() {
  return (
    <main className="relative">
      <PageWrapper>
        <Landing />
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
          {/* <AboutMe /> */}
          <Skills />
          {/* <WorkExperience /> */}
          <Projects />
        </div>
      </PageWrapper>
    </main>

  );
}
