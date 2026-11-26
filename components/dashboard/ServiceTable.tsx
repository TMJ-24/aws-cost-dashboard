"use client";
import React, { useState } from "react";
import Table from "@cloudscape-design/components/table";
import Header from "@cloudscape-design/components/header";
import Box from "@cloudscape-design/components/box";
import Badge from "@cloudscape-design/components/badge";
import Modal from "@cloudscape-design/components/modal";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Alert from "@cloudscape-design/components/alert";
import { serviceCosts, type ServiceCost, fmt } from "@/lib/demo-data";
import AwsServiceIcon from "@/components/icons/AwsServiceIcon";

export default function ServiceTable() {
  const [selected, setSelected] = useState<ServiceCost | null>(null);
  const total = serviceCosts.reduce((s, r) => s + r.cost, 0);

  return (
    <>
      <Table
        header={
          <Header
            variant="h2"
            counter={`(${serviceCosts.length})`}
            description="Click any row to view optimization recommendations"
          >
            Top Services by Cost
          </Header>
        }
        columnDefinitions={[
          {
            id: "service",
            header: "Service",
            cell: (r) => (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <AwsServiceIcon service={r.service} size={22} />
                <Box fontWeight="bold">{r.service}</Box>
              </div>
            ),
            sortingField: "service",
          },
          {
            id: "cost",
            header: "Jul Cost (USD)",
            cell: (r) => <Box textAlign="right" fontWeight="bold">{fmt(r.cost)}</Box>,
            sortingField: "cost",
          },
          {
            id: "pct",
            header: "% of Total",
            cell: (r) => (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    height: 8,
                    borderRadius: 4,
                    background: "#0972D3",
                    width: `${Math.max((r.cost / total) * 180, 4)}px`,
                    flexShrink: 0,
                  }}
                />
                <Box fontSize="body-s">{r.pct}%</Box>
              </div>
            ),
          },
          {
            id: "trend",
            header: "MoM Trend",
            cell: (r) => (
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <svg width={12} height={12} viewBox="0 0 12 12" aria-hidden>
                  {r.trend > 0 ? (
                    <polyline points="1,10 6,2 11,10" fill="none" stroke={r.trend > 10 ? "#d13212" : "#5f6b7a"} strokeWidth="2" strokeLinejoin="round" />
                  ) : r.trend < 0 ? (
                    <polyline points="1,2 6,10 11,2" fill="none" stroke="#1d8102" strokeWidth="2" strokeLinejoin="round" />
                  ) : (
                    <line x1="1" y1="6" x2="11" y2="6" stroke="#5f6b7a" strokeWidth="2" />
                  )}
                </svg>
                <Badge color={r.trend > 10 ? "red" : r.trend > 0 ? "grey" : "green"}>
                  {r.trend > 0 ? "+" : ""}{r.trend.toFixed(1)}%
                </Badge>
              </div>
            ),
            sortingField: "trend",
          },
          {
            id: "ou",
            header: "OU",
            cell: (r) => <Badge color="blue">{r.ou}</Badge>,
          },
        ]}
        items={serviceCosts}
        sortingDisabled={false}
        selectionType="single"
        selectedItems={selected ? [selected] : []}
        onSelectionChange={({ detail }) => setSelected(detail.selectedItems[0] ?? null)}
        trackBy="service"
        empty={<Box textAlign="center">No data</Box>}
      />

      {selected && selected.optimization && (
        <Modal
          visible
          onDismiss={() => setSelected(null)}
          header={
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <AwsServiceIcon service={selected.service} size={28} />
              <span>Optimization — {selected.service}</span>
            </div>
          }
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={() => setSelected(null)}>Close</Button>
                <Button variant="primary">Create Jira Ticket</Button>
              </SpaceBetween>
            </Box>
          }
        >
          <SpaceBetween size="m">
            <Alert type="info" header="Recommendation">
              {selected.optimization}
            </Alert>
            <Box>
              <Box variant="awsui-key-label">Current Monthly Cost</Box>
              <Box variant="h3">{fmt(selected.cost)}</Box>
            </Box>
            <Box>
              <Box variant="awsui-key-label">Organisational Unit</Box>
              <Box>{selected.ou}</Box>
            </Box>
          </SpaceBetween>
        </Modal>
      )}
    </>
  );
}
