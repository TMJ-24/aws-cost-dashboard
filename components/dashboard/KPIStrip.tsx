"use client";
import React from "react";
import Box from "@cloudscape-design/components/box";
import Grid from "@cloudscape-design/components/grid";
import Container from "@cloudscape-design/components/container";
import StatusIndicator from "@cloudscape-design/components/status-indicator";
import { kpis, fmt, fmtFull } from "@/lib/demo-data";

type KPICardProps = {
  label: string;
  value: string;
  sub?: string;
  status?: "success" | "warning" | "error" | "info";
  subStatus?: "success" | "warning" | "error";
};

function KPICard({ label, value, sub, status = "info", subStatus }: KPICardProps) {
  return (
    <Container>
      <Box variant="awsui-key-label" color="text-label">{label}</Box>
      <Box variant="h1" fontSize="heading-xl" fontWeight="bold" padding={{ top: "xxs" }}>
        {value}
      </Box>
      {sub && (
        <Box color="text-body-secondary" fontSize="body-s" padding={{ top: "xxs" }}>
          <StatusIndicator type={subStatus ?? "info"}>{sub}</StatusIndicator>
        </Box>
      )}
    </Container>
  );
}

export default function KPIStrip() {
  const budgetUsedPct = ((kpis.currentMonthSpend / kpis.monthlyBudget) * 100).toFixed(1);
  const momChange = (((kpis.currentMonthSpend - kpis.priorMonthSpend) / kpis.priorMonthSpend) * 100).toFixed(1);
  const forecastOver = kpis.forecast > kpis.monthlyBudget;
  const ytdPct = ((kpis.ytdSpend / (kpis.annualBudget / 12 * 6.5)) * 100).toFixed(0);

  return (
    <Grid
      gridDefinition={[
        { colspan: { default: 12, xs: 6, s: 4, m: 2 } },
        { colspan: { default: 12, xs: 6, s: 4, m: 2 } },
        { colspan: { default: 12, xs: 6, s: 4, m: 2 } },
        { colspan: { default: 12, xs: 6, s: 4, m: 2 } },
        { colspan: { default: 12, xs: 6, s: 4, m: 2 } },
        { colspan: { default: 12, xs: 6, s: 4, m: 2 } },
      ]}
    >
      <KPICard
        label="MTD Spend (Jul 2025)"
        value={fmtFull(kpis.currentMonthSpend)}
        sub={`+${momChange}% vs prior month`}
        subStatus="warning"
      />
      <KPICard
        label="Month-End Forecast"
        value={fmt(kpis.forecast)}
        sub={forecastOver ? `${(((kpis.forecast - kpis.monthlyBudget)/kpis.monthlyBudget)*100).toFixed(1)}% over budget` : "Within budget"}
        subStatus={forecastOver ? "error" : "success"}
      />
      <KPICard
        label="Budget Utilised"
        value={`${budgetUsedPct}%`}
        sub={`Budget: ${fmt(kpis.monthlyBudget)}`}
        subStatus={parseFloat(budgetUsedPct) > 100 ? "error" : parseFloat(budgetUsedPct) > 85 ? "warning" : "success"}
      />
      <KPICard
        label="YTD Spend"
        value={fmt(kpis.ytdSpend)}
        sub={`Annual budget: ${fmt(kpis.annualBudget)}`}
      />
      <KPICard
        label="Active OUs / Accounts"
        value={`${kpis.activeOUs} OUs`}
        sub={`${kpis.totalAccounts} member accounts`}
      />
      <KPICard
        label="Savings Opportunity"
        value={fmt(kpis.savingsOpportunity)}
        sub={`${kpis.openFindings} open WAF findings`}
        subStatus="warning"
      />
    </Grid>
  );
}
