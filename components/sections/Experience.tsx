export default function Experience() {
  const items = [
    {
      title: "Frontend Engineer",
      meta: "React • TypeScript • UI Systems",
      body: "Built high-performance interfaces with animated UX and robust state management.",
    },
    {
      title: "Creative Technologist",
      meta: "Three.js • R3F • Motion",
      body: "Created interactive 3D scenes with cinematic transitions and real-time lighting.",
    },
    {
      title: "Product Engineer",
      meta: "Next.js • Tailwind • Accessibility",
      body: "Delivered responsive, accessible product experiences with clean architecture.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-wide text-cyan-200">
        Experience
      </h2>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
          >
            <div className="text-base font-semibold text-white/95">
              {it.title}
            </div>
            <div className="mt-1 text-xs text-cyan-200/80">{it.meta}</div>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              {it.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

