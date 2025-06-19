import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import Education from "./components/Education";
import Landing from "./components/Landing";
export default function Home() {
  return (
    <>
      <Landing/>
      <AboutMe/>
      <br />
      {/* <hr /> */}
      <Skills/>
      <br />
      {/* <hr /> */}
      <WorkExperience/>
      <br />
      {/* <hr /> */}
      <Education/>
    </>
  );
}
