import { lazy, Suspense } from 'react';
import Navigation from '../components/Navigation';

const Hero = lazy(() => import('../sections/Hero'));
const Manifesto = lazy(() => import('../sections/Manifesto'));
const Services = lazy(() => import('../sections/Services'));
const Testimonials = lazy(() => import('../sections/Testimonials'));
const CallToAction = lazy(() => import('../sections/CallToAction'));
const Footer = lazy(() => import('../sections/Footer'));

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Suspense fallback={null}><Hero /></Suspense>
      <Suspense fallback={null}><Manifesto /></Suspense>
      <Suspense fallback={null}><Services /></Suspense>
      <Suspense fallback={null}><Testimonials /></Suspense>
      <Suspense fallback={null}><CallToAction /></Suspense>
      <Suspense fallback={null}><Footer /></Suspense>
    </main>
  );
}
