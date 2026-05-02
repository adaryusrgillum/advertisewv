import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'LOGO CLEANUP',
    price: '$499',
    period: 'one-time',
    featured: false,
    accentColor: '#F4F4F4',
    borderColor: 'rgba(255,255,255,0.05)',
    features: [
      'Vector conversion',
      'Transparent PNG files',
      'Color correction',
      '3 revision rounds',
    ],
  },
  {
    name: 'LOCAL REBRAND',
    price: '$2,500',
    period: 'starting at',
    featured: true,
    /* COLOR CHANGE 122-126: WV Flag colors for featured */
    accentColor: '#FFCC00',
    borderColor: '2px solid #FFCC00',
    features: [
      'Everything in Logo Cleanup',
      'New logo design',
      'Business card design',
      'Vehicle wrap design',
      'Social media brand kit',
      'Brand style guide',
    ],
  },
  {
    name: 'FULL IDENTITY SYSTEM',
    price: '$7,500',
    period: 'starting at',
    featured: false,
    accentColor: '#C8102E',
    borderColor: '1px solid rgba(255,255,255,0.05)',
    features: [
      'Everything in Local Rebrand',
      'Comprehensive brand guide',
      'Signage design',
      'Website visual branding',
      'Ad creative templates',
      'Priority support',
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ANIMATION CHANGE 50: Header entrance */
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });

      /* ANIMATION CHANGE 51-53: Card staggered entrance */
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative w-full py-[120px] lg:py-[160px]"
      style={{ backgroundColor: '#0B0C10' }}
    >
      {/* COLOR CHANGE 127: WV gradient top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, #002855, #FFCC00, #C8102E, #FFCC00, #002855, transparent)' }}
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div ref={headerRef}>
          {/* COLOR CHANGE 128: WV Gold label */}
          <span
            className="font-mono text-[12px] tracking-[0.2em] uppercase block mb-6"
            style={{ color: '#FFCC00' }}
          >
            Investment
          </span>
          {/* COLOR CHANGE 129: Blue glow headline */}
          <h2
            className="font-display text-[clamp(36px,4vw,56px)] text-[#F4F4F4] leading-[1.2] mb-16 lg:mb-20"
            style={{ textShadow: '0 0 30px rgba(0,40,85,0.3)' }}
          >
            Choose Your Game Plan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="relative p-10 lg:p-12 rounded"
              style={{
                backgroundColor: '#1C1D21',
                border: plan.featured ? plan.borderColor : plan.borderColor,
                boxShadow: plan.featured ? '0 0 40px rgba(255,204,0,0.1)' : 'none',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={(e) => {
                if (plan.featured) {
                  e.currentTarget.style.boxShadow = '0 0 60px rgba(255,204,0,0.25)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = plan.featured ? '0 0 40px rgba(255,204,0,0.1)' : 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* COLOR CHANGE 130: WV Gold "Most Popular" badge */}
              {plan.featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] px-4 py-1.5 rounded-sm"
                  style={{
                    background: 'linear-gradient(135deg, #D4A800, #FFCC00)',
                    color: '#002855',
                    fontWeight: 600,
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              {/* COLOR CHANGE 131-133: Tier names with accent colors */}
              <span
                className="font-mono text-[12px] tracking-[0.2em] uppercase block mb-4"
                style={{ color: plan.accentColor }}
              >
                {plan.name}
              </span>

              <div className="flex items-baseline gap-2 mb-2">
                {/* COLOR CHANGE 134-136: Prices with accent colors */}
                <span
                  className="font-display text-[48px]"
                  style={{ color: plan.featured ? '#FFCC00' : '#F4F4F4' }}
                >
                  {plan.price}
                </span>
              </div>
              <span className="font-body text-[14px] text-[#F4F4F4] block mb-8">{plan.period}</span>

              <div
                className="w-full h-[1px] mb-8"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              />

              <ul className="flex flex-col gap-3 mb-10">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="font-body text-[16px] text-[#F4F4F4] leading-[1.6] flex items-start gap-3"
                  >
                    {/* COLOR CHANGE 137-139: WV accent checkmarks */}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 flex-shrink-0">
                      <path
                        d="M3 8L6.5 11.5L13 4.5"
                        stroke={plan.accentColor}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* COLOR CHANGE 140-142: WV-themed CTAs */}
              {plan.featured ? (
                <a
                  href="#cta"
                  className="block w-full text-center font-body text-[14px] font-semibold py-3.5 rounded transition-all duration-300 hover:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #D4A800 0%, #FFCC00 100%)',
                    color: '#002855',
                  }}
                >
                  Get Started
                </a>
              ) : (
                <a
                  href="#cta"
                  className="block w-full text-center font-body text-[14px] font-semibold py-3.5 rounded transition-all duration-300 hover:border-[#FFCC00] hover:text-[#FFCC00]"
                  style={{
                    border: `1px solid ${plan.accentColor}`,
                    color: '#F4F4F4',
                  }}
                >
                  Get Started
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* COLOR CHANGE 143: WV Flag gradient bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, #C8102E, #FFCC00, #002855, #FFCC00, #C8102E, transparent)' }}
      />
    </section>
  );
}
