import { useInView } from '../hooks/useInView';

const serviceLinks = ['Branding', 'Digital Ads', 'Web Design', 'Signage', 'Vehicle Wraps'];
const companyLinks = ['About', 'Our Work', 'Blog', 'Careers', 'Contact'];
const connectLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: '681-837-2078', href: 'tel:681-837-2078' },
  { label: 'hello@advertisewv.com', href: 'mailto:hello@advertisewv.com' },
];

export default function Footer() {
  const { ref: footerRef, inView } = useInView<HTMLElement>();

  return (
    <footer
      ref={footerRef}
      className="relative w-full"
      style={{
        backgroundColor: '#001A33',
        borderTop: '2px solid transparent',
        borderImage: 'linear-gradient(90deg, #002855, #FFCC00, #C8102E, #FFCC00, #002855) 1',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div>
            <span
              className="font-mono text-[14px] font-semibold tracking-[0.15em]"
              style={{ color: '#FFCC00' }}
            >
              ADVERTISEWV
            </span>
            <p className="font-body text-[14px] mt-4 leading-[1.7]" style={{ color: '#F4F4F4' }}>
              Branding and advertising for West Virginia businesses.
            </p>
            <div className="mt-6 animate-star-twinkle-gold" style={{ animationDelay: '0.5s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFCC00" opacity="0.4">
                <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
              </svg>
            </div>
          </div>

          <div>
            <span
              className="font-mono text-[12px] tracking-[0.2em] uppercase block mb-4"
              style={{ color: '#FFCC00' }}
            >
              Services
            </span>
            <ul className="flex flex-col gap-2">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <span
                    className="font-body text-[14px] transition-all duration-300 cursor-pointer block"
                    style={{ color: '#F4F4F4' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLSpanElement).style.color = '#FFCC00';
                      (e.currentTarget as HTMLSpanElement).style.textShadow = '0 0 10px rgba(255,204,0,0.3)';
                      (e.currentTarget as HTMLSpanElement).style.paddingLeft = '8px';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLSpanElement).style.color = '#F4F4F4';
                      (e.currentTarget as HTMLSpanElement).style.textShadow = 'none';
                      (e.currentTarget as HTMLSpanElement).style.paddingLeft = '0px';
                    }}
                  >
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span
              className="font-mono text-[12px] tracking-[0.2em] uppercase block mb-4"
              style={{ color: '#FFCC00' }}
            >
              Company
            </span>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link}>
                  <span
                    className="font-body text-[14px] transition-all duration-300 cursor-pointer block"
                    style={{ color: '#F4F4F4' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLSpanElement).style.color = '#FFCC00';
                      (e.currentTarget as HTMLSpanElement).style.textShadow = '0 0 10px rgba(255,204,0,0.3)';
                      (e.currentTarget as HTMLSpanElement).style.paddingLeft = '8px';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLSpanElement).style.color = '#F4F4F4';
                      (e.currentTarget as HTMLSpanElement).style.textShadow = 'none';
                      (e.currentTarget as HTMLSpanElement).style.paddingLeft = '0px';
                    }}
                  >
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span
              className="font-mono text-[12px] tracking-[0.2em] uppercase block mb-4"
              style={{ color: '#FFCC00' }}
            >
              Connect
            </span>
            <ul className="flex flex-col gap-2">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-[14px] transition-all duration-300 block"
                    style={{ color: '#F4F4F4' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#FFCC00';
                      (e.currentTarget as HTMLAnchorElement).style.textShadow = '0 0 10px rgba(255,204,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#F4F4F4';
                      (e.currentTarget as HTMLAnchorElement).style.textShadow = 'none';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pt-8"
          style={{ borderTop: '1px solid rgba(255,204,0,0.1)' }}
        >
          <span className="font-body text-[12px]" style={{ color: '#F4F4F4' }}>
            &copy; 2026 AdvertiseWV. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <span
              className="font-body text-[12px] transition-colors duration-300 cursor-pointer"
              style={{ color: '#F4F4F4' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = '#FFCC00'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = '#F4F4F4'; }}
            >
              Privacy Policy
            </span>
            <span style={{ color: '#F4F4F4' }}>&bull;</span>
            <span
              className="font-body text-[12px] transition-colors duration-300 cursor-pointer"
              style={{ color: '#F4F4F4' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = '#FFCC00'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = '#F4F4F4'; }}
            >
              Terms of Service
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-[20%] animate-star-twinkle-gold" style={{ animationDelay: '0.8s' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFCC00" opacity="0.25">
          <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-[30%] animate-star-twinkle-blue" style={{ animationDelay: '1.8s' }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="#003A70" opacity="0.3">
          <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
        </svg>
      </div>
    </footer>
  );
}
