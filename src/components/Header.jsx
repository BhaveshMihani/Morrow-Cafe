export default function Header() {
  return (
    <header className="border-b border-coffee/10 bg-cream">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 lg:h-16 lg:px-10">
        <p className="font-subheading text-[13px] font-normal uppercase tracking-[0.28em]">Morrow</p>
        <p className="flex items-center gap-2 font-subheading text-[11px] font-normal uppercase tracking-[0.22em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-olive" aria-hidden="true" />
          Sector 104 · Noida
        </p>
      </div>
    </header>
  );
}
