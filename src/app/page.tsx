
import Landing from "../components/Landing";
import Projects from "../components/Projects";
import PageWrapper from "../components/PageWrapper";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import WorkExperience from "../components/WorkExperience";

export default function Home() {
  return (
    <main>
      <PageWrapper>
        <Landing />
        <div className="container mx-auto px-4 py-8">
          {/* <AboutMe /> */}
          <Skills />
          {/* <WorkExperience /> */}
          <Projects />
        </div>
      </PageWrapper>
    </main>

  );
}
