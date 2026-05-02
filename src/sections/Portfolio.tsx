import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: '/images/portfolio-1.jpg',
    title: 'Appalachian Builders Rebrand',
    category: 'VEHICLE WRAPS \u2022 BRANDING',
    accentColor: '#FFCC00',
  },
  {
    image: '/images/portfolio-2.jpg',
    title: 'Summit Health Partners',
    category: 'HEALTHCARE \u2022 IDENTITY',
    accentColor: '#003A70',
  },
  {
    image: '/images/portfolio-3.jpg',
    title: 'Mountain Air HVAC',
    category: 'FLEET BRANDING \u2022 SIGNAGE',
    accentColor: '#C8102E',
  },
  {
    image: '/images/portfolio-4.jpg',
    title: 'Ohio Valley Manufacturing',
    category: 'B2B BRANDING \u2022 SIGNAGE',
    accentColor: '#D42670',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ANIMATION CHANGE 44: Header entrance */
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });

      /* ANIMATION CHANGE 45-48: Items stagger in */
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative w-full py-[120px] lg:py-[160px]"
      style={{ backgroundColor: '#0B0C10' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div ref={headerRef}>
          {/* COLOR CHANGE 70: WV Gold label */}
          <span
            className="font-mono text-[12px] tracking-[0.2em] uppercase block mb-6"
            style={{ color: '#FFCC00' }}
          >
            Selected Work
          </span>
          {/* COLOR CHANGE 71: WV blue glow headline */}
          <h2
            className="font-display text-[clamp(36px,4vw,56px)] text-[#F4F4F4] leading-[1.2] mb-16 lg:mb-20"
            style={{ textShadow: '0 0 30px rgba(0,40,85,0.3)' }}
          >
            Brands We&apos;ve Built
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { if (el) itemsRef.current[i] = el; }}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              style={{ aspectRatio: '16/10' }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* COLOR CHANGE 72-75: WV-themed gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(transparent 30%, ${project.accentColor}22 60%, rgba(11,12,16,0.95) 100%)`,
                }}
              />
              {/* COLOR CHANGE 76-79: WV gold accent border on hover */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  border: `2px solid ${project.accentColor}`,
                  boxShadow: `0 0 30px ${project.accentColor}33`,
                }}
              />
              {/* Text content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span
                  className="font-mono text-[12px] tracking-wider uppercase block mb-2"
                  style={{ color: project.accentColor }}
                >
                  {project.category}
                </span>
                <h3 className="font-body text-[24px] font-semibold text-[#F4F4F4]">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
