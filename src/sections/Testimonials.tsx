import { useRef, useState } from 'react';

const testimonials = [
  {
    quote: "AdvertiseWV transformed our image. We went from looking like a weekend operation to a company that wins big contracts.",
    author: 'James Crawford',
    company: 'Crawford Construction, Charleston WV',
    accentColor: '#FFCC00',
  },
  {
    quote: "Our patient inquiries doubled within three months of the rebrand.",
    author: 'Dr. Sarah Mitchell',
    company: 'Summit Health Partners',
    accentColor: '#003A70',
  },
  {
    quote: "The fleet branding alone generated three new commercial accounts.",
    author: 'Mike Tanner',
    company: 'Tanner HVAC',
    accentColor: '#C8102E',
  },
  {
    quote: "Finally, a creative team that understands B2B industrial marketing.",
    author: 'Linda Voss',
    company: 'Ohio Valley Manufacturing',
    accentColor: '#D42670',
  },
  {
    quote: "Best investment we ever made. Period.",
    author: 'Rob Bennett',
    company: 'Bennett Roofing',
    accentColor: '#FFCC00',
  },
  {
    quote: "The new brand gives our patients confidence before they even walk in.",
    author: 'Amy Foster',
    company: 'Foster Family Dental',
    accentColor: '#003A70',
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef(0);
  const rotationStartRef = useRef(0);

  const total = testimonials.length;
  const anglePerCard = 360 / total;
  const radius = 320;

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = e.clientX;
    rotationStartRef.current = rotation;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartRef.current;
    setRotation(rotationStartRef.current + delta * 0.3);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden"
      style={{ height: '80vh', minHeight: '600px' }}
    >
      {/* Mountain background */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: 'url(/images/mountain-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* COLOR CHANGE 99: WV Blue tinted overlay */}
      <div className="absolute inset-0 z-[2]" style={{ backgroundColor: 'rgba(0,26,51,0.65)' }} />

      {/* COLOR CHANGE 100-103: WV Flag gradient top line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-[3]"
        style={{ background: 'linear-gradient(90deg, #002855, #FFCC00, #C8102E, #FFCC00, #002855)' }}
      />

      {/* Content */}
      <div className="relative z-[3] flex flex-col items-center h-full pt-16 lg:pt-20 pb-8">
        {/* COLOR CHANGE 104: WV Gold label */}
        <span
          className="font-mono text-[12px] tracking-[0.2em] uppercase block mb-4"
          style={{ color: '#FFCC00' }}
        >
          Client Voices
        </span>
        {/* COLOR CHANGE 105: Gold glow headline */}
        <h2
          className="font-display text-[clamp(36px,4vw,56px)] text-[#F4F4F4] leading-[1.2] mb-12"
          style={{ textShadow: '0 0 40px rgba(255,204,0,0.3)' }}
        >
          What They Say
        </h2>

        {/* 3D Carousel */}
        <div
          ref={containerRef}
          className="flex-1 w-full flex items-center justify-center cursor-grab active:cursor-grabbing perspective-[1000px]"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div className="relative w-full h-[300px]" style={{ transformStyle: 'preserve-3d' }}>
            {testimonials.map((t, i) => {
              const angle = (i * anglePerCard + rotation) * (Math.PI / 180);
              const x = Math.sin(angle) * radius;
              const z = Math.cos(angle) * radius;
              const opacity = (z + radius) / (2 * radius);

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 w-[320px] lg:w-[380px] p-8 lg:p-10 rounded-2xl select-none"
                  style={{
                    /* COLOR CHANGE 106-111: WV-themed card backgrounds */
                    backgroundColor: 'rgba(0,26,51,0.7)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${t.accentColor}33`,
                    boxShadow: `0 10px 40px ${t.accentColor}15`,
                    transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px)`,
                    opacity: 0.3 + opacity * 0.7,
                    transition: isDragging ? 'none' : 'opacity 0.3s ease',
                  }}
                >
                  {/* COLOR CHANGE 112: WV Gold quote mark */}
                  <span
                    className="font-display text-[48px] leading-none block mb-2"
                    style={{ color: t.accentColor, opacity: 0.5 }}
                  >
                    &ldquo;
                  </span>
                  <p className="font-body text-[16px] text-[#F4F4F4] leading-[1.6] italic">
                    {t.quote}
                  </p>
                  <div className="mt-6">
                    <p className="font-body text-[14px] font-semibold text-[#F4F4F4]">{t.author}</p>
                    {/* COLOR CHANGE 113-118: WV accent colored company names */}
                    <p
                      className="font-mono text-[12px] mt-1"
                      style={{ color: t.accentColor, opacity: 0.8 }}
                    >
                      {t.company}
                    </p>
                  </div>
                  {/* COLOR CHANGE 119: WV accent bottom line */}
                  <div
                    className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${t.accentColor}, transparent)` }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* COLOR CHANGE 120: WV Gold drag hint */}
        <p className="font-mono text-[10px] tracking-wider uppercase" style={{ color: '#FFCC00', opacity: 0.6 }}>
          Drag to explore
        </p>
      </div>

      {/* COLOR CHANGE 121: WV Flag gradient bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-[3]"
        style={{ background: 'linear-gradient(90deg, #002855, #FFCC00, #C8102E, #FFCC00, #002855)' }}
      />
    </section>
  );
}
