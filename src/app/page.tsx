import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import Education from "./components/Education";
import Landing from "./components/Landing";
export default function Home() {
  return (
    <>
      <Landing />
      <main className="m-10 md:m-35 pb-30">
        <AboutMe />
        <br />
        {/* <hr /> */}
        <Skills />
        <br />
        {/* <hr /> */}
        <WorkExperience />
        <br />
        {/* <hr /> */}
        <Education />
      </main>
    </>
  );
}
