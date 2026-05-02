import { useInView } from '../hooks/useInView';

const paragraphs = [
  "We strip away the noise. We find the raw essence of your business and translate it into campaigns that command attention.",
  "West Virginia businesses deserve world-class creative. Not copy-paste templates. Not generic stock photos. Work that speaks the language of the Mountain State.",
  "From the coalfields to the capital, we partner with builders, healers, and makers who want their brand to mean something.",
];

export default function Manifesto() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>();
  const { ref: leftRef, inView: leftInView } = useInView<HTMLDivElement>();

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative w-full py-[120px] lg:py-[160px] overflow-hidden"
      style={{ backgroundColor: '#0B0C10' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #002855, #FFCC00, #C8102E, #FFCC00, #002855, transparent)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div
            ref={leftRef}
            className={`transition-all duration-700 ease-out ${leftInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <span
              className="font-mono text-[12px] tracking-[0.2em] uppercase block mb-6"
              style={{ color: '#FFCC00' }}
            >
              Our Philosophy
            </span>
            <h2
              className="font-display text-[clamp(36px,4vw,56px)] text-[#F4F4F4] leading-[1.2]"
              style={{ textShadow: '0 0 40px rgba(0,40,85,0.3)', minHeight: '1.2em' }}
            >
              Clarity in a Cluttered World
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {paragraphs.map((text, i) => (
              <div
                key={i}
                className={`overflow-hidden transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <p
                  className="font-body text-[18px] leading-[1.7] text-[#F4F4F4] hover:text-[#F4F4F4] transition-colors duration-500"
                  style={{ borderLeft: '2px solid transparent', paddingLeft: '0px', transition: 'all 0.5s ease' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLParagraphElement).style.borderLeftColor = '#FFCC00';
                    (e.currentTarget as HTMLParagraphElement).style.paddingLeft = '16px';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLParagraphElement).style.borderLeftColor = 'transparent';
                    (e.currentTarget as HTMLParagraphElement).style.paddingLeft = '0px';
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #C8102E, #FFCC00, #002855, #FFCC00, #C8102E, transparent)',
        }}
      />
    </section>
  );
}
