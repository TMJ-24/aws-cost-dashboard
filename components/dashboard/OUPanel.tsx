"use client";
import React from "react";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Badge from "@cloudscape-design/components/badge";
import Grid from "@cloudscape-design/components/grid";
import { ouCosts, fmt, fmtFull } from "@/lib/demo-data";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const PIE_COLORS = ["#0972D3", "#1d8102", "#FF9900", "#8D99A8", "#d13212", "#037F0C"];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pieFmt = (v: any) => [`$${Number(v).toLocaleString()}`, "Spend"];

export default function OUPanel() {
  const pieData = ouCosts.map((o) => ({ name: o.ou, value: o.cost }));

  return (
    <SpaceBetween size="l">
      <Container header={<Header variant="h2" description="Cost distribution across Organisational Units">OU Cost Distribution</Header>}>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
              {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={pieFmt} contentStyle={{ fontSize: 12, borderRadius: 4, border: "1px solid #d5dbdb" }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </Container>

      <Container header={<Header variant="h2">OU Breakdown</Header>}>
        <SpaceBetween size="s">
          {ouCosts.map((ou) => {
            const usedPct = Math.min((ou.cost / ou.budget) * 100, 100);
            const over = ou.variance > 0;
            return (
              <Box key={ou.ou} padding="xs">
                <Grid gridDefinition={[
                  { colspan: { default: 12, xs: 4 } },
                  { colspan: { default: 12, xs: 4 } },
                  { colspan: { default: 12, xs: 4 } },
                ]}>
                  <div>
                    <Box fontWeight="bold" fontSize="body-m">{ou.ou}</Box>
                    <Box color="text-body-secondary" fontSize="body-s">{ou.fullName}</Box>
                    <Box color="text-body-secondary" fontSize="body-s">{ou.accounts} accounts &bull; {ou.topService}</Box>
                  </div>
                  <div>
                    <Box textAlign="right" fontWeight="bold">{fmtFull(ou.cost)}</Box>
                    <Box textAlign="right" color="text-body-secondary" fontSize="body-s">Budget: {fmt(ou.budget)}</Box>
                    <div style={{ background: "#f2f3f3", borderRadius: 4, height: 6, marginTop: 4 }}>
                      <div style={{
                        height: 6, borderRadius: 4,
                        background: usedPct >= 100 ? "#d13212" : usedPct >= 85 ? "#FF9900" : "#1d8102",
                        width: `${usedPct}%`, transition: "width 0.4s",
                      }} />
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Badge color={over ? "red" : "green"}>
                      {over ? "+" : ""}{ou.variance.toFixed(1)}%
                    </Badge>
                    <Box color="text-body-secondary" fontSize="body-s" padding={{ top: "xxs" }}>
                      {over ? "over budget" : "under budget"}
                    </Box>
                  </div>
                </Grid>
              </Box>
            );
          })}
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}
