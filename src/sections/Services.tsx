import { useInView } from '../hooks/useInView';

const services = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#FFCC00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 8L16 16H10V32H16L24 40L32 32H38V16H32L24 8Z" />
        <circle cx="24" cy="24" r="6" />
      </svg>
    ),
    title: 'Construction & Trades',
    description: 'Vehicle wraps, job site signage, uniform logos, and brand identity systems for builders, roofers, and contractors across the Mountain State.',
    tags: 'VEHICLE WRAPS \u2022 SIGNAGE \u2022 BRANDING',
    accentColor: '#FFCC00',
    glowColor: 'rgba(255,204,0,0.1)',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#003A70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 8V24M24 24L30 18M24 24L18 18" />
        <circle cx="24" cy="24" r="16" />
        <path d="M16 32C18 28 21 26 24 26C27 26 30 28 32 32" />
      </svg>
    ),
    title: 'Healthcare & Medical',
    description: 'Clean, trustworthy branding for private practices, dental offices, and clinics. Patient materials, website design, and visual identity that builds confidence.',
    tags: 'LOGO DESIGN \u2022 WEB DESIGN \u2022 PRINT',
    accentColor: '#003A70',
    glowColor: 'rgba(0,58,112,0.15)',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#C8102E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="32" r="8" />
        <path d="M24 32H40M36 28L40 32L36 36" />
        <path d="M28 16L32 20L36 16" />
        <circle cx="32" cy="16" r="6" />
      </svg>
    ),
    title: 'Home Services & B2B',
    description: 'Fleet branding, yard signs, business cards, and complete identity systems for HVAC, plumbing, electrical, and manufacturing companies.',
    tags: 'FLEET BRANDING \u2022 BUSINESS CARDS \u2022 SIGNAGE',
    accentColor: '#C8102E',
    glowColor: 'rgba(200,16,46,0.1)',
  },
];

export default function Services() {
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>();
  const { ref: cardsRef, inView: cardsInView } = useInView<HTMLDivElement>();

  return (
    <section
      id="services"
      className="relative w-full py-[120px] lg:py-[160px]"
      style={{ backgroundColor: '#0B0C10' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`transition-all duration-700 ease-out ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span
            className="font-mono text-[12px] tracking-[0.2em] uppercase block mb-6"
            style={{ color: '#FFCC00' }}
          >
            What We Do
          </span>
          <h2
            className="font-display text-[clamp(36px,4vw,56px)] text-[#F4F4F4] leading-[1.2]"
            style={{ textShadow: '0 0 30px rgba(0,40,85,0.3)', minHeight: '1.2em' }}
          >
            Built for West Virginia Businesses
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 lg:mt-20">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group p-10 lg:p-12 rounded relative overflow-hidden transition-all duration-700 ease-out ${cardsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
              style={{
                backgroundColor: '#1C1D21',
                border: '1px solid rgba(255,255,255,0.05)',
                transitionDelay: `${i * 150}ms`,
                transitionProperty: 'opacity, transform, border-color, box-shadow',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = service.accentColor;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = `0 20px 60px ${service.glowColor}`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(255,255,255,0.05)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)` }}
              />

              <div className="mb-6">{service.icon}</div>
              <h3
                className="font-body text-[24px] font-semibold text-[#F4F4F4] mb-4 group-hover:transition-colors duration-300"
                style={{ transition: 'color 0.3s ease' }}
              >
                {service.title}
              </h3>
              <p className="font-body text-[16px] text-[#F4F4F4] leading-[1.7] mb-6">
                {service.description}
              </p>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.1em]"
                style={{ color: service.accentColor }}
              >
                {service.tags}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-20 left-10 opacity-20 animate-star-twinkle-blue" style={{ animationDelay: '0.5s' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#003A70">
          <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 animate-star-twinkle-gold" style={{ animationDelay: '1.2s' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFCC00">
          <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
        </svg>
      </div>
    </section>
  );
}
