/**
 * PillarIcon
 * SVG icons for the six AWS Well-Architected Framework pillars.
 * No emojis. Uses Cloudscape / AWS colour tokens.
 */
import React from "react";

type Props = { pillar: string; size?: number; color?: string };

// Cost Optimisation — coin stack / tag
function CostIcon({ s, c }: { s: number; c: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="Cost Optimisation">
      <rect width="40" height="40" rx="6" fill={c} />
      {/* tag outline */}
      <path d="M10 10 H24 L32 20 L24 30 H10 V10 Z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
      {/* $ symbol */}
      <text x="17" y="25" fontSize="13" fontWeight="bold" fill="#fff" fontFamily="Arial">$</text>
      {/* circle on tag */}
      <circle cx="27" cy="20" r="2" fill="#fff" />
    </svg>
  );
}

// Security — padlock
function SecurityIcon({ s, c }: { s: number; c: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="Security">
      <rect width="40" height="40" rx="6" fill={c} />
      <rect x="11" y="19" width="18" height="13" rx="2" fill="none" stroke="#fff" strokeWidth="2" />
      <path d="M14 19 V15 A6 6 0 0 1 26 15 V19" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="25" r="2" fill="#fff" />
      <line x1="20" y1="27" x2="20" y2="30" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Reliability — circular arrows (refresh)
function ReliabilityIcon({ s, c }: { s: number; c: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="Reliability">
      <rect width="40" height="40" rx="6" fill={c} />
      {/* arc top */}
      <path d="M12 20 A8 8 0 0 1 28 20" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      {/* arrowhead top-right */}
      <polyline points="24,13 28,20 22,21" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* arc bottom */}
      <path d="M28 20 A8 8 0 0 1 12 20" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      {/* arrowhead bottom-left */}
      <polyline points="16,27 12,20 18,19" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Performance Efficiency — speedometer / gauge
function PerformanceIcon({ s, c }: { s: number; c: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="Performance Efficiency">
      <rect width="40" height="40" rx="6" fill={c} />
      {/* gauge arc */}
      <path d="M8 28 A12 12 0 0 1 32 28" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      {/* tick marks */}
      <line x1="20" y1="16" x2="20" y2="19" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="11" y1="19" x2="13.5" y2="21.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="29" y1="19" x2="26.5" y2="21.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      {/* needle pointing upper-right */}
      <line x1="20" y1="28" x2="27" y2="20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="20" cy="28" r="2.5" fill="#fff" />
    </svg>
  );
}

// Operational Excellence — checklist / clipboard
function OpsExcIcon({ s, c }: { s: number; c: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="Operational Excellence">
      <rect width="40" height="40" rx="6" fill={c} />
      {/* clipboard body */}
      <rect x="10" y="13" width="20" height="20" rx="2" fill="none" stroke="#fff" strokeWidth="2" />
      {/* clip at top */}
      <rect x="15" y="10" width="10" height="6" rx="2" fill="none" stroke="#fff" strokeWidth="2" />
      {/* check lines */}
      <polyline points="15,21 17.5,24 23,18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="27" x2="25" y2="27" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Sustainability — leaf
function SustainabilityIcon({ s, c }: { s: number; c: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="Sustainability">
      <rect width="40" height="40" rx="6" fill={c} />
      {/* leaf shape */}
      <path
        d="M20 30 C20 30 10 24 10 16 C10 10 16 8 20 8 C24 8 30 10 30 16 C30 24 20 30 20 30 Z"
        fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round"
      />
      {/* midrib */}
      <line x1="20" y1="30" x2="20" y2="14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      {/* veins */}
      <line x1="20" y1="22" x2="14" y2="18" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <line x1="20" y1="18" x2="26" y2="14" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

// ─── Registry ─────────────────────────────────────────────────────────────────
type IconFC = React.FC<{ s: number; c: string }>;

const PILLAR_MAP: Record<string, IconFC> = {
  "Cost Optimisation":     CostIcon,
  "Security":              SecurityIcon,
  "Reliability":           ReliabilityIcon,
  "Performance":           PerformanceIcon,
  "Operational Excellence": OpsExcIcon,
  "Sustainability":        SustainabilityIcon,
};

// Default colour per pillar — matches WAF score colour coding
const PILLAR_COLORS: Record<string, string> = {
  "Cost Optimisation":     "#d13212",
  "Security":              "#d13212",
  "Reliability":           "#ff9900",
  "Performance":           "#ff9900",
  "Operational Excellence": "#1d8102",
  "Sustainability":        "#d13212",
};

export default function PillarIcon({ pillar, size = 32, color }: Props) {
  const Icon = PILLAR_MAP[pillar];
  const bg   = color ?? PILLAR_COLORS[pillar] ?? "#232F3E";
  if (Icon) return <Icon s={size} c={bg} />;
  // fallback
  const letters = pillar.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-label={pillar}>
      <rect width="40" height="40" rx="6" fill={bg} />
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="Arial">{letters}</text>
    </svg>
  );
}
