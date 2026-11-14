"use client";

import { useEffect, useState } from "react";

/** Types and deletes each word in a loop. */
export function Typewriter({ words, className = "" }: { words: string[]; className?: string }) {
  const list = words.length ? words : [""];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(list[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || list.length < 2) return;
    const word = list[index % list.length] ?? "";
    let delay = deleting ? 45 : 85;
    if (!deleting && text === word) delay = 1700;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % list.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, list]);

  return (
    <span className={className}>
      <span className="text-gradient">{text}</span>
      <span className="animate-caret ml-0.5 inline-block w-[3px] -translate-y-[0.05em] self-stretch rounded bg-violet align-middle" style={{ height: "0.95em" }} />
    </span>
  );
}
