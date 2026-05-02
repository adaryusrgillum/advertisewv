import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  eraseSpeed?: number;
  delay?: number;
  pause?: number;
  className?: string;
  style?: React.CSSProperties;
  onCycle?: () => void;
}

export default function Typewriter({
  text,
  speed = 40,
  eraseSpeed = 25,
  delay = 0,
  pause = 2000,
  className,
  style,
  onCycle,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<'idle' | 'typing' | 'paused' | 'erasing'>('idle');

  useEffect(() => {
    setDisplayed('');
    setPhase('idle');
    const startTimer = setTimeout(() => setPhase('typing'), delay);
    return () => clearTimeout(startTimer);
  }, [text, delay]);

  useEffect(() => {
    if (phase === 'typing') {
      if (displayed.length < text.length) {
        const timer = setTimeout(() => {
          setDisplayed(text.slice(0, displayed.length + 1));
        }, speed);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setPhase('paused'), 100);
        return () => clearTimeout(timer);
      }
    }

    if (phase === 'paused') {
      const timer = setTimeout(() => setPhase('erasing'), pause);
      return () => clearTimeout(timer);
    }

    if (phase === 'erasing') {
      if (displayed.length > 0) {
        const timer = setTimeout(() => {
          setDisplayed((prev) => prev.slice(0, -1));
        }, eraseSpeed);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          onCycle?.();
        }, 200);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, displayed, text, speed, eraseSpeed, pause, onCycle]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className} style={style}>
      {displayed}
      <span style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
    </span>
  );
}
