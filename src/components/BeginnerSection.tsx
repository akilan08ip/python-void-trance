import { useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const concepts = [
  {
    title: "Variables",
    simple: "A variable is like a labeled jar. You put something in it and use the label to find it later.",
    example: "name = \"Alice\"  # The jar is labeled 'name' and contains 'Alice'",
  },
  {
    title: "If / Else",
    simple: "It's like a fork in the road. If something is true, go left. Otherwise, go right.",
    example: "if age >= 18:\n    print(\"Adult\")\nelse:\n    print(\"Minor\")",
  },
  {
    title: "Loops",
    simple: "A loop is like running laps. You keep doing the same thing until you're told to stop.",
    example: "for i in range(3):\n    print(i)  # Prints 0, 1, 2",
  },
  {
    title: "Functions",
    simple: "A function is like a recipe. You write it once, and use it whenever you need it.",
    example: "def greet(name):\n    return f\"Hello, {name}!\"",
  },
  {
    title: "Print",
    simple: "print() shows text on the screen — it's how your program talks to you.",
    example: "print(\"Hello, World!\")",
  },
];

const BeginnerSection = () => {
  const [eli10, setEli10] = useState(false);

  return (
    <section id="beginner" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-3xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold neon-text mb-4 text-center"
        >
          Python Basics
        </motion.h2>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setEli10(!eli10)}
            className={`font-display text-sm px-4 py-2 rounded-full border transition-all duration-300 ${
              eli10
                ? "gradient-primary text-primary-foreground border-transparent neon-box"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
            }`}
          >
            {eli10 ? "🧒 Explain Like I'm 10: ON" : "🧒 Explain Like I'm 10"}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="multiple" className="space-y-3">
            {concepts.map((c, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass neon-border rounded-lg px-4 border"
              >
                <AccordionTrigger className="font-display text-foreground hover:no-underline">
                  {c.title}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground text-sm mb-3">
                    {eli10 ? `🧒 ${c.simple}` : c.simple}
                  </p>
                  <pre className="font-mono text-xs bg-muted/30 p-3 rounded-md text-foreground overflow-x-auto">
                    {c.example}
                  </pre>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default BeginnerSection;
