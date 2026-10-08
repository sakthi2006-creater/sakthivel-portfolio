export default function Contact() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-wide text-cyan-200">
        Contact
      </h2>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <p className="text-sm leading-relaxed text-white/80">
            Want to build an AI Command Center experience? Send a message and I
            will respond with the next steps.
          </p>
          <div className="mt-4 space-y-3 text-sm text-white/80">
            <div>
              <span className="text-cyan-200/90">Email:</span>{" "}
              <a className="underline underline-offset-4" href="#">
                you@example.com
              </a>
            </div>
            <div>
              <span className="text-cyan-200/90">Location:</span> Remote / Worldwide
            </div>
          </div>
        </div>

        <form className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <label className="block text-xs text-white/70">Your Name</label>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40"
            placeholder="Operator name"
          />

          <label className="mt-4 block text-xs text-white/70">Message</label>
          <textarea
            className="mt-2 min-h-[120px] w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40"
            placeholder="Transmit your request..."
          />

          <button
            type="button"
            className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-cyan-400/90 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
          >
            Send to Console
          </button>

          <p className="mt-3 text-xs text-white/60">
            Demo form—wire this to your preferred backend later.
          </p>
        </form>
      </div>
    </section>
  );
}

