import { useInView } from '../hooks/useInView';
import SnowSquall from '../components/SnowSquall';

export default function CallToAction() {
  const { ref: contentRef, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="cta"
      className="relative w-full overflow-hidden"
      style={{ minHeight: '700px', backgroundColor: '#0B0C10' }}
    >
      <SnowSquall />

      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,26,51,0.2) 0%, rgba(0,40,85,0.4) 50%, rgba(11,12,16,0.8) 100%)',
        }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-[3]"
        style={{ background: 'linear-gradient(90deg, #002855, #FFCC00, #C8102E, #FFCC00, #002855)' }}
      />

      <div
        ref={contentRef}
        className={`relative z-[3] flex flex-col items-center justify-center h-full px-6 text-center min-h-[700px] transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h2
          className="font-display text-[clamp(48px,8vw,96px)] text-[#F4F4F4] leading-[1.1]"
          style={{
            textShadow: '0 0 60px rgba(0,40,85,0.6), 0 0 120px rgba(255,204,0,0.2)',
            minHeight: '1.2em',
          }}
        >
          Ready to Make Your Mark?
        </h2>
        <p className="font-body text-[18px] max-w-[480px] mt-6" style={{ color: '#F4F4F4' }}>
          Let&apos;s build something worth remembering. Your brand deserves more than generic.
        </p>
        <a
          href="mailto:hello@advertisewv.com"
          className="animate-wv-gold-pulse inline-block font-body text-[18px] font-semibold px-10 py-4 rounded mt-10 transition-all duration-300 hover:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, #D4A800 0%, #FFCC00 50%, #FFE44D 100%)',
            color: '#002855',
            boxShadow: '0 0 40px rgba(255,204,0,0.2)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 60px rgba(255,204,0,0.5)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(255,204,0,0.2)';
          }}
        >
          Start Your Project
        </a>
      </div>

      <div className="absolute top-20 left-[10%] z-[3] animate-star-twinkle-gold" style={{ animationDelay: '0.3s' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFCC00" opacity="0.4">
          <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
        </svg>
      </div>
      <div className="absolute bottom-32 right-[15%] z-[3] animate-star-twinkle-blue" style={{ animationDelay: '1.5s' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#003A70" opacity="0.5">
          <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
        </svg>
      </div>
      <div className="absolute top-40 right-[20%] z-[3] animate-star-twinkle-gold delay-1000" style={{ animationDelay: '2.5s' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFCC00" opacity="0.3">
          <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
        </svg>
      </div>
    </section>
  );
}
