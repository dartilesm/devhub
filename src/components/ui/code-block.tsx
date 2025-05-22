"use client";

import { Button, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";

// Add proper types for highlight.js
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/atom-one-dark.css";
import { CheckIcon, CopyIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// Register the languages
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("html", html);
hljs.registerLanguage("css", css);
hljs.registerLanguage("python", python);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;

  // Add missing props that are used in App.tsx
  className?: string;
  hideSymbol?: boolean;
  tooltipProps?: {
    content?: string;
    color?: "default" | "foreground" | "primary" | "secondary" | "success" | "warning" | "danger";
    [key: string]: unknown;
  };
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code = "", // Add default empty string to prevent undefined
  language = "javascript",
  showLineNumbers = true,
  className = "",
  hideSymbol = false, // Add default value
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Format language display name
  const formatLanguage = (lang: string): string => {
    const languageMap: Record<string, string> = {
      js: "JavaScript",
      javascript: "JavaScript",
      ts: "TypeScript",
      typescript: "TypeScript",
      jsx: "JSX",
      tsx: "TSX",
      html: "HTML",
      css: "CSS",
      scss: "SCSS",
      py: "Python",
      python: "Python",
      rb: "Ruby",
      go: "Go",
      rust: "Rust",
      java: "Java",
      c: "C",
      cpp: "C++",
      cs: "C#",
      php: "PHP",
      swift: "Swift",
      kotlin: "Kotlin",
      shell: "Shell",
      bash: "Bash",
      json: "JSON",
      yaml: "YAML",
      md: "Markdown",
      sql: "SQL",
    };

    return languageMap[lang.toLowerCase()] || lang;
  };

  // Get language icon based on language type
  const getLanguageIcon = (lang: string): string => {
    const iconMap: Record<string, string> = {
      javascript: "logos:javascript",
      js: "logos:javascript",
      typescript: "logos:typescript-icon",
      ts: "logos:typescript-icon",
      jsx: "logos:react",
      tsx: "logos:react",
      html: "logos:html-5",
      css: "logos:css-3",
      scss: "logos:sass",
      python: "logos:python",
      py: "logos:python",
      ruby: "logos:ruby",
      rb: "logos:ruby",
      go: "logos:go",
      rust: "logos:rust",
      java: "logos:java",
      c: "logos:c",
      cpp: "logos:c-plusplus",
      cs: "logos:c-sharp",
      php: "logos:php",
      swift: "logos:swift",
      kotlin: "logos:kotlin",
      shell: "logos:terminal",
      bash: "logos:terminal",
      json: "logos:json",
      yaml: "logos:yaml",
      markdown: "logos:markdown",
      md: "logos:markdown",
      sql: "logos:mysql",
    };

    return iconMap[lang.toLowerCase()] || "lucide:code";
  };

  // Highlight the code with highlight.js
  const highlightedCode = React.useMemo(() => {
    if (!code) return ""; // Safety check for empty code

    try {
      let highlighted;

      // Check if the language is registered
      if (hljs.getLanguage(language.toLowerCase())) {
        highlighted = hljs.highlight(code, {
          language: language.toLowerCase(),
        }).value;
      } else {
        // Fallback to auto detection
        highlighted = hljs.highlightAuto(code).value;
      }

      // Fix how line numbers are handled with hideSymbol
      if (showLineNumbers && !hideSymbol) {
        // Only add line numbers if showLineNumbers is true AND hideSymbol is false
        const lines = highlighted.split("\n");
        const paddingWidth = lines.length.toString().length;

        return lines
          .map((line, i) => {
            const lineNumber = (i + 1).toString().padStart(paddingWidth, " ");
            return `<span class="code-line-number text-default-400">${lineNumber} |</span> ${line}`;
          })
          .join("\n");
      }

      return highlighted;
    } catch (error) {
      console.error("Error highlighting code:", error);

      // Fallback to plain text with line numbers if needed
      if (showLineNumbers && code) {
        const lines = code.split("\n");
        const paddingWidth = lines.length.toString().length;

        return lines
          .map((line, i) => {
            const lineNumber = (i + 1).toString().padStart(paddingWidth, " ");
            return `<span class="code-line-number text-default-400">${lineNumber} |</span> ${line}`;
          })
          .join("\n");
      }

      return code; // Return original code if all else fails
    }
  }, [code, language, showLineNumbers, hideSymbol]);

  // Calculate line number width safely
  const lineNumberWidth = React.useMemo(() => {
    if (!code) return "3ch";
    const length = code.split("\n").length.toString().length;
    return `${length + 3}ch`;
  }, [code]);

  return (
    <div
      className={`rounded-lg overflow-hidden border border-default-200 bg-content1 ${className} cursor-default`}
    >
      <div className='flex items-center justify-between pl-4 pr-2 py-1'>
        <div className='flex items-center gap-2'>
          <Icon icon={getLanguageIcon(language)} className='w-4 h-4' />
          <span className='text-xs font-medium'>{formatLanguage(language)}</span>
        </div>
        <div>
          <Tooltip content={copied ? "Copied!" : "Copy code"}>
            <Button
              isIconOnly
              size='sm'
              variant='light'
              color='default'
              onPress={handleCopy}
              aria-label='Copy code'
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={copied ? "copied" : "copy"}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {!copied && <CopyIcon size={16} className='text-default-400' />}
                  {copied && <CheckIcon size={16} className='text-default-400' />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className='px-4 pb-4 pt-0 overflow-auto max-h-[500px]'>
        <pre className='text-sm whitespace-pre'>
          <code
            className={`language-${language} block`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
      <style jsx>{`
        .code-line-number {
          display: inline-block;
          min-width: ${lineNumberWidth};
          user-select: none;
        }
      `}</style>
    </div>
  );
};
