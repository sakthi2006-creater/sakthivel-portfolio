export default function Skills() {
  const skills = [
    "Next.js 15 App Router",
    "React Three Fiber",
    "TypeScript",
    "Framer Motion",
    "Three.js",
    "Tailwind CSS",
    "GSAP",
    "Lenis",
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-wide text-cyan-200">
        Skills
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s) => (
          <div
            key={s}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
          >
            <div className="text-sm font-medium text-white/90">{s}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

