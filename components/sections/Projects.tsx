export default function Projects() {
  const projects = [
    {
      name: "Neural UI Console",
      desc: "Animated terminal + holographic panels with cinematic transitions.",
      tags: ["React", "Motion", "UI"],
    },
    {
      name: "Orbital Data Viz",
      desc: "Procedural rings and real-time particle system for data exploration.",
      tags: ["R3F", "Three", "Shaders"],
    },
    {
      name: "Immersive OS Dashboard",
      desc: "Glassmorphism layout with interactive modules and responsive performance.",
      tags: ["Next.js", "Tailwind", "UX"],
    },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-wide text-cyan-200">
        Projects
      </h2>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {projects.map((p) => (
          <div
            key={p.name}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-cyan-200/40"
          >
            <div className="text-base font-semibold text-white/95">{p.name}</div>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{p.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

