import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import CodeBlock from "./CodeBlock";

interface BlogPost {
  id: string;
  title: string;
  icon: string;
  summary: string;
  content: string;
  code?: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "intro",
    title: "What is Python & Why Learn It?",
    icon: "🐍",
    summary: "Python is the world's most popular programming language. Here's why you should learn it.",
    tags: ["Beginner", "Overview"],
    content: `Python was created by Guido van Rossum in 1991. It's designed to be readable and simple — almost like writing English.\n\n**Why Python?**\n• Easy to read and write\n• Huge community & library ecosystem\n• Used in AI, web dev, data science, automation\n• High demand in the job market ($120K+ avg salary)\n• Cross-platform (Windows, Mac, Linux)\n\n**Where Python is Used:**\n• Google, Netflix, Instagram, Spotify\n• Scientific research & data analysis\n• Machine learning & artificial intelligence\n• Web development (Django, Flask)\n• Game development & scripting`,
    code: `# Your first Python program\nprint("Hello, World!")\n\n# Python is this simple!\nname = "Pythonista"\nprint(f"Welcome, {name}!")`,
  },
  {
    id: "variables",
    title: "Variables & Data Types",
    icon: "📦",
    summary: "Learn how Python stores data using variables and understand different data types.",
    tags: ["Beginner", "Fundamentals"],
    content: `Variables are containers for storing data values. Python is dynamically typed — you don't need to declare the type.\n\n**Core Data Types:**\n• **int** — Whole numbers: 42, -7, 0\n• **float** — Decimal numbers: 3.14, -0.5\n• **str** — Text strings: "hello", 'world'\n• **bool** — True or False\n• **list** — Ordered collection: [1, 2, 3]\n• **tuple** — Immutable sequence: (1, 2, 3)\n• **dict** — Key-value pairs: {"name": "Ali"}\n• **set** — Unique values: {1, 2, 3}\n• **None** — Represents no value\n\n**Type Conversion:**\nYou can convert between types using int(), float(), str(), list(), etc.`,
    code: `# Variables and types\nage = 25              # int\nheight = 5.9          # float\nname = "Alice"        # str\nis_student = True     # bool\n\n# Collections\nfruits = ["apple", "banana", "cherry"]  # list\ncoords = (10, 20)                        # tuple\nscores = {"math": 95, "science": 88}    # dict\nunique = {1, 2, 3, 3}                   # set → {1, 2, 3}\n\n# Check types\nprint(type(age))      # <class 'int'>\nprint(type(name))     # <class 'str'>`,
  },
  {
    id: "control-flow",
    title: "Control Flow: if, elif, else",
    icon: "🔀",
    summary: "Make decisions in your code with conditional statements.",
    tags: ["Beginner", "Logic"],
    content: `Control flow lets your program make decisions based on conditions.\n\n**Key Concepts:**\n• **if** — Checks a condition\n• **elif** — Checks another condition if the first was False\n• **else** — Runs when no conditions were True\n• **Comparison operators**: ==, !=, <, >, <=, >=\n• **Logical operators**: and, or, not\n\n**Truthy & Falsy Values:**\nFalsy: 0, 0.0, "", [], {}, None, False\nEverything else is truthy.\n\n**Ternary Expression:**\nPython supports one-line conditionals:\nresult = "yes" if condition else "no"`,
    code: `# Basic if-elif-else\nscore = 85\n\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"\n\nprint(f"Score: {score}, Grade: {grade}")\n\n# Logical operators\nage = 20\nhas_id = True\n\nif age >= 18 and has_id:\n    print("Entry allowed")\n\n# Ternary\nstatus = "adult" if age >= 18 else "minor"`,
  },
  {
    id: "loops",
    title: "Loops: for & while",
    icon: "🔄",
    summary: "Automate repetitive tasks using loops to iterate over data.",
    tags: ["Beginner", "Iteration"],
    content: `Loops let you repeat code. Python has two main loop types.\n\n**for loop** — Iterates over a sequence:\n• Lists, strings, ranges, dicts, files\n• Use enumerate() for index + value\n• Use zip() for parallel iteration\n\n**while loop** — Repeats while a condition is True:\n• Useful when you don't know how many iterations\n• Be careful of infinite loops!\n\n**Loop Control:**\n• **break** — Exit the loop immediately\n• **continue** — Skip to the next iteration\n• **else** — Runs after loop completes (no break)\n\n**List Comprehension:**\nA compact way to create lists from loops.`,
    code: `# for loop with range\nfor i in range(5):\n    print(f"Count: {i}")\n\n# Loop through a list\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)\n\n# enumerate for index\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")\n\n# while loop\ncount = 0\nwhile count < 3:\n    print(f"While: {count}")\n    count += 1\n\n# List comprehension\nsquares = [x**2 for x in range(10)]\nprint(squares)  # [0, 1, 4, 9, 16, ...]`,
  },
  {
    id: "functions",
    title: "Functions & Scope",
    icon: "⚙️",
    summary: "Write reusable code blocks with functions. Understand scope and closures.",
    tags: ["Intermediate", "Functions"],
    content: `Functions are reusable blocks of code defined with the def keyword.\n\n**Function Features:**\n• Parameters with default values\n• *args for variable positional arguments\n• **kwargs for variable keyword arguments\n• Return values (single or multiple via tuples)\n• Docstrings for documentation\n\n**Scope (LEGB Rule):**\n• **L**ocal — Inside the current function\n• **E**nclosing — In outer function (closures)\n• **G**lobal — Module-level variables\n• **B**uilt-in — Python's built-in names\n\n**Lambda Functions:**\nSmall anonymous functions: lambda x: x * 2\n\n**Decorators:**\nFunctions that modify other functions' behavior.`,
    code: `# Basic function\ndef greet(name, greeting="Hello"):\n    """Greet a person."""\n    return f"{greeting}, {name}!"\n\nprint(greet("Alice"))\nprint(greet("Bob", "Hi"))\n\n# Multiple return values\ndef divide(a, b):\n    return a // b, a % b\n\nquotient, remainder = divide(17, 5)\nprint(f"17 ÷ 5 = {quotient} remainder {remainder}")\n\n# *args and **kwargs\ndef info(*args, **kwargs):\n    print(f"Args: {args}")\n    print(f"Kwargs: {kwargs}")\n\ninfo(1, 2, name="Alice", age=25)\n\n# Lambda\nsquare = lambda x: x ** 2\nprint(square(5))  # 25`,
  },
  {
    id: "oop",
    title: "Object-Oriented Programming",
    icon: "🏗️",
    summary: "Master classes, objects, inheritance, and Python's OOP principles.",
    tags: ["Intermediate", "OOP"],
    content: `OOP organizes code into classes (blueprints) and objects (instances).\n\n**Core Concepts:**\n• **Class** — A blueprint with attributes and methods\n• **Object** — An instance of a class\n• **__init__** — Constructor method\n• **self** — Reference to the current instance\n\n**OOP Pillars:**\n• **Encapsulation** — Bundling data and methods, using _ or __ for privacy\n• **Inheritance** — Creating new classes from existing ones\n• **Polymorphism** — Same method name, different behavior\n• **Abstraction** — Hiding complex details behind simple interfaces\n\n**Special Methods (Dunder):**\n__str__, __repr__, __len__, __add__, __eq__, etc.`,
    code: `class Animal:\n    def __init__(self, name, sound):\n        self.name = name\n        self.sound = sound\n    \n    def speak(self):\n        return f"{self.name} says {self.sound}!"\n    \n    def __str__(self):\n        return f"Animal({self.name})"\n\n# Inheritance\nclass Dog(Animal):\n    def __init__(self, name):\n        super().__init__(name, "Woof")\n    \n    def fetch(self, item):\n        return f"{self.name} fetches the {item}!"\n\ndog = Dog("Buddy")\nprint(dog.speak())   # Buddy says Woof!\nprint(dog.fetch("ball"))`,
  },
  {
    id: "file-handling",
    title: "File Handling & Error Management",
    icon: "📁",
    summary: "Read/write files and handle errors gracefully with try-except.",
    tags: ["Intermediate", "I/O"],
    content: `Python makes file operations simple with the open() function and context managers.\n\n**File Modes:**\n• 'r' — Read (default)\n• 'w' — Write (overwrites)\n• 'a' — Append\n• 'x' — Create (fails if exists)\n• 'b' — Binary mode\n\n**Best Practice:** Always use with statement (context manager) — it auto-closes files.\n\n**Error Handling:**\n• **try** — Code that might fail\n• **except** — Handle specific errors\n• **else** — Runs if no error\n• **finally** — Always runs (cleanup)\n\n**Common Exceptions:**\nValueError, TypeError, FileNotFoundError, ZeroDivisionError, KeyError, IndexError`,
    code: `# Writing to a file\nwith open("data.txt", "w") as f:\n    f.write("Hello, File!\\n")\n    f.write("Python is great!\\n")\n\n# Reading a file\nwith open("data.txt", "r") as f:\n    content = f.read()\n    print(content)\n\n# Error handling\ndef safe_divide(a, b):\n    try:\n        result = a / b\n    except ZeroDivisionError:\n        print("Cannot divide by zero!")\n        return None\n    except TypeError:\n        print("Invalid types!")\n        return None\n    else:\n        print(f"Result: {result}")\n        return result\n    finally:\n        print("Operation complete.")\n\nsafe_divide(10, 3)\nsafe_divide(10, 0)`,
  },
  {
    id: "libraries",
    title: "Essential Libraries & Modules",
    icon: "📚",
    summary: "Explore Python's powerful standard library and popular third-party packages.",
    tags: ["Intermediate", "Libraries"],
    content: `Python's strength lies in its massive ecosystem of libraries.\n\n**Standard Library Highlights:**\n• **os** — File system operations\n• **sys** — System-specific functions\n• **json** — JSON encoding/decoding\n• **datetime** — Date and time handling\n• **math** — Mathematical functions\n• **random** — Random number generation\n• **re** — Regular expressions\n\n**Popular Third-Party Libraries:**\n• **NumPy** — Numerical computing\n• **Pandas** — Data manipulation\n• **Matplotlib** — Data visualization\n• **Requests** — HTTP requests\n• **Flask/Django** — Web frameworks\n• **TensorFlow/PyTorch** — Machine learning\n• **BeautifulSoup** — Web scraping\n\n**Package Management:**\nUse pip install package_name to install packages.`,
    code: `# Using standard library\nimport json\nimport datetime\nimport random\n\n# JSON handling\ndata = {"name": "Alice", "age": 25}\njson_str = json.dumps(data, indent=2)\nprint(json_str)\n\n# Date and time\nnow = datetime.datetime.now()\nprint(f"Current time: {now.strftime('%Y-%m-%d %H:%M')}")\n\n# Random\nnumbers = [random.randint(1, 100) for _ in range(5)]\nprint(f"Random numbers: {numbers}")\n\n# List comprehension with condition\neven = [x for x in range(20) if x % 2 == 0]\nprint(f"Even numbers: {even}")`,
  },
  {
    id: "projects",
    title: "Project Ideas & Next Steps",
    icon: "🚀",
    summary: "Put your skills into practice with real projects and advance your Python journey.",
    tags: ["Advanced", "Projects"],
    content: `The best way to learn is by building projects!\n\n**Beginner Projects:**\n1. Calculator app\n2. To-do list (CLI)\n3. Number guessing game\n4. Password generator\n5. Rock-Paper-Scissors\n\n**Intermediate Projects:**\n1. Weather app (API)\n2. Web scraper\n3. Chat application\n4. Expense tracker with database\n5. Quiz application\n\n**Advanced Projects:**\n1. REST API with Flask/Django\n2. ML model for prediction\n3. Automation bot\n4. Data dashboard\n5. Full-stack web app\n\n**Career Paths with Python:**\n• Backend Developer — $100-150K\n• Data Scientist — $110-160K\n• ML Engineer — $120-180K\n• DevOps Engineer — $110-150K\n• Automation Engineer — $90-130K\n\n**Keep Learning:**\n• Contribute to open source on GitHub\n• Solve problems on LeetCode, HackerRank\n• Read Python docs & PEP standards\n• Join Python communities (Reddit, Discord)`,
    code: `# Mini Project: Password Generator\nimport random\nimport string\n\ndef generate_password(length=12):\n    chars = string.ascii_letters + string.digits + string.punctuation\n    password = ''.join(random.choice(chars) for _ in range(length))\n    return password\n\n# Generate 3 passwords\nfor i in range(3):\n    pwd = generate_password(16)\n    print(f"Password {i+1}: {pwd}")\n\n# Mini Project: Simple Calculator\ndef calculator():\n    operations = {\n        '+': lambda a, b: a + b,\n        '-': lambda a, b: a - b,\n        '*': lambda a, b: a * b,\n        '/': lambda a, b: a / b if b != 0 else "Error"\n    }\n    \n    a, b = 15, 4\n    for op, func in operations.items():\n        print(f"{a} {op} {b} = {func(a, b)}")\n\ncalculator()`,
  },
];

const PythonBlogSection = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="min-h-screen px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Python Learning Blog
              </span>
            </h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            A complete end-to-end guide to learning Python — from your first print() to building real projects. Read, learn, and code along!
          </p>
        </motion.div>

        <div className="space-y-4">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass neon-border rounded-xl overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => toggle(post.id)}
                className="w-full text-left p-5 flex items-center gap-4 hover:bg-primary/5 transition-colors"
              >
                <span className="text-3xl">{post.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-mono text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display font-bold text-foreground text-base md:text-lg">
                      {post.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{post.summary}</p>
                  <div className="flex gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-muted-foreground shrink-0">
                  {expandedId === post.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedId === post.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 border-t border-border/50">
                      {/* Content */}
                      <div className="mt-4 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {post.content.split("\n").map((line, li) => {
                          if (line.startsWith("**") && line.endsWith("**")) {
                            return (
                              <h4 key={li} className="font-display font-bold text-foreground mt-4 mb-2 text-base">
                                {line.replace(/\*\*/g, "")}
                              </h4>
                            );
                          }
                          if (line.startsWith("• **")) {
                            const match = line.match(/• \*\*(.+?)\*\* — (.+)/);
                            if (match) {
                              return (
                                <p key={li} className="ml-4 mb-1">
                                  • <span className="text-primary font-semibold">{match[1]}</span> — {match[2]}
                                </p>
                              );
                            }
                          }
                          if (line.startsWith("• ")) {
                            return (
                              <p key={li} className="ml-4 mb-1">
                                {line}
                              </p>
                            );
                          }
                          if (line.match(/^\d+\./)) {
                            return (
                              <p key={li} className="ml-4 mb-1">
                                {line}
                              </p>
                            );
                          }
                          return <p key={li}>{line}</p>;
                        })}
                      </div>

                      {/* Code Example */}
                      {post.code && (
                        <div className="mt-6">
                          <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-t-lg border border-border/50 border-b-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            <span className="text-[10px] font-mono text-muted-foreground ml-2">
                              example.py
                            </span>
                          </div>
                          <pre className="font-mono text-xs bg-muted/20 p-4 rounded-b-lg border border-border/50 overflow-x-auto text-foreground leading-relaxed">
                            {post.code}
                          </pre>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PythonBlogSection;
