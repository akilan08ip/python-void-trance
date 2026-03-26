import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Quiz {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

function generateQuizzes(code: string): Quiz[] {
  const quizzes: Quiz[] = [];
  const lines = code.split("\n").filter((l) => l.trim());

  const hasVariable = lines.some((l) => l.trim().match(/^\w+\s*=\s*.+/) && !l.trim().startsWith("#"));
  const hasIf = lines.some((l) => l.trim().startsWith("if "));
  const hasElse = lines.some((l) => l.trim().startsWith("else"));
  const hasFor = lines.some((l) => l.trim().startsWith("for "));
  const hasWhile = lines.some((l) => l.trim().startsWith("while "));
  const hasPrint = lines.some((l) => l.trim().startsWith("print("));
  const hasDef = lines.some((l) => l.trim().startsWith("def "));
  const hasReturn = lines.some((l) => l.trim().startsWith("return"));
  const hasList = code.includes("[") && code.includes("]");
  const hasDict = code.includes("{") && code.includes("}") && code.includes(":");
  const hasFString = code.includes('f"') || code.includes("f'");
  const hasRange = code.includes("range(");
  const hasInput = code.includes("input(");
  const hasClass = lines.some((l) => l.trim().startsWith("class "));
  const hasImport = lines.some((l) => l.trim().startsWith("import ") || l.trim().startsWith("from "));

  if (hasVariable) {
    const varLine = lines.find((l) => l.trim().match(/^\w+\s*=\s*.+/) && !l.trim().startsWith("#"));
    const varName = varLine?.trim().split("=")[0].trim();
    const varValue = varLine?.trim().split("=").slice(1).join("=").trim();
    quizzes.push({
      question: `What does the line \`${varName} = ${varValue}\` do?`,
      options: [
        `Creates a variable "${varName}" and assigns it a value`,
        `Compares "${varName}" with ${varValue}`,
        `Deletes the variable "${varName}"`,
        `Prints "${varName}" to the screen`,
      ],
      correct: 0,
      explanation: `The = operator assigns the value ${varValue} to the variable ${varName}. It does NOT compare — that would use ==.`,
    });
  }

  if (hasIf) {
    quizzes.push({
      question: "What happens when an `if` condition evaluates to `False`?",
      options: [
        "The program crashes",
        "The indented code block is skipped",
        "The condition is checked again",
        "Python raises a SyntaxError",
      ],
      correct: 1,
      explanation: "When the if condition is False, Python skips the indented block and moves to elif/else if present, or continues after the block.",
    });
  }

  if (hasFor) {
    quizzes.push({
      question: "What is the purpose of a `for` loop in this code?",
      options: [
        "To execute code only once",
        "To repeat a block of code for each item in a sequence",
        "To define a function",
        "To import a module",
      ],
      correct: 1,
      explanation: "A for loop iterates over a sequence (list, range, string, etc.) and executes the loop body once for each item.",
    });
  }

  if (hasRange) {
    quizzes.push({
      question: "What does `range(3)` produce?",
      options: [
        "Numbers 1, 2, 3",
        "Numbers 0, 1, 2",
        "Numbers 0, 1, 2, 3",
        "Only the number 3",
      ],
      correct: 1,
      explanation: "range(3) generates numbers starting from 0 up to (but not including) 3, giving us 0, 1, 2.",
    });
  }

  if (hasPrint) {
    quizzes.push({
      question: "What does the `print()` function do in Python?",
      options: [
        "Saves data to a file",
        "Displays output to the console",
        "Takes input from the user",
        "Creates a new variable",
      ],
      correct: 1,
      explanation: "print() outputs text or values to the console/terminal. It's the primary way to display information to the user.",
    });
  }

  if (hasFString) {
    quizzes.push({
      question: "What is an f-string in Python?",
      options: [
        "A function that formats files",
        "A string that allows embedding expressions inside {} braces",
        "A special string that only contains floats",
        "A frozen (immutable) string type",
      ],
      correct: 1,
      explanation: "f-strings (formatted string literals) let you embed Python expressions directly inside string literals using curly braces {}, making string formatting clean and readable.",
    });
  }

  if (hasDef) {
    quizzes.push({
      question: "What does the `def` keyword do?",
      options: [
        "Defines a new variable",
        "Defines a reusable function",
        "Deletes a function",
        "Defers execution to later",
      ],
      correct: 1,
      explanation: "The def keyword creates a function — a reusable block of code that you can call by name, optionally passing arguments.",
    });
  }

  if (hasReturn) {
    quizzes.push({
      question: "What does `return` do inside a function?",
      options: [
        "Prints a value to the screen",
        "Sends a value back to the caller and exits the function",
        "Repeats the function",
        "Deletes the function",
      ],
      correct: 1,
      explanation: "return sends a value back to wherever the function was called and immediately exits the function.",
    });
  }

  if (hasElse) {
    quizzes.push({
      question: "When does the `else` block execute?",
      options: [
        "Always, regardless of conditions",
        "Only when all preceding if/elif conditions are False",
        "Only when the if condition is True",
        "It runs before the if block",
      ],
      correct: 1,
      explanation: "The else block runs only when none of the preceding if or elif conditions evaluated to True.",
    });
  }

  if (hasList) {
    quizzes.push({
      question: "Which of these correctly describes a Python list?",
      options: [
        "An immutable sequence of items",
        "An ordered, mutable collection of items",
        "A key-value pair structure",
        "A single value container",
      ],
      correct: 1,
      explanation: "Lists are ordered, mutable (changeable) collections that can hold items of any type, defined with square brackets [].",
    });
  }

  if (hasDict) {
    quizzes.push({
      question: "What is a Python dictionary?",
      options: [
        "An ordered list of items",
        "A collection of key-value pairs",
        "A type of loop",
        "A built-in function",
      ],
      correct: 1,
      explanation: "Dictionaries store data as key-value pairs inside curly braces {}, allowing fast lookups by key.",
    });
  }

  if (hasWhile) {
    quizzes.push({
      question: "How does a `while` loop differ from a `for` loop?",
      options: [
        "while loops can only run once",
        "while loops continue as long as a condition is True",
        "while loops are faster",
        "There is no difference",
      ],
      correct: 1,
      explanation: "A while loop keeps repeating as long as its condition remains True, unlike for loops which iterate over a fixed sequence.",
    });
  }

  if (hasInput) {
    quizzes.push({
      question: "What does `input()` do?",
      options: [
        "Prints text to the screen",
        "Pauses the program and waits for user input",
        "Generates a random number",
        "Reads from a file",
      ],
      correct: 1,
      explanation: "input() pauses program execution, displays an optional prompt, and waits for the user to type something and press Enter. It always returns a string.",
    });
  }

  if (hasClass) {
    quizzes.push({
      question: "What does the `class` keyword define?",
      options: [
        "A new variable type",
        "A blueprint for creating objects",
        "A type of loop",
        "A module import",
      ],
      correct: 1,
      explanation: "The class keyword defines a blueprint (template) for creating objects, bundling data (attributes) and behavior (methods) together.",
    });
  }

  if (hasImport) {
    quizzes.push({
      question: "What does an `import` statement do?",
      options: [
        "Creates a new file",
        "Brings in code from another module for use",
        "Exports your code to another file",
        "Deletes a module",
      ],
      correct: 1,
      explanation: "import loads code from another Python module or package, making its functions, classes, and variables available in your current file.",
    });
  }

  // Always add a general question
  quizzes.push({
    question: "What is the correct way to add a comment in Python?",
    options: [
      "// This is a comment",
      "# This is a comment",
      "/* This is a comment */",
      "-- This is a comment",
    ],
    correct: 1,
    explanation: "Python uses the # symbol for single-line comments. Everything after # on that line is ignored by the interpreter.",
  });

  return quizzes.slice(0, 6);
}

const CodeQuizSection = ({ code }: { code: string }) => {
  const quizzes = useMemo(() => generateQuizzes(code), [code]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === quizzes[currentQ].correct) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= quizzes.length) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const quiz = quizzes[currentQ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-3xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold mb-4 text-center"
        >
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            🧠 Code Quiz
          </span>
        </motion.h2>
        <p className="text-center text-muted-foreground text-sm mb-10">
          Test your understanding of the code you just traced!
        </p>

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="glass neon-box rounded-2xl p-6 md:p-8"
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-muted-foreground">
                  Question {currentQ + 1} / {quizzes.length}
                </span>
                <span className="text-xs font-mono text-primary">
                  Score: {score}/{quizzes.length}
                </span>
              </div>

              <div className="w-full bg-muted rounded-full h-1.5 mb-6">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${((currentQ + 1) / quizzes.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="text-lg font-display font-semibold text-foreground mb-6 leading-relaxed">
                {quiz.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {quiz.options.map((opt, i) => {
                  let optClass = "glass border border-border hover:border-primary/50 hover:bg-primary/5";
                  if (selected !== null) {
                    if (i === quiz.correct) {
                      optClass = "border-2 border-green-500 bg-green-500/10";
                    } else if (i === selected && i !== quiz.correct) {
                      optClass = "border-2 border-destructive bg-destructive/10";
                    } else {
                      optClass = "glass border border-border opacity-50";
                    }
                  }
                  return (
                    <motion.button
                      key={i}
                      whileHover={selected === null ? { scale: 1.01 } : {}}
                      whileTap={selected === null ? { scale: 0.99 } : {}}
                      onClick={() => handleSelect(i)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${optClass}`}
                    >
                      <span className="text-sm font-medium text-foreground flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-xs font-mono text-muted-foreground shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation after selecting */}
              <AnimatePresence>
                {selected !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-xl bg-muted/30 border border-border"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      💡 {quiz.explanation}
                    </p>
                    <div className="flex justify-end mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={nextQuestion}
                        className="gradient-primary text-primary-foreground font-display font-semibold text-sm px-6 py-2 rounded-lg"
                      >
                        {currentQ + 1 >= quizzes.length ? "See Results" : "Next →"}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass neon-box rounded-2xl p-8 text-center"
            >
              <div className="text-6xl mb-4">
                {score === quizzes.length ? "🏆" : score >= quizzes.length / 2 ? "🎉" : "📚"}
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                {score === quizzes.length
                  ? "Perfect Score!"
                  : score >= quizzes.length / 2
                  ? "Great Job!"
                  : "Keep Learning!"}
              </h3>
              <p className="text-4xl font-bold text-primary mb-2">
                {score}/{quizzes.length}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {score === quizzes.length
                  ? "You have a solid understanding of this code!"
                  : "Review the explanation section and try again!"}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={restart}
                className="gradient-primary text-primary-foreground font-display font-semibold text-sm px-8 py-3 rounded-lg"
              >
                Try Again 🔄
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CodeQuizSection;
