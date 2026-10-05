"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Seg = [string, string];
const lines: Seg[][] = [
  [["const ", "k"], ["mahsatech", "v"], [" = {", "p"]],
  [["  developers: ", "p"], ['["Mahsa", "Ahmad"]', "s"], [",", "p"]],
  [["  stack: ", "p"], ['["Next.js", "AI", "Web3"]', "s"], [",", "p"]],
  [["  values: ", "p"], ['["precision", "transparency"]', "s"], [",", "p"]],
  [["  status: ", "p"], ['"open for projects"', "s"], [",", "p"]],
  [["};", "p"]],
  [["", "p"]],
  [["await ", "k"], ["mahsatech", "v"], [".build(", "p"], ["yourIdea", "n"], [");", "p"]],
];
const total = lines.reduce((a, l) => a + l.reduce((b, [t]) => b + t.length, 0) + 1, 0);

export default function CodeWindow() {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduce) { setN(total); return; }
    const start = setTimeout(() => {
      const id = setInterval(() => setN((x) => (x >= total ? (clearInterval(id), x) : x + 1)), 38);
    }, 700);
    return () => clearTimeout(start);
  }, [reduce]);

  // Index of the line currently being typed (last line once finished).
  let acc = 0;
  let caretLine = lines.length - 1;
  for (let i = 0; i < lines.length; i++) {
    acc += lines[i].reduce((b, [t]) => b + t.length, 0) + 1;
    if (n < acc) { caretLine = i; break; }
  }
  let left = n;
  return (
    <div className="codewrap" dir="ltr">
      <motion.span className="chip c1" animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>Next.js 15</motion.span>
      <motion.span className="chip c2" animate={reduce ? undefined : { y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>TypeScript</motion.span>
      <div className="code">
        <div className="code-bar"><i /><i /><i /><span>mahsatech.ts</span></div>
        <pre>
          {lines.map((l, i) => {
            const row = l.map(([t, c], j) => {
              const part = t.slice(0, Math.max(0, left));
              left -= t.length;
              return <span key={j} className={`tk-${c}`}>{part}</span>;
            });
            left -= 1;
            return <div key={i} className="cl">{row}{i === caretLine && <b className="caret" />}</div>;
          })}
        </pre>
      </div>
    </div>
  );
}
