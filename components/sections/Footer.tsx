export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pb-12 pt-4">
      <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <div>© {new Date().getFullYear()} AI Command Center</div>
        <div className="flex gap-3">
          <a className="hover:text-cyan-200" href="#">Privacy</a>
          <a className="hover:text-cyan-200" href="#">Terms</a>
          <a className="hover:text-cyan-200" href="#">Status</a>
        </div>
      </div>
    </footer>
  );
}

