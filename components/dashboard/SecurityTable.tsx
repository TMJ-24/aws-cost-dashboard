"use client";
import React from "react";
import Table from "@cloudscape-design/components/table";
import Header from "@cloudscape-design/components/header";
import Badge from "@cloudscape-design/components/badge";
import Box from "@cloudscape-design/components/box";
import StatusIndicator from "@cloudscape-design/components/status-indicator";
import { securityFindings, type SecurityFinding } from "@/lib/demo-data";

const sevColor: Record<string, "red" | "grey" | "green" | "blue"> = {
  CRITICAL: "red", HIGH: "red", MEDIUM: "grey", LOW: "green",
};

export default function SecurityTable() {
  const critical = securityFindings.filter((f) => f.severity === "CRITICAL").length;
  const high     = securityFindings.filter((f) => f.severity === "HIGH").length;

  return (
    <Table
      header={
        <Header
          variant="h2"
          counter={`(${securityFindings.length} findings)`}
          description={`${critical} Critical · ${high} High — sourced from AWS Security Hub`}
        >
          Security Hub Findings
        </Header>
      }
      columnDefinitions={[
        {
          id: "id", header: "ID",
          cell: (r: SecurityFinding) => <Box fontWeight="bold" fontSize="body-s">{r.id}</Box>,
          width: 80,
        },
        {
          id: "title", header: "Finding",
          cell: (r: SecurityFinding) => <Box fontWeight="bold">{r.title}</Box>,
        },
        {
          id: "severity", header: "Severity",
          cell: (r: SecurityFinding) => <Badge color={sevColor[r.severity]}>{r.severity}</Badge>,
          width: 100,
        },
        {
          id: "service", header: "Service",
          cell: (r: SecurityFinding) => <Badge color="blue">{r.service}</Badge>,
          width: 100,
        },
        {
          id: "ou", header: "OU",
          cell: (r: SecurityFinding) => <Badge color="grey">{r.ou}</Badge>,
          width: 110,
        },
        {
          id: "count", header: "Count",
          cell: (r: SecurityFinding) => r.count,
          width: 70,
        },
        {
          id: "firstSeen", header: "First Seen",
          cell: (r: SecurityFinding) => <Box fontSize="body-s">{r.firstSeen}</Box>,
          width: 110,
        },
        {
          id: "status", header: "Status",
          cell: (r: SecurityFinding) => (
            <StatusIndicator type={r.status === "ACTIVE" ? "error" : r.status === "SUPPRESSED" ? "warning" : "success"}>
              {r.status}
            </StatusIndicator>
          ),
          width: 120,
        },
      ]}
      items={securityFindings}
      sortingDisabled={false}
      stripedRows
      empty={<Box textAlign="center">No findings</Box>}
    />
  );
}
