import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Globe, Zap, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface pt-20">
      {/* Hero section */}
      <section className="bg-primary text-white py-20 md:py-28 relative overflow-hidden">
        {/* Bauhaus background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 right-[10%] w-32 h-32 border-2 border-white/10 rounded-full" />
          <div className="absolute bottom-10 left-[5%] w-16 h-16 bg-accent/15 rotate-12" />
          <div className="absolute top-1/3 left-1/4 w-px h-40 bg-white/5" />
        </div>

        <div className="max-w-[800px] mx-auto px-5 md:px-6 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">About Jhub</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Built for the people who need it most
            <span className="text-accent">.</span>
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-[60ch]">
            Jhub is a career platform for African professionals that solves one of the most
            universal and painful problems in the job market: the gap between finding an
            opportunity and actually applying to it well.
          </p>
        </div>
      </section>

      <div className="max-w-[800px] mx-auto px-5 md:px-6 py-16 space-y-16">
        {/* Mission */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary flex items-center justify-center border-2 border-ink">
              <Heart size={18} className="text-white" />
            </div>
            <h2 className="font-display text-2xl font-bold text-ink">Our Mission</h2>
          </div>
          <div className="bg-white border-2 border-ink p-6 md:p-8">
            <p className="text-muted leading-relaxed mb-4">
              Help users move from <strong className="text-ink">opportunity discovery → polished application → sent</strong> — in minutes, not hours.
            </p>
            <p className="text-muted leading-relaxed">
              We believe job seekers shouldn't have to spend hours formatting CVs, rewriting cover letters from scratch,
              or juggling ten different platforms. Jhub gives you one profile that powers every application.
            </p>
          </div>
        </section>

        {/* Vision */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-accent flex items-center justify-center border-2 border-ink">
              <Globe size={18} className="text-ink" />
            </div>
            <h2 className="font-display text-2xl font-bold text-ink">Our Vision</h2>
          </div>
          <div className="bg-white border-2 border-ink p-6 md:p-8">
            <p className="text-muted leading-relaxed">
              To become the simplest and most effective platform for African professionals to build
              world-class application documents and apply to opportunities — fast, stress-free,
              and from one place.
            </p>
          </div>
        </section>

        {/* Values / Principles */}
        <section>
          <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center gap-3">
            <div className="w-3 h-3 bg-primary" />
            <div className="w-3 h-3 bg-accent rounded-full" />
            <div className="w-3 h-3 bg-success rotate-45" />
            What We Believe
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: Zap,
                title: 'Speed as a Feature',
                desc: 'Every second removed from the apply flow is value delivered. If it takes more than 3 minutes, we\'ve failed.',
                color: 'bg-accent',
              },
              {
                icon: Shield,
                title: 'Free for Job Seekers, Always',
                desc: 'The people who need help most should never face a paywall. Jhub is and will always be free for applicants.',
                color: 'bg-primary',
              },
              {
                icon: Globe,
                title: 'Global Standards, Local Context',
                desc: 'World-class CV formats — AU, ECOWAS, European, American — built for Nigerian and African users.',
                color: 'bg-success',
              },
              {
                icon: Heart,
                title: 'Design as Trust',
                desc: 'A beautifully formatted CV signals quality before the recruiter reads a word. Design matters.',
                color: 'bg-error',
              },
            ].map((v, i) => (
              <div key={i} className="bg-white border-2 border-ink p-5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal transition-all">
                <div className={`w-8 h-8 ${v.color} flex items-center justify-center border-2 border-ink mb-3`}>
                  <v.icon size={14} className="text-white" />
                </div>
                <h3 className="font-bold text-sm text-ink mb-1">{v.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works summary */}
        <section>
          <h2 className="font-display text-2xl font-bold text-ink mb-6">The Core Principle</h2>
          <div className="bg-primary-soft border-2 border-primary p-6 md:p-8">
            <blockquote className="font-display text-xl md:text-2xl font-bold text-primary leading-snug">
              "Build your profile once. Apply to anything, anywhere, in minutes."
            </blockquote>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <h2 className="font-display text-2xl font-bold text-ink mb-3">Ready to get started?</h2>
          <p className="text-muted text-sm mb-6">It takes 5 minutes to build your profile. Zero cost.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/profile" className="btn-brutal bg-accent text-ink text-sm px-8 py-3.5 no-underline">
              Build My CV <ArrowRight size={14} className="inline ml-1" />
            </Link>
            <Link to="/jobs" className="btn-brutal bg-white text-ink text-sm px-8 py-3.5 no-underline">
              Browse Jobs
            </Link>
          </div>
        </section>

        {/* Contact */}
        <section className="border-t-2 border-ink pt-8">
          <h3 className="font-bold text-sm text-ink mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-accent" /> Get in Touch
          </h3>
          <p className="text-sm text-muted">
            Have questions, feedback, or partnership inquiries?{' '}
            <a href="mailto:hello@jhub.ng" className="font-bold text-primary no-underline hover:text-primary-light">
              hello@jhub.ng
            </a>
          </p>
          <p className="text-sm text-muted mt-2">
            Built with{' '}
            <Heart size={12} className="inline text-error" />{' '}
            in Lagos, Nigeria 🇳🇬
          </p>
        </section>
      </div>
    </div>
  );
}
