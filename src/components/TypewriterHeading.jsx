import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function TypewriterHeading({
  line1 = "",
  line2Prefix = "",
  highlight = "",
  suffix = "",
  tag = "h2",
  speed = 26,
  initialDelay = 150,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const fullText = line1
    ? `${line1} ${line2Prefix}${highlight}${suffix}`.trim()
    : `${line2Prefix}${highlight}${suffix}`.trim();

  const [displayedCount, setDisplayedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let intervalId;
    const timeoutId = setTimeout(() => {
      let current = 0;
      intervalId = setInterval(() => {
        current += 1;
        setDisplayedCount(current);
        if (current >= fullText.length) {
          clearInterval(intervalId);
          setIsDone(true);
        }
      }, speed);
    }, initialDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isInView, fullText.length, speed, initialDelay]);

  const typedString = fullText.slice(0, displayedCount);

  const line1Len = line1.length;
  const line2Start = line1Len > 0 ? line1Len + 1 : 0;
  const highlightStart = line2Start + line2Prefix.length;
  const highlightEnd = highlightStart + highlight.length;

  let line1Typed = "";
  let line2PrefixTyped = "";
  let highlightTyped = "";
  let suffixTyped = "";

  if (line1Len > 0 && displayedCount > 0) {
    line1Typed = typedString.slice(0, Math.min(displayedCount, line1Len));
  }

  if (displayedCount > line2Start) {
    line2PrefixTyped = typedString.slice(line2Start, Math.min(displayedCount, highlightStart));
  }
  if (displayedCount > highlightStart) {
    highlightTyped = typedString.slice(highlightStart, Math.min(displayedCount, highlightEnd));
  }
  if (displayedCount > highlightEnd) {
    suffixTyped = typedString.slice(highlightEnd);
  }

  const Tag = tag;

  return (
    <Tag
      ref={ref}
      className={`typewriter-heading ${isDone ? "completed" : ""} ${className}`}
      aria-label={fullText}
    >
      {line1Len > 0 && (
        <span className="typewriter-line">
          {line1Typed}
          {displayedCount <= line1Len && !isDone && (
            <span className="typewriter-cursor-block" aria-hidden="true" />
          )}
        </span>
      )}
      {(displayedCount > line1Len || isInView || line1Len === 0) && (
        <span className={`typewriter-line ${line1Len > 0 ? "typewriter-line-break" : ""}`}>
          {line2PrefixTyped}
          {highlightTyped && <span className="typed-highlight">{highlightTyped}</span>}
          {suffixTyped}
          {(displayedCount > line1Len || line1Len === 0) && !isDone && (
            <span className="typewriter-cursor-block" aria-hidden="true" />
          )}
        </span>
      )}
    </Tag>
  );
}

