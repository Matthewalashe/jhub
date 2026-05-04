import { User, LayoutTemplate, Send } from 'lucide-react';

const STEPS = [
  {
    icon: User,
    number: '01',
    title: 'Build Your Profile',
    description: 'Fill in your details once — experience, skills, education. It takes 5 minutes.',
    color: 'bg-primary',
  },
  {
    icon: LayoutTemplate,
    number: '02',
    title: 'Choose Your Template',
    description: 'Pick from globally-standard CV formats — Global, European, American, AU, or ECOWAS.',
    color: 'bg-accent',
  },
  {
    icon: Send,
    number: '03',
    title: 'Apply in Seconds',
    description: 'Tailor your cover letter, download your CV, and send your application — all in one flow.',
    color: 'bg-success',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-[1120px] mx-auto px-5 md:px-6">
        {/* Section header — Bauhaus style */}
        <div className="flex items-end gap-4 mb-14">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-primary" />
            <div className="w-3 h-3 bg-accent rounded-full" />
            <div className="w-3 h-3 bg-success rotate-45" />
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-tight">
              How It Works
            </h2>
            <p className="text-muted text-sm mt-1">Three steps. Zero friction.</p>
          </div>
        </div>

        {/* Steps — connected with Bauhaus lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-[3px] bg-ink" />

          {STEPS.map((step, i) => (
            <div key={i} className="relative group">
              <div className="bg-white border-2 border-ink p-6 pb-8 shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal transition-all">
                {/* Number + Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono font-bold text-muted tracking-wider">
                    {step.number}
                  </span>
                  <div className={`w-12 h-12 ${step.color} flex items-center justify-center border-2 border-ink relative z-10`}>
                    <step.icon size={20} className="text-white" />
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-ink mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bauhaus decorative corner */}
              <div className={`absolute -bottom-1.5 -right-1.5 w-6 h-6 ${step.color} opacity-20`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
