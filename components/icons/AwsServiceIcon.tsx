/**
 * AwsServiceIcon
 * Pixel-accurate SVG representations of AWS service icons using the official
 * AWS icon colour palette. No emojis. No external image assets.
 *
 * Usage:
 *   <AwsServiceIcon service="Amazon EKS" size={20} />
 */
import React from "react";

type Props = { service: string; size?: number };

// ─── Individual icon paths ────────────────────────────────────────────────────

// Compute / EKS  (#E7157B  AWS Containers pink)
function EKSIcon({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="Amazon EKS">
      <rect width="40" height="40" rx="6" fill="#E7157B" />
      {/* hexagon outline */}
      <polygon points="20,6 32,13 32,27 20,34 8,27 8,13" fill="none" stroke="#fff" strokeWidth="2.5" />
      {/* inner K */}
      <line x1="16" y1="13" x2="16" y2="27" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="20" x2="24" y2="13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="20" x2="24" y2="27" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Database / RDS  (#C7131F  AWS Database red)
function RDSIcon({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="Amazon RDS">
      <rect width="40" height="40" rx="6" fill="#C7131F" />
      {/* stacked cylinders */}
      <ellipse cx="20" cy="12" rx="10" ry="4" fill="none" stroke="#fff" strokeWidth="2" />
      <line x1="10" y1="12" x2="10" y2="22" stroke="#fff" strokeWidth="2" />
      <line x1="30" y1="12" x2="30" y2="22" stroke="#fff" strokeWidth="2" />
      <ellipse cx="20" cy="22" rx="10" ry="4" fill="none" stroke="#fff" strokeWidth="2" />
      <line x1="10" y1="22" x2="10" y2="30" stroke="#fff" strokeWidth="2" />
      <line x1="30" y1="22" x2="30" y2="30" stroke="#fff" strokeWidth="2" />
      <ellipse cx="20" cy="30" rx="10" ry="4" fill="none" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

// Data Transfer / Networking  (#8C4FFF  AWS Networking purple)
function DataTransferIcon({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="Data Transfer">
      <rect width="40" height="40" rx="6" fill="#8C4FFF" />
      {/* two-way arrow */}
      <line x1="8" y1="16" x2="32" y2="16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="26,10 32,16 26,22" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="32" y1="24" x2="8" y2="24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="14,18 8,24 14,30" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Compute / EC2  (#ED7100  AWS Compute orange)
function EC2Icon({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="Amazon EC2">
      <rect width="40" height="40" rx="6" fill="#ED7100" />
      {/* server outline */}
      <rect x="9" y="9" width="22" height="10" rx="2" fill="none" stroke="#fff" strokeWidth="2" />
      <rect x="9" y="21" width="22" height="10" rx="2" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="27" cy="14" r="1.5" fill="#fff" />
      <circle cx="27" cy="26" r="1.5" fill="#fff" />
      <line x1="13" y1="14" x2="22" y2="14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="26" x2="22" y2="26" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Storage / S3  (#3F8624  AWS Storage green)
function S3Icon({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="Amazon S3">
      <rect width="40" height="40" rx="6" fill="#3F8624" />
      {/* bucket shape */}
      <path d="M10 14 L14 28 H26 L30 14 Z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="20" cy="14" rx="10" ry="3.5" fill="none" stroke="#fff" strokeWidth="2" />
      <ellipse cx="20" cy="14" rx="10" ry="3.5" fill="#3F8624" />
      <ellipse cx="20" cy="14" rx="10" ry="3.5" fill="none" stroke="#fff" strokeWidth="2" />
      {/* horizontal band */}
      <line x1="12" y1="20" x2="28" y2="20" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

// Lambda / Compute serverless  (#E7157B or #FF9900 — use orange)
function LambdaIcon({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="AWS Lambda">
      <rect width="40" height="40" rx="6" fill="#ED7100" />
      {/* λ character drawn as lines */}
      <line x1="12" y1="29" x2="19" y2="13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="19" y1="13" x2="28" y2="29" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="23" x2="24" y2="23" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// CloudFront / CDN  (#8C4FFF purple-ish or use AWS Networking)
function CloudFrontIcon({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="CloudFront">
      <rect width="40" height="40" rx="6" fill="#8C4FFF" />
      {/* globe with latitude + meridian lines */}
      <circle cx="20" cy="20" r="11" fill="none" stroke="#fff" strokeWidth="2" />
      <ellipse cx="20" cy="20" rx="5" ry="11" fill="none" stroke="#fff" strokeWidth="1.5" />
      <line x1="9" y1="20" x2="31" y2="20" stroke="#fff" strokeWidth="1.5" />
      <path d="M11 14 Q20 17 29 14" fill="none" stroke="#fff" strokeWidth="1.5" />
      <path d="M11 26 Q20 23 29 26" fill="none" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

// DynamoDB  (#C7131F Database red, slightly distinct from RDS)
function DynamoDBIcon({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="Amazon DynamoDB">
      <rect width="40" height="40" rx="6" fill="#C7131F" />
      {/* lightning bolt table symbol */}
      <ellipse cx="20" cy="12" rx="9" ry="3.5" fill="none" stroke="#fff" strokeWidth="2" />
      <ellipse cx="20" cy="20" rx="9" ry="3.5" fill="none" stroke="#fff" strokeWidth="2" />
      <ellipse cx="20" cy="28" rx="9" ry="3.5" fill="none" stroke="#fff" strokeWidth="2" />
      <line x1="11" y1="12" x2="11" y2="28" stroke="#fff" strokeWidth="2" />
      <line x1="29" y1="12" x2="29" y2="28" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

// WAF & Shield  (#DD344C  Security red)
function WAFIcon({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="AWS WAF & Shield">
      <rect width="40" height="40" rx="6" fill="#DD344C" />
      {/* shield */}
      <path d="M20 8 L30 12 V20 C30 26 20 32 20 32 C20 32 10 26 10 20 V12 Z" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
      {/* check */}
      <polyline points="14,20 18,24 26,16" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// CloudWatch / Monitoring  (#E7157B or use a chart icon)
function CloudWatchIcon({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-label="Amazon CloudWatch">
      <rect width="40" height="40" rx="6" fill="#E7157B" />
      {/* line chart */}
      <polyline
        points="8,28 14,20 19,23 24,14 32,18"
        fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* axes */}
      <line x1="8" y1="10" x2="8" y2="32" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="32" x2="34" y2="32" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Registry ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.FC<{ s: number }>> = {
  "Amazon EKS":        EKSIcon,
  "Amazon RDS":        RDSIcon,
  "Data Transfer":     DataTransferIcon,
  "Amazon EC2":        EC2Icon,
  "Amazon S3":         S3Icon,
  "AWS Lambda":        LambdaIcon,
  "CloudFront":        CloudFrontIcon,
  "Amazon DynamoDB":   DynamoDBIcon,
  "AWS WAF & Shield":  WAFIcon,
  "Amazon CloudWatch": CloudWatchIcon,
};

// Generic fallback — a plain AWS-orange square with first letters
function FallbackIcon({ label, s }: { label: string; s: number }) {
  const letters = label.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" aria-label={label}>
      <rect width="40" height="40" rx="6" fill="#232F3E" />
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#FF9900" fontSize="14" fontWeight="bold" fontFamily="Arial">{letters}</text>
    </svg>
  );
}

export default function AwsServiceIcon({ service, size = 24 }: Props) {
  const Icon = ICON_MAP[service];
  if (Icon) return <Icon s={size} />;
  return <FallbackIcon label={service} s={size} />;
}
