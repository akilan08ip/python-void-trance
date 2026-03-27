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
    title: "Advanced Python",
    description: "Dive into decorators, generators, context managers, and async programming to write professional-grade code.",
    topics: ["Decorators", "Generators", "Context Managers", "Async/Await"],
    duration: "2–3 weeks",
  },
  {
    step: 8,
    title: "Build Real Projects",
    description: "Apply everything by building real projects — web apps, APIs, automation scripts, data analysis, and more!",
    topics: ["CLI Projects", "APIs & Requests", "Web Scraping", "Simple Games"],
    duration: "Ongoing",
  },
];

const otherLanguages = [
  {
    name: "JavaScript",
    use: "Web Development, Full-Stack",
    demand: "Very High",
    avgSalary: "$110K/yr",
  },
  {
    name: "Java",
    use: "Enterprise, Android, Backend",
    demand: "High",
    avgSalary: "$120K/yr",
  },
  {
    name: "C++",
    use: "Systems, Gaming, Embedded",
    demand: "High",
    avgSalary: "$115K/yr",
  },
  {
    name: "Go",
    use: "Cloud, DevOps, Microservices",
    demand: "Growing",
    avgSalary: "$130K/yr",
  },
  {
    name: "Rust",
    use: "Systems, Performance, Safety",
    demand: "Growing Fast",
    avgSalary: "$135K/yr",
  },
  {
    name: "TypeScript",
    use: "Web Development, Full-Stack",
    demand: "Very High",
    avgSalary: "$115K/yr",
  },
];

const pythonIndustries = [
  { industry: "AI & Machine Learning", share: "78%", detail: "Python dominates AI/ML with TensorFlow, PyTorch, and scikit-learn." },
  { industry: "Data Science & Analytics", share: "68%", detail: "Pandas, NumPy, and Matplotlib make Python the #1 choice for data work." },
  { industry: "Web Development", share: "35%", detail: "Django and Flask power millions of web applications worldwide." },
  { industry: "DevOps & Automation", share: "45%", detail: "Python scripts automate infrastructure, CI/CD pipelines, and testing." },
  { industry: "Finance & FinTech", share: "52%", detail: "Quantitative analysis, algorithmic trading, and risk modeling rely on Python." },
  { industry: "Cybersecurity", share: "40%", detail: "Penetration testing, malware analysis, and security automation tools." },
];

const PythonRoadmapSection = () => {
  return (
    <div>
      {/* Python Roadmap */}
      <section id="roadmap" className="px-4 py-20">
        <div className="w-full max-w-4xl mx-auto">
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
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-6">
              {roadmapSteps.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="relative pl-16 md:pl-20"
                >
                  <div className="absolute left-3 md:left-5 w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-xs font-display font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div className="glass neon-border p-5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-semibold text-foreground text-lg">{item.title}</h3>
                      <span className="text-xs font-mono text-muted-foreground">{item.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.topics.map((topic) => (
                        <span key={topic} className="text-xs px-2 py-1 rounded-full border border-border text-muted-foreground">
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

      {/* Python Market Value */}
      <section className="px-4 py-20">
        <div className="w-full max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold neon-text mb-4 text-center"
          >
            Python in the Industry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center mb-4 max-w-2xl mx-auto"
          >
            Python is the #1 most popular programming language (TIOBE Index 2025) with an average salary of <span className="text-primary font-semibold">$125,000/year</span> in the US. Here's where it dominates:
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {pythonIndustries.map((item, i) => (
              <motion.div
                key={item.industry}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass neon-border p-5 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-semibold text-foreground text-sm">{item.industry}</h3>
                  <span className="text-primary font-mono font-bold text-lg">{item.share}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
                {/* Bar */}
                <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: item.share }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full gradient-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "TIOBE Rank", value: "#1" },
              { label: "Avg Salary (US)", value: "$125K" },
              { label: "GitHub Repos", value: "10M+" },
              { label: "Job Postings", value: "500K+" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass neon-border p-4 rounded-lg text-center"
              >
                <div className="text-2xl font-display font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Programming Languages */}
      <section className="px-4 py-20">
        <div className="w-full max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold neon-text mb-4 text-center"
          >
            Programming Languages Landscape
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center mb-10 max-w-xl mx-auto"
          >
            Explore other in-demand programming languages and how they compare.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherLanguages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass neon-border p-5 rounded-lg"
              >
                <h3 className="font-display font-bold text-foreground text-lg mb-1">{lang.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{lang.use}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    Demand: <span className="text-primary font-semibold">{lang.demand}</span>
                  </span>
                  <span className="text-muted-foreground">
                    Avg: <span className="text-accent font-semibold">{lang.avgSalary}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PythonRoadmapSection;
