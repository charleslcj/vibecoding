import React from 'react';

export default function CommunityProfiles() {
  const profiles = [
    {
      name: "Marcus T.",
      archetype: "THE DRIVER",
      status: "🔥 Active Diligence",
      stats: { flow: 88, risk: 91, readiness: 94, resilience: 85 },
      match: "B2B Distribution, $1.2–3M EBITDA",
      desc: "Former McKinsey Principal · In active diligence on a $2.1M EBITDA industrial services company",
      icon: "⚡",
      color: "#15F5BA"
    },
    {
      name: "Sarah K.",
      archetype: "THE BUILDER",
      status: "🔥 47-day streak",
      stats: { flow: 76, risk: 72, readiness: 88, resilience: 79 },
      match: "B2B Manufacturing Services, $800K–$2M EBITDA",
      desc: "Former Product Director · 2 LOIs submitted · 73 days from first assessment",
      icon: "⚙️",
      color: "#15F5BA"
    },
    {
      name: "James L.",
      archetype: "THE GUIDE",
      status: "",
      stats: { flow: 82, risk: 58, readiness: 71, resilience: 88 },
      match: "Healthcare Staffing Services, $600K–$1.5M EBITDA",
      desc: "Former VP Operations · First owner conversation: Day 31",
      icon: "🧭",
      color: "#836FFF"
    },
    {
      name: "Priya N.",
      archetype: "THE BUILDER",
      status: "🔥 31-day streak",
      stats: { flow: 91, risk: 64, readiness: 84, resilience: 93 },
      match: "Technology-Enabled Services, $700K–$1.8M EBITDA",
      desc: "Former VP Engineering · Targeting IT services with recurring revenue",
      icon: "⚙️",
      color: "#15F5BA"
    },
    {
      name: "David R.",
      archetype: "THE INVENTOR",
      status: "",
      stats: { flow: 95, risk: 77, readiness: 63, resilience: 71 },
      match: "Niche B2B Consulting, $500K–$1.2M EBITDA",
      desc: "Former Strategy Director · Avoiding commoditized industries, seeking strategic whitespace",
      icon: "💡",
      color: "#FFD65A"
    },
    {
      name: "Lisa M.",
      archetype: "THE DRIVER",
      status: "",
      stats: { flow: 79, risk: 88, readiness: 97, resilience: 83 },
      match: "Commercial Services Rollup, $1–4M EBITDA",
      desc: "Former COO · Self-funded search · LOI submitted Day 58",
      icon: "⚡",
      color: "#15F5BA"
    },
    {
      name: "Kevin H.",
      archetype: "THE GUIDE",
      status: "",
      stats: { flow: 68, risk: 45, readiness: 74, resilience: 90 },
      match: "Established B2C Services, $400K–$900K EBITDA",
      desc: "Former Senior Director, Fortune 500 · Lifestyle mode · Strong mgmt team required",
      icon: "🧭",
      color: "#836FFF"
    }
  ];

  return (
    <section className="bg-[var(--color-bg-primary)] py-20 px-4 md:px-10 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="font-display font-semibold text-3xl md:text-[28px] mb-2 text-[var(--color-text-primary)]">Recent Operator Profiles</h2>
          <p className="text-[16px] text-[var(--color-text-secondary)]">See where other searchers landed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profiles.map((profile, idx) => (
            <div key={idx} className="glass-card p-6 flex flex-col hover:bg-[var(--color-bg-elevated)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-elevated)] flex items-center justify-center text-xl border border-[var(--color-border-glass)] shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {profile.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[16px] text-[var(--color-text-primary)] leading-tight">
                      {profile.name}
                    </h3>
                    <span className="font-display font-medium text-[11px] uppercase tracking-widest" style={{ color: profile.color }}>
                      {profile.archetype}
                    </span>
                  </div>
                </div>
                {profile.status && (
                  <div className="bg-[var(--color-bg-elevated)] px-2 py-1 rounded-md border border-[var(--color-border-glass)]">
                    <span className="font-display font-medium text-[11px] text-[var(--color-accent-primary)]">{profile.status}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2 mb-4">
                <MiniStat label="FLOW" score={profile.stats.flow} color={profile.color} />
                <MiniStat label="RISK" score={profile.stats.risk} color={profile.color} />
                <MiniStat label="READY" score={profile.stats.readiness} color={profile.color} />
                <MiniStat label="RESIL" score={profile.stats.resilience} color={profile.color} />
              </div>

              <div className="mb-3">
                <span className="font-display font-bold text-[13px] text-[var(--color-text-primary)]">{profile.match}</span>
              </div>

              <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mt-auto">
                {profile.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, score, color }: { label: string, score: number, color: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="h-[6px] w-full bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full opacity-80"
          style={{ width: `${score}%`, backgroundColor: color }}
        ></div>
      </div>
      <span className="font-display font-medium text-[9px] uppercase tracking-wider text-[var(--color-text-secondary)] text-center">
        {label}
      </span>
    </div>
  );
}
