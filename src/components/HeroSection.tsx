import { motion } from "framer-motion";
import PiModel from "./PiModel";

const HeroSection = ({ onStart }: { onStart: () => void }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 gap-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <h1 className="text-5xl md:text-7xl font-display font-bold neon-text tracking-wider mb-2">
          Python Trace
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-body max-w-md mx-auto">
          Understand Python Code Line by Line
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <PiModel />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        onClick={onStart}
        className="gradient-primary text-primary-foreground font-display font-semibold text-lg px-10 py-4 rounded-lg animate-pulse-glow hover:scale-105 transition-transform duration-200 tracking-wide"
      >
        Start Tracing
      </motion.button>
    </section>
  );
};

export default HeroSection;
