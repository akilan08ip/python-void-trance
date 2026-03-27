import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const PYTHON_KB: Record<string, string> = {
  "what is python": "Python is a high-level, interpreted programming language created by Guido van Rossum in 1991. It emphasizes readability, simplicity, and versatility. Python supports multiple paradigms: procedural, object-oriented, and functional programming.",
  "python scope": "Python has 4 scopes (LEGB rule):\n\n• **Local** – Variables inside a function\n• **Enclosing** – Variables in outer function (closures)\n• **Global** – Module-level variables\n• **Built-in** – Python's built-in names like print, len\n\nUse `global` and `nonlocal` keywords to modify outer scope variables.",
  "python values": "Python value types:\n\n• **int** – Whole numbers (42)\n• **float** – Decimals (3.14)\n• **str** – Text ('hello')\n• **bool** – True/False\n• **list** – Ordered collection [1,2,3]\n• **dict** – Key-value pairs {'a':1}\n• **tuple** – Immutable sequence (1,2)\n• **set** – Unique values {1,2,3}\n• **None** – Null value",
  "python career": "Python career paths:\n\n🤖 **AI/ML Engineer** – $120-180K\n📊 **Data Scientist** – $110-160K\n🌐 **Backend Developer** – $100-150K\n🔒 **Cybersecurity** – $105-155K\n📈 **Data Analyst** – $70-110K\n🤖 **Automation Engineer** – $90-130K\n☁️ **DevOps Engineer** – $110-150K",
  "learn python": "Best path to learn Python:\n\n1️⃣ **Week 1-2**: Variables, data types, operators\n2️⃣ **Week 3-4**: Conditionals, loops, functions\n3️⃣ **Month 2**: Lists, dicts, file handling\n4️⃣ **Month 3**: OOP, modules, error handling\n5️⃣ **Month 4**: Libraries (pandas, requests)\n6️⃣ **Month 5-6**: Build projects!\n\n📚 Resources: Python.org tutorial, Automate the Boring Stuff, LeetCode",
  default: "I can help you with Python! Try asking about:\n\n• **What is Python** – Overview\n• **Python values** – Data types\n• **Python scope** – LEGB rule\n• **Learn Python** – Roadmap\n• **Python career** – Job prospects\n• **Basic programs** – Starter code\n• **Next steps** – What to learn next\n• Or ask me any Python syntax question!",
};

const BASIC_PROGRAMS = `Here are essential beginner programs:\n\n**1. Hello World**\n\`print("Hello, World!")\`\n\n**2. Calculator**\n\`a, b = 10, 5\nprint(a + b, a - b, a * b, a / b)\`\n\n**3. Even/Odd Check**\n\`n = int(input("Number: "))\nprint("Even" if n % 2 == 0 else "Odd")\`\n\n**4. Factorial**\n\`def factorial(n):\n    return 1 if n <= 1 else n * factorial(n-1)\`\n\n**5. Fibonacci**\n\`a, b = 0, 1\nfor _ in range(10):\n    print(a, end=" ")\n    a, b = b, a + b\``;

const NEXT_STEPS = `Based on basics, learn these next:\n\n📌 **Pattern 1**: List Comprehensions\n\`squares = [x**2 for x in range(10)]\`\n\n📌 **Pattern 2**: Dictionary Operations\n\`students = {name: grade for name, grade in zip(names, grades)}\`\n\n📌 **Pattern 3**: File Handling\n\`with open('file.txt', 'r') as f:\n    data = f.read()\`\n\n📌 **Pattern 4**: Error Handling\n\`try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")\`\n\n📌 **Pattern 5**: Classes\n\`class Dog:\n    def __init__(self, name):\n        self.name = name\``;

// Syntax-specific answers
const SYNTAX_KB: Record<string, string> = {
  "add two numbers": `**Addition of Two Numbers in Python:**\n\n\`\`\`python\n# Method 1: Direct\na = 10\nb = 20\nresult = a + b\nprint(f"Sum: {result}")  # Sum: 30\n\n# Method 2: User input\na = int(input("Enter first number: "))\nb = int(input("Enter second number: "))\nprint(f"{a} + {b} = {a + b}")\n\n# Method 3: Function\ndef add(x, y):\n    return x + y\n\nprint(add(5, 3))  # 8\n\`\`\``,
  "subtract": `**Subtraction in Python:**\n\n\`result = a - b\`\n\nExample:\n\`a, b = 20, 5\nprint(a - b)  # 15\``,
  "multiply": `**Multiplication in Python:**\n\n\`result = a * b\`\n\nExample:\n\`a, b = 4, 5\nprint(a * b)  # 20\``,
  "divide": `**Division in Python:**\n\n\`result = a / b     # Float division: 7.5\nresult = a // b    # Integer division: 7\nresult = a % b     # Modulus (remainder): 1\`\n\nExample:\n\`print(15 / 2)   # 7.5\nprint(15 // 2)  # 7\nprint(15 % 2)   # 1\``,
  "swap": `**Swap Two Variables:**\n\n\`a, b = 5, 10\na, b = b, a\nprint(a, b)  # 10 5\`\n\nPython makes it easy — no temp variable needed!`,
  "reverse string": `**Reverse a String:**\n\n\`text = "Python"\nreversed_text = text[::-1]\nprint(reversed_text)  # nohtyP\``,
  "palindrome": `**Check Palindrome:**\n\n\`def is_palindrome(s):\n    return s == s[::-1]\n\nprint(is_palindrome("madam"))  # True\nprint(is_palindrome("hello"))  # False\``,
  "prime": `**Check Prime Number:**\n\n\`def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprint(is_prime(17))  # True\nprint(is_prime(4))   # False\``,
  "list": `**Python Lists:**\n\n\`fruits = ["apple", "banana", "cherry"]\nfruits.append("date")      # Add item\nfruits.remove("banana")    # Remove item\nprint(fruits[0])           # Access: apple\nprint(len(fruits))         # Length: 3\n\n# List comprehension\nsquares = [x**2 for x in range(5)]\nprint(squares)  # [0, 1, 4, 9, 16]\``,
  "dictionary": `**Python Dictionaries:**\n\n\`student = {"name": "Alice", "age": 20}\nstudent["grade"] = "A"     # Add key\nprint(student["name"])     # Access: Alice\n\nfor key, value in student.items():\n    print(f"{key}: {value}")\``,
  "for loop": `**For Loop Syntax:**\n\n\`# Loop through range\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\n# Loop through list\nfor fruit in ["apple", "banana"]:\n    print(fruit)\n\n# With index\nfor i, item in enumerate(["a", "b", "c"]):\n    print(f"{i}: {item}")\``,
  "while loop": `**While Loop Syntax:**\n\n\`count = 0\nwhile count < 5:\n    print(count)\n    count += 1\n\n# With break\nwhile True:\n    user = input("Enter 'quit' to exit: ")\n    if user == 'quit':\n        break\``,
  "function": `**Function Syntax:**\n\n\`def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Alice"))        # Hello, Alice!\nprint(greet("Bob", "Hi"))    # Hi, Bob!\n\n# Lambda\nsquare = lambda x: x ** 2\nprint(square(5))  # 25\``,
  "class": `**Class Syntax:**\n\n\`class Dog:\n    def __init__(self, name, breed):\n        self.name = name\n        self.breed = breed\n    \n    def bark(self):\n        return f"{self.name} says Woof!"\n\ndog = Dog("Buddy", "Labrador")\nprint(dog.bark())  # Buddy says Woof!\``,
  "if else": `**If-Else Syntax:**\n\n\`age = 18\n\nif age >= 18:\n    print("Adult")\nelif age >= 13:\n    print("Teenager")\nelse:\n    print("Child")\n\n# Ternary\nstatus = "adult" if age >= 18 else "minor"\``,
  "string": `**String Operations:**\n\n\`text = "Hello, Python!"\nprint(text.upper())      # HELLO, PYTHON!\nprint(text.lower())      # hello, python!\nprint(text.split(","))   # ['Hello', ' Python!']\nprint(text.replace("Hello", "Hi"))  # Hi, Python!\nprint(len(text))         # 14\nprint(text[0:5])         # Hello\``,
  "input output": `**Input/Output in Python:**\n\n\`# Output\nprint("Hello World")\nprint(f"Value: {42}")\n\n# Input\nname = input("Your name: ")\nage = int(input("Your age: "))\nprint(f"Hi {name}, you are {age} years old")\``,
  "try except": `**Error Handling:**\n\n\`try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\nexcept ValueError:\n    print("Invalid value!")\nfinally:\n    print("Done.")\``,
};

// Casual conversation responses
const CASUAL: Record<string, string[]> = {
  greeting: ["hi", "hello", "hey", "hola", "namaste", "greetings", "sup", "yo", "howdy"],
  farewell: ["bye", "goodbye", "see you", "later", "cya", "good night"],
  thanks: ["thank", "thanks", "thx", "thank you", "appreciate"],
  how_are_you: ["how are you", "how's it going", "how was your day", "what's up", "how do you do", "how's your day", "how are things"],
  who_are_you: ["who are you", "what are you", "your name", "about you"],
  joke: ["joke", "funny", "laugh", "humor"],
};

const CASUAL_RESPONSES: Record<string, string> = {
  greeting: "👋 Hey there! Welcome to the Python learning zone! How can I help you today? Ask me about Python syntax, programs, career paths, or anything Python-related!",
  farewell: "👋 Goodbye! Happy coding! Remember — practice makes perfect. Come back anytime you need Python help! 🐍✨",
  thanks: "😊 You're welcome! I'm always here to help you with Python. Keep learning and building cool stuff! 🚀",
  how_are_you: "I'm doing great, thanks for asking! 😄 I'm always excited to help with Python. What would you like to learn today? You can ask me about syntax, programs, data types, or career paths!",
  who_are_you: "🐍 I'm your **Python Guide Bot**! I can help you with:\n\n• Python syntax & code examples\n• Basic to advanced programs\n• Learning roadmaps\n• Career guidance\n• Data types, loops, functions & more!\n\nJust ask me anything about Python!",
  joke: "😄 Here's a Python joke:\n\n**Why do Python programmers prefer dark mode?**\nBecause light attracts bugs! 🐛\n\n**Another one:**\nA Python developer walked into a bar and said:\n`print('Hello' * 3)` → HelloHelloHello 🍻",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  // Check casual conversation first
  for (const [category, keywords] of Object.entries(CASUAL)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return CASUAL_RESPONSES[category];
    }
  }

  // Check syntax-specific questions
  if (lower.includes("add") && (lower.includes("two") || lower.includes("number") || lower.includes("sum"))) return SYNTAX_KB["add two numbers"];
  if (lower.includes("subtract") || lower.includes("minus")) return SYNTAX_KB["subtract"];
  if (lower.includes("multiply") || lower.includes("product")) return SYNTAX_KB["multiply"];
  if (lower.includes("divide") || lower.includes("division") || lower.includes("modulus")) return SYNTAX_KB["divide"];
  if (lower.includes("swap")) return SYNTAX_KB["swap"];
  if (lower.includes("reverse") && lower.includes("string")) return SYNTAX_KB["reverse string"];
  if (lower.includes("palindrome")) return SYNTAX_KB["palindrome"];
  if (lower.includes("prime")) return SYNTAX_KB["prime"];
  if (lower.includes("list") && !lower.includes("career")) return SYNTAX_KB["list"];
  if (lower.includes("dictionary") || lower.includes("dict")) return SYNTAX_KB["dictionary"];
  if (lower.includes("for loop") || (lower.includes("for") && lower.includes("loop"))) return SYNTAX_KB["for loop"];
  if (lower.includes("while loop") || (lower.includes("while") && lower.includes("loop"))) return SYNTAX_KB["while loop"];
  if (lower.includes("function") || lower.includes("def ")) return SYNTAX_KB["function"];
  if (lower.includes("class") || lower.includes("oop") || lower.includes("object")) return SYNTAX_KB["class"];
  if (lower.includes("if") && (lower.includes("else") || lower.includes("condition"))) return SYNTAX_KB["if else"];
  if (lower.includes("string") && !lower.includes("reverse")) return SYNTAX_KB["string"];
  if (lower.includes("input") && lower.includes("output")) return SYNTAX_KB["input output"];
  if (lower.includes("try") || lower.includes("except") || lower.includes("error handling")) return SYNTAX_KB["try except"];

  // Original pattern matching
  if (lower.includes("basic") || lower.includes("program") || lower.includes("example") || lower.includes("code")) return BASIC_PROGRAMS;
  if (lower.includes("next") || lower.includes("pattern") || lower.includes("after") || lower.includes("advance")) return NEXT_STEPS;
  
  for (const [key, val] of Object.entries(PYTHON_KB)) {
    if (key === "default") continue;
    if (lower.includes(key) || key.split(" ").every((w) => lower.includes(w))) return val;
  }
  
  if (lower.includes("scope")) return PYTHON_KB["python scope"];
  if (lower.includes("value") || lower.includes("type") || lower.includes("data")) return PYTHON_KB["python values"];
  if (lower.includes("career") || lower.includes("job") || lower.includes("salary") || lower.includes("market")) return PYTHON_KB["python career"];
  if (lower.includes("learn") || lower.includes("road") || lower.includes("start") || lower.includes("begin")) return PYTHON_KB["learn python"];
  if (lower.includes("what") && lower.includes("python")) return PYTHON_KB["what is python"];
  if (lower.includes("loop")) return SYNTAX_KB["for loop"];
  if (lower.includes("if")) return SYNTAX_KB["if else"];
  if (lower.includes("print") || lower.includes("output") || lower.includes("input")) return SYNTAX_KB["input output"];
  
  return PYTHON_KB["default"];
}

const PythonChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "🐍 Hi! I'm your Python Guide. Ask me anything about Python – syntax, values, scopes, career paths, basic programs, or just say hello!" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const botMsg: Message = { role: "bot", content: getResponse(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 left-6 z-50 gradient-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg neon-box text-2xl"
          >
            🐍
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-6 left-6 z-50 w-[360px] h-[500px] glass-strong neon-box rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 gradient-primary">
              <div className="flex items-center gap-2">
                <span className="text-lg">🐍</span>
                <span className="font-display font-bold text-primary-foreground text-sm">Python Guide</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "gradient-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Quick actions */}
            <div className="px-3 pb-1 flex gap-1 flex-wrap">
              {["Add two numbers", "For loop", "Learn Python", "Career", "Hello 👋"].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  className="text-[10px] px-2 py-1 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about Python..."
                className="flex-1 bg-muted rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={send}
                className="gradient-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PythonChatbot;
