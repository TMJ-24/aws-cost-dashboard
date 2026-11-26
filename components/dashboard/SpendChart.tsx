"use client";
import React from "react";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Box from "@cloudscape-design/components/box";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { monthlyTrend, kpis } from "@/lib/demo-data";

const COLORS = { actual: "#0972D3", prior: "#8D99A8", budget: "#d13212", forecast: "#FF9900" };
const formatUSD = (v: number) => `$${(v / 1000).toFixed(0)}K`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tooltipFmt = (value: any, name: any) => [`$${Number(value).toLocaleString()}`, String(name)];

export default function SpendChart() {
  return (
    <Container
      header={
        <Header variant="h2" description="Actual vs prior year month and monthly budget ceiling">
          Monthly Spend &amp; Variance
        </Header>
      }
    >
      <Box padding={{ vertical: "s" }}>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={monthlyTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e9ebed" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={formatUSD} tick={{ fontSize: 12 }} width={52} />
            <Tooltip formatter={tooltipFmt} contentStyle={{ fontSize: 12, borderRadius: 4, border: "1px solid #d5dbdb" }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="prior"    name="Prior Year" fill={COLORS.prior}    radius={[2,2,0,0]} />
            <Bar dataKey="actual"   name="This Year"  fill={COLORS.actual}   radius={[2,2,0,0]} />
            <Bar dataKey="forecast" name="Forecast"   fill={COLORS.forecast} radius={[2,2,0,0]} opacity={0.6} />
            <Line dataKey="budget"  name="Budget"     stroke={COLORS.budget} strokeWidth={2} dot={false} strokeDasharray="5 3" />
            <ReferenceLine y={kpis.monthlyBudget} stroke="#d13212" strokeDasharray="3 3" label={{ value: "Budget", fontSize: 11, fill: "#d13212" }} />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
}
