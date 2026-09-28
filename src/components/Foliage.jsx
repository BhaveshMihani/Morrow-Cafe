/**
 * Eucalyptus-style branch drawn as inline SVG (no image request, tiny payload).
 * Leaves are generated along a gently curved stem so every branch feels hand-placed.
 */
export default function Foliage({ className = '', leaves = 9, flip = false }) {
  const step = 250 / (leaves - 1);
  const pairs = Array.from({ length: leaves }, (_, i) => {
    const t = i / (leaves - 1);
    const y = 272 - i * step;
    const x = 100 + Math.sin(i * 0.6) * 7;
    const s = 1 - t * 0.42;
    return { i, x, y, s, fill: i % 2 ? '#59634A' : '#6E7A5D' };
  });

  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M100 296 C 94 220 110 140 100 14" fill="none" stroke="#4A5240" strokeWidth="2" strokeLinecap="round" />
      {pairs.map(({ i, x, y, s, fill }) => (
        <g key={i}>
          <ellipse cx={x - 21 * s} cy={y - 4} rx={21 * s} ry={11 * s} fill={fill} opacity={0.92} transform={`rotate(-34 ${x - 21 * s} ${y - 4})`} />
          <ellipse cx={x + 21 * s} cy={y - 14} rx={21 * s} ry={11 * s} fill={i % 2 ? '#6E7A5D' : '#59634A'} opacity={0.88} transform={`rotate(34 ${x + 21 * s} ${y - 14})`} />
        </g>
      ))}
      <ellipse cx="100" cy="14" rx="9" ry="16" fill="#59634A" />
    </svg>
  );
}
