export default function Education() {
  const items = [
    {
      title: "Computer Science",
      meta: "BSc • Systems & Software",
      body: "Focus on algorithms, web engineering, and interactive media.",
    },
    {
      title: "Continuous Learning",
      meta: "Certs & Workshops",
      body: "Always shipping: modern React patterns, rendering pipelines, and UI craft.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-wide text-cyan-200">
        Education
      </h2>

      <div className="mt-6 space-y-4">
        {items.map((it) => (
          <div
            key={it.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <div className="text-base font-semibold text-white/95">
                {it.title}
              </div>
              <div className="text-xs text-cyan-200/80">{it.meta}</div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/80">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

