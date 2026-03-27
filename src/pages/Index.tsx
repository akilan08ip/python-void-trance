import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/HeroSection";
import CodeInputSection from "@/components/CodeInputSection";
import ExplanationSection from "@/components/ExplanationSection";
import FlowchartSection from "@/components/FlowchartSection";
import CodeQuizSection from "@/components/CodeQuizSection";
import PythonRoadmapSection from "@/components/PythonRoadmapSection";
import PythonBlogSection from "@/components/PythonBlogSection";
import BeginnerSection from "@/components/BeginnerSection";
import WelcomePopup from "@/components/WelcomePopup";
import DateTimeDisplay from "@/components/DateTimeDisplay";
import PythonChatbot from "@/components/PythonChatbot";
import Navbar from "@/components/Navbar";

const Index = () => {
  const [tracedCode, setTracedCode] = useState<string | null>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStart = () => scrollTo(codeRef);

  const handleTrace = (code: string) => {
    setTracedCode(code);
    setTimeout(() => scrollTo(explanationRef), 100);
  };

  return (
    <div className="relative min-h-screen pt-14">
      <ParticleBackground />
      <Navbar />
      <DateTimeDisplay />
      <WelcomePopup />
      <PythonChatbot />

      <HeroSection onStart={handleStart} />

      <div ref={codeRef} id="code-input">
        <CodeInputSection onTrace={handleTrace} />
      </div>

      <AnimatePresence>
        {tracedCode && (
          <motion.div
            ref={explanationRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ExplanationSection code={tracedCode} />
            <FlowchartSection code={tracedCode} />
            <CodeQuizSection code={tracedCode} />
          </motion.div>
        )}
      </AnimatePresence>

      <PythonBlogSection />
      <PythonRoadmapSection />
      <BeginnerSection />
    </div>
  );
};

export default Index;
