
import Landing from "../components/Landing";
import Projects from "../components/Projects";
import PageWrapper from "../components/PageWrapper";

export default function Home() {
  return (
    <main>
      <PageWrapper>
        <Landing />
        <Projects />
      </PageWrapper>
    </main>

  );
}
