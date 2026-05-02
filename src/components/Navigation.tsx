import { useEffect, useRef, useState } from 'react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'About', href: '#manifesto' },
  { label: 'Contact', href: '#cta' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(0,26,51,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,204,0,0.1)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 flex items-center justify-between h-[72px]">
        {/* COLOR CHANGE 13: Logo with WV gold accent */}
        {/* ANIMATION CHANGE 1: Gold text glow on logo */}
        <a
          href="#hero"
          className="font-mono text-[14px] font-semibold tracking-[0.15em] text-[#FFCC00] animate-gold-text-glow"
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          ADVERTISEWV
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              /* COLOR CHANGE 14: WV blue-tinted hover */
              className="relative font-body text-[14px] font-medium text-[#F4F4F4] hover:text-[#FFCC00] transition-colors duration-300 group"
              /* ANIMATION CHANGE 2-6: Staggered entrance */
              style={{ animation: `fade-in-gold 0.6s ease-out ${i * 0.1}s both` }}
            >
              {link.label}
              {/* COLOR CHANGE 15: WV gold underline */}
              <span
                className="absolute bottom-[-4px] left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ background: 'linear-gradient(90deg, #FFCC00, #D4A800)' }}
              />
            </a>
          ))}
        </div>

        {/* COLOR CHANGE 16: WV Blue CTA button */}
        {/* ANIMATION CHANGE 7: Blue pulse glow */}
        <div className="hidden md:block" style={{ animation: 'fade-in-gold 0.8s ease-out 0.5s both' }}>
          <a
            href="#cta"
            onClick={(e) => handleNavClick(e, '#cta')}
            className="animate-wv-blue-pulse inline-block font-body text-[14px] font-semibold px-6 py-3 rounded transition-all duration-300 hover:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #002855 0%, #003A70 100%)',
              color: '#FFCC00',
              border: '1px solid rgba(255,204,0,0.3)',
            }}
          >
            Start a Project
          </a>
        </div>

        {/* Mobile Hamburger - WV Gold colored */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-[2px] transition-all duration-300"
            style={{
              backgroundColor: '#FFCC00',
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-[2px] bg-[#FFCC00] transition-opacity duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-[2px] transition-all duration-300"
            style={{
              backgroundColor: '#FFCC00',
              transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu - WV Blue themed */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 top-[72px] z-40"
          style={{
            background: 'linear-gradient(180deg, rgba(0,26,51,0.98) 0%, rgba(0,40,85,0.95) 100%)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-display text-[32px] text-[#F4F4F4] hover:text-[#FFCC00] transition-colors duration-300"
                /* ANIMATION CHANGE 8-12: Staggered mobile menu entrance */
                style={{ animation: `slide-in-left-gold 0.5s ease-out ${i * 0.08}s both` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
