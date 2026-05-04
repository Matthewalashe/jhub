import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';
import TemplateShowcase from '../components/home/TemplateShowcase';
import JobsTeaser from '../components/home/JobsTeaser';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <TemplateShowcase />
      <JobsTeaser />
    </div>
  );
}
