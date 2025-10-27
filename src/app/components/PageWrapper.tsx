
import Footer from "./Footer"; 

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
    
  return (
    <>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}