export default function Achievements() {
  const items = [
    {
      kpi: "10+",
      label: "Shipped UI Systems",
    },
    {
      kpi: "60fps",
      label: "Targeted Rendering",
    },
    {
      kpi: "A11y",
      label: "Inclusive Motion",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-wide text-cyan-200">
        Achievements
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.kpi}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
          >
            <div className="text-3xl font-semibold text-cyan-200">{it.kpi}</div>
            <div className="mt-2 text-sm text-white/80">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

