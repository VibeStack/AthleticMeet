export default function Footer() {
  return (
    <footer className="bg-slate-950">
      <div className="h-0.5 bg-linear-to-r from-cyan-400/30 via-violet-400/30 to-fuchsia-400/30" />
      <div className="text-center py-6 text-slate-400 text-sm">
        © {new Date().getFullYear()} GNDEC Athletix — Premium Aurora Edition
      </div>
    </footer>
  );
}
