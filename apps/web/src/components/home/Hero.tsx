import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] md:min-h-[100vh] flex items-center overflow-hidden bg-primary">
      {/* Bauhaus geometric background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Large circle — top right */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border-[3px] border-white/10" />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-accent/15" />

        {/* Geometric blocks */}
        <div className="absolute top-1/4 left-[5%] w-16 h-16 bg-accent/20 rotate-12" />
        <div className="absolute bottom-1/3 left-[8%] w-8 h-8 rounded-full bg-success/20" />
        <div className="absolute top-[15%] right-[15%] w-12 h-12 border-2 border-white/10 rotate-45" />
        <div className="absolute bottom-[20%] right-[10%] w-20 h-20 border-2 border-accent/15 rounded-full" />

        {/* Grid lines — Bauhaus */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/5" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-white/5" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-white/5" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-white/5" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-white/5" />

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-5 md:px-6 py-24 md:py-0 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div className="flex flex-col">
            {/* Tag pill — Brutalist style */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 w-fit mb-8">
              <Sparkles size={14} className="text-accent" />
              <span className="text-xs font-bold text-white/90 tracking-wide uppercase">
                Free for job seekers, always
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6">
              Your next job starts with a{' '}
              <span className="relative inline-block">
                <span className="relative z-10">great CV</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-accent/40 -z-0" />
              </span>
              <span className="text-accent">.</span>
            </h1>

            <p className="text-lg text-white/70 max-w-[52ch] leading-relaxed mb-8 font-sans">
              Build a globally-standard CV in minutes. Tailor your cover letter.
              Apply directly — without leaving the platform.
            </p>

            {/* CTAs — Brutalist */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/profile"
                className="inline-flex items-center justify-center gap-2 bg-accent text-ink font-bold text-sm px-8 py-4 border-2 border-ink shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A18] transition-all no-underline"
              >
                Build My CV
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold text-sm px-8 py-4 border-2 border-white/30 hover:bg-white/20 transition-all no-underline"
              >
                Browse Jobs
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['bg-accent', 'bg-success', 'bg-primary-light', 'bg-error'].map((color, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${color} border-2 border-primary flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-white/60">
                Joined by <span className="text-white font-bold">500+</span> professionals
              </span>
            </div>
          </div>

          {/* Right — Floating CV Preview (Glass) */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              {/* CV Card — Glassmorphism + float animation */}
              <div className="animate-float w-[320px] bg-white border-2 border-ink shadow-[8px_8px_0px_#1A1A18] p-8">
                {/* Mini CV preview content */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="h-4 w-32 bg-ink rounded-sm" />
                      <div className="h-2.5 w-24 bg-muted/30 rounded-sm mt-2" />
                    </div>
                    <div className="w-10 h-10 bg-primary-soft border border-border rounded-full" />
                  </div>

                  <div className="h-px bg-border" />

                  <div>
                    <div className="h-2.5 w-16 bg-primary rounded-sm mb-2" />
                    <div className="space-y-1.5">
                      <div className="h-2 w-full bg-muted/15 rounded-sm" />
                      <div className="h-2 w-4/5 bg-muted/15 rounded-sm" />
                    </div>
                  </div>

                  <div>
                    <div className="h-2.5 w-20 bg-primary rounded-sm mb-2" />
                    <div className="space-y-1.5">
                      <div className="h-2 w-full bg-muted/15 rounded-sm" />
                      <div className="h-2 w-3/5 bg-muted/15 rounded-sm" />
                      <div className="h-2 w-4/5 bg-muted/15 rounded-sm" />
                    </div>
                  </div>

                  <div>
                    <div className="h-2.5 w-14 bg-primary rounded-sm mb-2" />
                    <div className="flex flex-wrap gap-1.5">
                      {['React', 'TypeScript', 'Node', 'Figma'].map((s) => (
                        <span key={s} className="text-[9px] font-bold bg-primary-soft text-primary px-2 py-0.5 border border-primary/20">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="h-2.5 w-18 bg-primary rounded-sm mb-2" />
                    <div className="space-y-1.5">
                      <div className="h-2 w-full bg-muted/15 rounded-sm" />
                      <div className="h-2 w-2/3 bg-muted/15 rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* Jhub watermark */}
                <div className="mt-6 flex items-center gap-1.5 opacity-40">
                  <div className="w-3 h-3 bg-primary" />
                  <span className="text-[8px] font-bold text-muted tracking-wider uppercase">
                    Generated with Jhub
                  </span>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent/30 -z-10" />
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-accent border-2 border-ink" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom blend — Bauhaus line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-ink" />
    </section>
  );
}
