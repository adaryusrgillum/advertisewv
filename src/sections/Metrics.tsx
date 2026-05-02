import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 142, suffix: '%', label: 'AVERAGE CLIENT GROWTH', color: '#FFCC00', bgGlow: 'rgba(255,204,0,0.15)' },
  { value: 45, suffix: 'M+', label: 'IMPRESSIONS SERVED', color: '#003A70', bgGlow: 'rgba(0,58,112,0.2)' },
  { value: 98, suffix: '%', label: 'CLIENT RETENTION RATE', color: '#C8102E', bgGlow: 'rgba(200,16,46,0.15)' },
  { value: 12, suffix: '+', label: 'YEARS IN WEST VIRGINIA', color: '#D42670', bgGlow: 'rgba(212,38,112,0.15)' },
];

function AnimatedNumber({ value, suffix, triggered, accentColor }: { value: number; suffix: string; triggered: boolean; accentColor: string }) {
  const [display, setDisplay] = useState(0);
  const numRef = useRef({ val: 0 });

  useEffect(() => {
    if (!triggered) return;
    const obj = numRef.current;
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => setDisplay(Math.round(obj.val)),
    });
  }, [triggered, value]);

  return (
    <span
      className="font-display text-[72px] lg:text-[96px] leading-none"
      /* COLOR CHANGE 80-83: WV colored numbers on dark background */
      style={{
        color: '#1C1D21',
        textShadow: `0 0 60px ${accentColor}40`,
      }}
    >
      {display}{suffix}
    </span>
  );
}

export default function Metrics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ANIMATION CHANGE 49: Header entrance */
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => setTriggered(true),
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="relative w-full py-[100px] lg:py-[120px] overflow-hidden"
      style={{ backgroundColor: '#0B0C10' }}
    >
      {/* COLOR CHANGE 84-87: WV Flag gradient decorative lines */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, #002855, #FFCC00, #C8102E, #FFCC00, #002855)' }}
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div ref={headerRef}>
          {/* COLOR CHANGE 88: WV Gold label */}
          <span
            className="font-mono text-[12px] tracking-[0.2em] uppercase block mb-6"
            style={{ color: '#FFCC00' }}
          >
            The Numbers
          </span>
          {/* COLOR CHANGE 89: Headline with blue glow */}
          <h2
            className="font-display text-[clamp(36px,4vw,56px)] text-[#F4F4F4] leading-[1.2] mb-16 lg:mb-20"
            style={{ textShadow: '0 0 30px rgba(0,40,85,0.3)' }}
          >
            Impact You Can Measure
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="text-center lg:text-left p-6 rounded-lg transition-all duration-500 hover:scale-[1.02]"
              style={{ backgroundColor: metric.bgGlow }}
            >
              <div className="relative inline-block">
                <AnimatedNumber
                  value={metric.value}
                  suffix={metric.suffix}
                  triggered={triggered}
                  accentColor={metric.color}
                />
                {/* COLOR CHANGE 90-93: WV color-specific shimmer overlays */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(90deg, transparent, ${metric.color}, transparent)`,
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    animation: triggered ? 'shimmer-sweep 3s ease-in-out infinite' : 'none',
                    animationDelay: '2s',
                  }}
                >
                  {metric.value}{metric.suffix}
                </div>
              </div>
              {/* COLOR CHANGE 94-97: Labels with WV accent colors */}
              <span
                className="block font-mono text-[12px] tracking-wider uppercase mt-4"
                style={{ color: metric.color, opacity: 0.8 }}
              >
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* COLOR CHANGE 98: Bottom WV gradient line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, #002855, #FFCC00, #C8102E, #FFCC00, #002855)' }}
      />
    </section>
  );
}
