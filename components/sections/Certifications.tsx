export default function Certifications() {
  const items = [
    "Advanced React Patterns",
    "WebGL & Three.js Foundations",
    "Performance Engineering for UI",
    "Accessibility & Motion Design",
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-wide text-cyan-200">
        Certifications
      </h2>

      <div className="mt-6 flex flex-wrap gap-2">
        {items.map((c) => (
          <span
            key={c}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
          >
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}

