import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import ScrollManager from "./components/ScrollManager";
import NatureBackground from "./components/NatureBackground";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import DataEngineering from "./pages/DataEngineering";
import Cards from "./pages/Cards";
import { useTheme } from "./hooks/useTheme";

// React details pulls in the 3D atom scene, so load it on demand.
const ReactDetails = lazy(() => import("./pages/ReactDetails"));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/data-engineering" element={<PageTransition><DataEngineering /></PageTransition>} />
        <Route path="/cards" element={<PageTransition><Cards /></PageTransition>} />
        <Route
          path="/react"
          element={
            <PageTransition>
              <Suspense fallback={<div className="min-h-screen" />}>
                <ReactDetails />
              </Suspense>
            </PageTransition>
          }
        />
        <Route path="*" element={<PageTransition><Home /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <ScrollManager />
      <div className="relative min-h-screen flex flex-col bg-ink text-text">
        <NatureBackground />
        <div className="grain" />
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="relative z-10 flex-1">
          <AnimatedRoutes />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
