import { useState } from "react";
import { Copy, Check } from "lucide-react";

// Python syntax highlighting
const highlightPython = (code: string): string => {
  const lines = code.split("\n");
  return lines
    .map((line) => {
      let result = line;
      // Escape HTML
      result = result.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      // Comments
      result = result.replace(/(#.*)$/gm, '<span class="text-emerald-400/70">$1</span>');
      // Strings (double and single quoted, including f-strings)
      result = result.replace(/(f?"""[\s\S]*?"""|f?'''[\s\S]*?'''|f?"[^"]*"|f?'[^']*')/g, '<span class="text-amber-300">$1</span>');
      // Keywords
      const keywords = /\b(def|class|return|if|elif|else|for|while|import|from|as|try|except|finally|with|yield|lambda|pass|break|continue|in|not|and|or|is|True|False|None|raise|global|nonlocal|assert|del|async|await)\b/g;
      result = result.replace(keywords, '<span class="text-fuchsia-400">$1</span>');
      // Built-in functions
      const builtins = /\b(print|range|len|int|float|str|list|dict|set|tuple|type|input|open|enumerate|zip|map|filter|sorted|sum|min|max|abs|round|super|isinstance|hasattr|getattr)\b(?=\s*\()/g;
      result = result.replace(builtins, '<span class="text-cyan-300">$1</span>');
      // Numbers
      result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-300">$1</span>');
      // Decorators
      result = result.replace(/(@\w+)/g, '<span class="text-yellow-300">$1</span>');
      // Function/class definitions
      result = result.replace(/(def\s+)(\w+)/g, '$1<span class="text-sky-300">$2</span>');
      result = result.replace(/(class\s+)(\w+)/g, '$1<span class="text-sky-300">$2</span>');
      return result;
    })
    .join("\n");
};

interface CodeBlockProps {
  code: string;
  filename?: string;
  showLineNumbers?: boolean;
}

const CodeBlock = ({ code, filename = "example.py", showLineNumbers = true }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");
  const highlighted = highlightPython(code);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-border/50 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-[10px] font-mono text-muted-foreground ml-2">{filename}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      {/* Code */}
      <div className="bg-muted/20 overflow-x-auto">
        <pre className="font-mono text-xs leading-relaxed p-4">
          <code>
            {highlighted.split("\n").map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span className="select-none text-muted-foreground/40 w-8 shrink-0 text-right pr-4 inline-block">
                    {i + 1}
                  </span>
                )}
                <span dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }} />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
