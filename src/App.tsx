import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/ui/Loader";
import Cursor from "./components/ui/Cursor";
import ScrollProgress from "./components/ui/ScrollProgress";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <ScrollProgress />
      <Cursor />
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black">
        Skip to content
      </a>
      <Navbar ready={ready} />
      <main>
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
