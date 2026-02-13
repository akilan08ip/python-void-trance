import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LineExplanation {
  line: string;
  explanation: string;
  concept?: string;
}

function parseCode(code: string): LineExplanation[] {
  const lines = code.split("\n").filter((l) => l.trim());
  return lines.map((line) => {
    const trimmed = line.trim();
    let explanation = "This line executes a statement.";
    let concept: string | undefined;

    if (trimmed.startsWith("#")) {
      explanation = "This is a comment — it's ignored by Python and is just for humans to read.";
      concept = "Comments";
    } else if (trimmed.match(/^\w+\s*=\s*.+/)) {
      const varName = trimmed.split("=")[0].trim();
      explanation = `Creates a variable called "${varName}" and stores a value in it. Think of it like labeling a box.`;
      concept = "Variables";
    } else if (trimmed.startsWith("if ")) {
      explanation = "Checks a condition. If it's true, the indented code below runs.";
      concept = "Conditions";
    } else if (trimmed.startsWith("else")) {
      explanation = "If the 'if' condition was false, this code runs instead.";
      concept = "Conditions";
    } else if (trimmed.startsWith("for ")) {
      explanation = "Starts a loop — it repeats the indented code below multiple times.";
      concept = "Loops";
    } else if (trimmed.startsWith("print(")) {
      explanation = "Displays text on the screen. Whatever is inside the parentheses gets shown.";
      concept = "Output";
    } else if (trimmed.startsWith("def ")) {
      explanation = "Defines a reusable block of code called a function.";
      concept = "Functions";
    } else if (trimmed.startsWith("return")) {
      explanation = "Sends a value back from a function to wherever it was called.";
      concept = "Functions";
    }

    return { line, explanation, concept };
  });
}

const conceptColors: Record<string, string> = {
  Comments: "text-muted-foreground",
  Variables: "text-accent",
  Conditions: "text-primary",
  Loops: "text-accent",
  Output: "text-foreground",
  Functions: "text-primary",
};

const ExplanationSection = ({ code }: { code: string }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const explanations = parseCode(code);

  useEffect(() => {
    setVisibleCount(0);
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= explanations.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(timer);
  }, [code, explanations.length]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-3xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold neon-text mb-10 text-center"
        >
          Line-by-Line Trace
        </motion.h2>

        <div className="space-y-3">
          <AnimatePresence>
            {explanations.slice(0, visibleCount).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="glass neon-border p-4 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-muted-foreground min-w-[2rem] pt-1 text-right">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <code className="font-mono text-sm text-foreground block mb-2">
                      {item.line}
                    </code>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.explanation}
                    </p>
                    {item.concept && (
                      <span
                        className={`inline-block mt-2 text-xs font-display px-2 py-0.5 rounded-full border border-border ${
                          conceptColors[item.concept] || "text-foreground"
                        }`}
                      >
                        {item.concept}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleCount < explanations.length && (
          <div className="flex justify-center mt-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ExplanationSection;
