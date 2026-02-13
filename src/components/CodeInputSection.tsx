import { useState } from "react";
import { motion } from "framer-motion";

const SAMPLE_CODE = `# Simple Python Example
name = "Alice"
age = 25
if age >= 18:
    print(f"{name} is an adult")
else:
    print(f"{name} is a minor")

for i in range(3):
    print(f"Count: {i}")`;

interface CodeInputSectionProps {
  onTrace: (code: string) => void;
}

const CodeInputSection = ({ onTrace }: CodeInputSectionProps) => {
  const [code, setCode] = useState(SAMPLE_CODE);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold neon-text mb-8 text-center">
          Paste Your Code
        </h2>

        <div className="glass neon-box p-1 rounded-xl">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-accent/40" />
            <div className="w-3 h-3 rounded-full bg-primary/40" />
            <span className="text-xs text-muted-foreground font-mono ml-2">main.py</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-72 bg-transparent text-foreground font-mono text-sm p-4 resize-none focus:outline-none placeholder:text-muted-foreground"
            placeholder="Paste your Python code here..."
            spellCheck={false}
          />
        </div>

        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onTrace(code)}
            className="gradient-primary text-primary-foreground font-display font-semibold text-base px-8 py-3 rounded-lg neon-box tracking-wide"
          >
            Trace Code →
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CodeInputSection;
