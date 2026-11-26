"use client";
import React from "react";
import Tabs from "@cloudscape-design/components/tabs";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Badge from "@cloudscape-design/components/badge";
import ColumnLayout from "@cloudscape-design/components/column-layout";
import StatusIndicator from "@cloudscape-design/components/status-indicator";
import ExpandableSection from "@cloudscape-design/components/expandable-section";
import Grid from "@cloudscape-design/components/grid";
import { wafPillars, type WAFPillar, type WAFFinding, fmt } from "@/lib/demo-data";
import PillarIcon from "@/components/icons/PillarIcon";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from "recharts";

// ─── Semi-circular score dial ─────────────────────────────────────────────────
function ScoreDial({ score, target, color }: { score: number; target: number; color: string }) {
  const cx = 60; const cy = 62; const r = 48;
  // Arc length for a 180° semicircle
  const circumference = Math.PI * r; // ~150.8
  const scoreDash  = (score  / 100) * circumference;
  const targetDash = (target / 100) * circumference;

  return (
    <svg width={120} height={72} viewBox="0 0 120 72" aria-label={`Score ${score} of 100`}>
      {/* track */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke="#e9ebed" strokeWidth={10}
      />
      {/* target indicator (dashed) */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke="#5f6b7a" strokeWidth={10} strokeDasharray={`${targetDash} ${circumference}`}
        strokeLinecap="round" opacity={0.25}
        style={{ transform: "rotate(-180deg)", transformOrigin: `${cx}px ${cy}px` }}
      />
      {/* score arc */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke={color} strokeWidth={10} strokeDasharray={`${scoreDash} ${circumference}`}
        strokeLinecap="round"
        style={{ transform: "rotate(-180deg)", transformOrigin: `${cx}px ${cy}px` }}
      />
      {/* score label */}
      <text x={cx} y={cy - 6}  textAnchor="middle" fontSize={24} fontWeight="700" fill={color}>{score}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize={10} fill="#5f6b7a">/ 100</text>
      <text x={cx} y={cy + 24} textAnchor="middle" fontSize={9}  fill="#8D99A8">Target: {target}</text>
    </svg>
  );
}

// ─── Impact / status colour maps ──────────────────────────────────────────────
const impactColor: Record<string, "red" | "grey" | "green" | "blue"> = {
  Critical: "red", High: "red", Medium: "grey", Low: "green",
};
const statusColor: Record<string, "red" | "grey" | "green"> = {
  open: "red", "in-progress": "grey", resolved: "green",
};

// ─── Finding card ─────────────────────────────────────────────────────────────
function FindingCard({ f }: { f: WAFFinding }) {
  return (
    <Container>
      <SpaceBetween size="xs">
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <Box fontWeight="bold">{f.id} — {f.title}</Box>
          <Badge color={impactColor[f.impact]}>{f.impact}</Badge>
          <Badge color={statusColor[f.status]}>{f.status}</Badge>
          <Badge color="grey">Effort: {f.effort}</Badge>
          {f.saving && <Badge color="green">Save {fmt(f.saving)}/mo</Badge>}
        </div>
        <Box color="text-body-secondary" fontSize="body-s">{f.description}</Box>
      </SpaceBetween>
    </Container>
  );
}

// ─── Per-pillar detail ────────────────────────────────────────────────────────
function PillarDetail({ p }: { p: WAFPillar }) {
  const passes = p.checks.filter((c) => c.status === "pass").length;
  const warns  = p.checks.filter((c) => c.status === "warn").length;
  const fails  = p.checks.filter((c) => c.status === "fail").length;

  return (
    <SpaceBetween size="l">
      <Grid gridDefinition={[
        { colspan: { default: 12, s: 4 } },
        { colspan: { default: 12, s: 8 } },
      ]}>
        {/* Left: icon + dial + pass/warn/fail counts */}
        <Container>
          <SpaceBetween size="s" alignItems="center">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PillarIcon pillar={p.pillar} size={44} color={p.color} />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ScoreDial score={p.score} target={p.target} color={p.color} />
            </div>
            <ColumnLayout columns={3} borders="none">
              <div style={{ textAlign: "center" }}>
                <Box color="text-status-success" fontWeight="bold">{passes}</Box>
                <Box fontSize="body-s" color="text-body-secondary">Pass</Box>
              </div>
              <div style={{ textAlign: "center" }}>
                <Box color="text-status-warning" fontWeight="bold">{warns}</Box>
                <Box fontSize="body-s" color="text-body-secondary">Review</Box>
              </div>
              <div style={{ textAlign: "center" }}>
                <Box color="text-status-error" fontWeight="bold">{fails}</Box>
                <Box fontSize="body-s" color="text-body-secondary">Fail</Box>
              </div>
            </ColumnLayout>
          </SpaceBetween>
        </Container>

        {/* Right: checklist */}
        <Container header={<Header variant="h3">Checklist</Header>}>
          <SpaceBetween size="xs">
            {p.checks.map((c, i) => (
              <StatusIndicator
                key={i}
                type={c.status === "pass" ? "success" : c.status === "warn" ? "warning" : "error"}
              >
                {c.label}
              </StatusIndicator>
            ))}
          </SpaceBetween>
        </Container>
      </Grid>

      <ExpandableSection headerText={`Priority Findings (${p.findings.length})`} defaultExpanded>
        <SpaceBetween size="s">
          {p.findings.map((f) => <FindingCard key={f.id} f={f} />)}
        </SpaceBetween>
      </ExpandableSection>
    </SpaceBetween>
  );
}

// ─── Tab label with inline SVG icon ──────────────────────────────────────────
function TabLabel({ pillar, score, color }: { pillar: string; score: number; color: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <PillarIcon pillar={pillar} size={18} color={color} />
      {pillar} ({score})
    </span>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function WAFReview() {
  const radarData = wafPillars.map((p) => ({
    subject: p.pillar,
    score:   p.score,
    target:  p.target,
  }));

  return (
    <SpaceBetween size="l">
      {/* Radar posture overview */}
      <Container
        header={
          <Header
            variant="h2"
            description="AWS Well-Architected Framework review — DICT PNG, Jul 2025"
          >
            Well-Architected Framework Posture
          </Header>
        }
      >
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData} margin={{ top: 10, right: 40, bottom: 10, left: 40 }}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
            <Radar name="Current Score"   dataKey="score"  stroke="#0972D3" fill="#0972D3" fillOpacity={0.25} />
            <Radar name="12-Month Target" dataKey="target" stroke="#1d8102" fill="#1d8102" fillOpacity={0.10} strokeDasharray="4 2" />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4 }} />
          </RadarChart>
        </ResponsiveContainer>

        {/* Pillar score strip below radar */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", paddingTop: 12 }}>
          {wafPillars.map((p) => (
            <div
              key={p.pillar}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 12px", borderRadius: 4,
                border: "1px solid #d5dbdb", background: "#fff",
              }}
            >
              <PillarIcon pillar={p.pillar} size={20} color={p.color} />
              <Box fontSize="body-s" fontWeight="bold">{p.pillar}</Box>
              <span
                style={{
                  fontSize: 13, fontWeight: 700,
                  color: p.score < 65 ? "#d13212" : p.score < 75 ? "#ff9900" : "#1d8102",
                }}
              >
                {p.score}
              </span>
            </div>
          ))}
        </div>
      </Container>

      {/* Per-pillar tabs */}
      <Tabs
        tabs={wafPillars.map((p) => ({
          id:      p.pillar,
          label:   <TabLabel pillar={p.pillar} score={p.score} color={p.color} />,
          content: <PillarDetail p={p} />,
        }))}
      />
    </SpaceBetween>
  );
}
