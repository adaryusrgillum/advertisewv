import { useEffect, useState } from 'react';
import Typewriter from '../components/Typewriter';

const HEADLINES = [
  'We Build Brands That Last',
  'Your Brand, Our Mission',
  'Built to Be Remembered',
];

export default function Hero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCycle = () => {
    setHeadlineIndex((prev) => (prev + 1) % HEADLINES.length);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundImage: 'url(/images/mountain-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-animate { opacity: 0; }
        .hero-animate.active { animation: heroFadeUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .hero-animate-delay-1.active { animation-delay: 0.3s; }
        .hero-animate-delay-2.active { animation-delay: 0.6s; }
        .hero-animate-delay-3.active { animation-delay: 0.9s; }
        .hero-animate-delay-4.active { animation-delay: 1.1s; }
      `}</style>

      <div className="relative z-[3] flex flex-col items-center justify-center h-full px-6 text-center">
        <h1
          className={`font-display text-[clamp(48px,8vw,96px)] text-[#F4F4F4] leading-[1.1] max-w-[900px] hero-animate hero-animate-delay-1 ${mounted ? 'active' : ''}`}
          style={{
            textShadow: '0 0 60px rgba(0,40,85,0.5), 0 4px 20px rgba(0,0,0,0.8)',
            minHeight: '1.2em',
          }}
        >
          {mounted && (
            <Typewriter
              key={headlineIndex}
              text={HEADLINES[headlineIndex]}
              speed={45}
              eraseSpeed={30}
              pause={2200}
              onCycle={handleCycle}
            />
          )}
        </h1>

        <p
          className={`font-body text-[18px] max-w-[520px] mt-6 hero-animate hero-animate-delay-2 ${mounted ? 'active' : ''}`}
          style={{ color: '#F4F4F4' }}
        >
          Branding and advertising for West Virginia&apos;s construction, healthcare, and home service businesses.
        </p>

        <div
          className={`flex flex-wrap items-center justify-center gap-4 mt-10 hero-animate hero-animate-delay-3 ${mounted ? 'active' : ''}`}
        >
          <a
            href="#cta"
            onClick={(e) => handleNavClick(e, '#cta')}
            className="animate-wv-gold-pulse inline-block font-body text-[16px] font-semibold px-8 py-4 rounded transition-transform duration-200 hover:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #D4A800 0%, #FFCC00 50%, #FFE44D 100%)',
              color: '#002855',
            }}
          >
            Ignite Your Growth
          </a>
          <a
            href="#portfolio"
            onClick={(e) => handleNavClick(e, '#portfolio')}
            className="inline-block font-body text-[16px] font-semibold px-8 py-4 rounded transition-all duration-300 hover:border-[#FFCC00] hover:text-[#FFCC00]"
            style={{
              background: 'transparent',
              border: '1px solid #003A70',
              color: '#F4F4F4',
            }}
          >
            View Our Work
          </a>
        </div>
      </div>

      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-3 hero-animate hero-animate-delay-4 ${mounted ? 'active' : ''}`}
      >
        <div className="relative w-[1px] h-[40px] overflow-hidden" style={{ backgroundColor: 'rgba(255,204,0,0.15)' }}>
          <div
            className="absolute top-0 left-0 w-full h-[12px]"
            style={{
              backgroundColor: '#FFCC00',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }}
          />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: '#FFCC00' }}>
          Scroll
        </span>
      </div>
    </section>
  );
}
