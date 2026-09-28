/** Labelled input with an accessible error message wired via aria-describedby. */
export default function FormField({ id, label, error, prefix, disabled, ...inputProps }) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-ink">{label}</label>
      <div
        className={`mt-2 flex h-14 overflow-hidden rounded-xl border bg-cream/70 transition-colors focus-within:border-ink ${
          error ? 'border-alert' : 'border-coffee/25'
        }`}
      >
        {prefix && (
          <span className="flex items-center border-r border-coffee/20 bg-cream-deep/70 px-4 font-subheading text-xs font-normal uppercase tracking-[0.18em] text-muted" aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          id={id}
          readOnly={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          className="h-full w-full bg-transparent px-4 font-sans text-base text-ink placeholder:text-muted/60 focus:outline-none"
          {...inputProps}
        />
      </div>
      <p id={errorId} className="min-h-[1.25rem] pt-1.5 font-sans text-[13px] font-normal text-alert" role={error ? 'alert' : undefined}>
        {error}
      </p>
    </div>
  );
}
