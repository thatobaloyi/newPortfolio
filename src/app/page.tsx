import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import Education from "./components/Education";
import Landing from "./components/Landing";
export default function Home() {
  return (
    <>
      {/* <Landing/> */}
      <AboutMe/>
      {/* <hr /> */}
      <Skills/>
      {/* <hr /> */}
      <WorkExperience/>
      {/* <hr /> */}
      <Education/>
    </>
  );
}
