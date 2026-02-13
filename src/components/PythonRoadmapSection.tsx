import { motion } from "framer-motion";

const roadmapSteps = [
  {
    step: 1,
    title: "Learn the Basics",
    description: "Start with variables, data types, and print statements. Understand how Python reads your code from top to bottom.",
    topics: ["Variables & Data Types", "Strings & Numbers", "print()", "Input from User"],
    duration: "1–2 weeks",
  },
  {
    step: 2,
    title: "Control Flow",
    description: "Learn to make decisions with if/else and repeat actions with loops. This is where your code starts thinking!",
    topics: ["if / elif / else", "for loops", "while loops", "break & continue"],
    duration: "1–2 weeks",
  },
  {
    step: 3,
    title: "Functions & Modules",
    description: "Organize your code into reusable blocks. Functions let you write once and use many times.",
    topics: ["def & return", "Parameters & Arguments", "Built-in Functions", "Importing Modules"],
    duration: "1–2 weeks",
  },
  {
    step: 4,
    title: "Data Structures",
    description: "Store and organize collections of data. Lists, dictionaries, and sets are your new best friends.",
    topics: ["Lists & Tuples", "Dictionaries", "Sets", "List Comprehensions"],
    duration: "2–3 weeks",
  },
  {
    step: 5,
    title: "File Handling & Errors",
    description: "Read and write files, and learn to handle errors gracefully so your programs don't crash unexpectedly.",
    topics: ["Reading Files", "Writing Files", "try / except", "Common Errors"],
    duration: "1 week",
  },
  {
    step: 6,
    title: "Object-Oriented Programming",
    description: "Model real-world things with classes and objects. This is how professional Python code is structured.",
    topics: ["Classes & Objects", "Methods", "Inheritance", "__init__ & self"],
    duration: "2–3 weeks",
  },
  {
    step: 7,
    title: "Build Real Projects",
    description: "Apply everything you've learned by building real projects — a calculator, a to-do app, a web scraper, and more!",
    topics: ["CLI Projects", "APIs & Requests", "Web Scraping", "Simple Games"],
    duration: "Ongoing",
  },
];

const PythonRoadmapSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold neon-text mb-4 text-center"
        >
          Python Learning Roadmap
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mb-12 max-w-xl mx-auto"
        >
          Follow this step-by-step path to go from zero to confident Python programmer.
        </motion.p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {roadmapSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Step circle */}
                <div className="absolute left-3 md:left-5 w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-xs font-display font-bold text-primary-foreground">
                  {item.step}
                </div>

                <div className="glass neon-border p-5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-semibold text-foreground text-lg">
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs px-2 py-1 rounded-full border border-border text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PythonRoadmapSection;
