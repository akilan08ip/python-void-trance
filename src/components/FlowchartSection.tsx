import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlowNode {
  id: string;
  type: "start" | "process" | "decision" | "output" | "end" | "loop";
  label: string;
  detail: string;
}

function generateFlowchart(code: string): FlowNode[] {
  const lines = code.split("\n").filter((l) => l.trim() && !l.trim().startsWith("#"));
  const nodes: FlowNode[] = [{ id: "start", type: "start", label: "Start", detail: "Program begins execution." }];

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    const id = `node-${i}`;

    if (trimmed.startsWith("if ")) {
      const condition = trimmed.replace("if ", "").replace(":", "");
      nodes.push({ id, type: "decision", label: `If ${condition}`, detail: `Checks whether ${condition} is true. If yes, executes the indented block.` });
    } else if (trimmed.startsWith("elif ")) {
      const condition = trimmed.replace("elif ", "").replace(":", "");
      nodes.push({ id, type: "decision", label: `Elif ${condition}`, detail: `If previous conditions were false, checks ${condition}.` });
    } else if (trimmed.startsWith("else")) {
      nodes.push({ id, type: "decision", label: "Else", detail: "Runs if all previous conditions were false." });
    } else if (trimmed.startsWith("for ")) {
      const loopPart = trimmed.replace("for ", "").replace(":", "");
      nodes.push({ id, type: "loop", label: `Loop: ${loopPart}`, detail: `Repeats the indented block for each iteration of ${loopPart}.` });
    } else if (trimmed.startsWith("while ")) {
      const condition = trimmed.replace("while ", "").replace(":", "");
      nodes.push({ id, type: "loop", label: `While ${condition}`, detail: `Keeps repeating as long as ${condition} is true.` });
    } else if (trimmed.startsWith("print(")) {
      const content = trimmed.match(/print\((.+)\)/)?.[1] || "";
      nodes.push({ id, type: "output", label: `Print ${content}`, detail: `Outputs ${content} to the screen.` });
    } else if (trimmed.startsWith("def ")) {
      const name = trimmed.match(/def\s+(\w+)/)?.[1] || "function";
      nodes.push({ id, type: "process", label: `Define ${name}()`, detail: `Creates a reusable function called ${name}.` });
    } else if (trimmed.startsWith("return")) {
      nodes.push({ id, type: "output", label: `Return ${trimmed.replace("return ", "")}`, detail: "Sends a value back from the function." });
    } else if (trimmed.match(/^\w+\s*=\s*.+/)) {
      const varName = trimmed.split("=")[0].trim();
      nodes.push({ id, type: "process", label: `Set ${varName}`, detail: `Assigns a value to the variable "${varName}".` });
    } else {
      nodes.push({ id, type: "process", label: trimmed.substring(0, 30), detail: `Executes: ${trimmed}` });
    }
  });

  nodes.push({ id: "end", type: "end", label: "End", detail: "Program finishes execution." });
  return nodes;
}

const nodeStyles: Record<string, string> = {
  start: "rounded-full gradient-primary text-primary-foreground",
  end: "rounded-full bg-muted text-muted-foreground",
  process: "rounded-lg glass neon-border text-foreground",
  decision: "rounded-lg border-2 border-accent text-accent",
  output: "rounded-lg border-2 border-primary text-primary",
  loop: "rounded-lg border-2 border-accent text-accent",
};

const nodeIcons: Record<string, string> = {
  start: "▶",
  end: "■",
  process: "⚙",
  decision: "◆",
  output: "📤",
  loop: "🔄",
};

const FlowchartSection = ({ code }: { code: string }) => {
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const nodes = useMemo(() => generateFlowchart(code), [code]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-3xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold neon-text mb-4 text-center"
        >
          Execution Flowchart
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mb-10 text-sm"
        >
          Click any node to see what it does
        </motion.p>

        <div className="flex flex-col items-center gap-1">
          {nodes.map((node, i) => (
            <div key={node.id} className="flex flex-col items-center">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                className={`px-5 py-2.5 text-sm font-mono transition-all duration-200 ${nodeStyles[node.type]} ${
                  selectedNode?.id === node.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                }`}
              >
                <span className="mr-2">{nodeIcons[node.type]}</span>
                {node.label}
              </motion.button>

              {/* Arrow */}
              {i < nodes.length - 1 && (
                <div className="w-px h-6 bg-border relative">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-border" />
                </div>
              )}

              {/* Detail panel */}
              <AnimatePresence>
                {selectedNode?.id === node.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="glass neon-border rounded-lg p-4 mt-2 mb-2 max-w-md w-full text-center overflow-hidden"
                  >
                    <p className="text-sm text-muted-foreground">{node.detail}</p>
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground capitalize">
                      {node.type}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlowchartSection;
