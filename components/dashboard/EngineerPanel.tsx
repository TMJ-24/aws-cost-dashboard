"use client";
import React, { useState } from "react";
import Cards from "@cloudscape-design/components/cards";
import Header from "@cloudscape-design/components/header";
import Box from "@cloudscape-design/components/box";
import Badge from "@cloudscape-design/components/badge";
import SpaceBetween from "@cloudscape-design/components/space-between";
import ExpandableSection from "@cloudscape-design/components/expandable-section";
import Table from "@cloudscape-design/components/table";
import { engineerActivities, fmt, type EngineerActivity } from "@/lib/demo-data";

function Avatar({ initials, size = 40 }: { initials: string; size?: number }) {
  const colors: Record<string, string> = {
    JK: "#0972D3", MW: "#1d8102", PN: "#FF9900", ST: "#d13212", TB: "#8D99A8",
  };
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%",
        background: colors[initials] ?? "#0972D3",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontWeight: 700, fontSize: size * 0.38,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

export default function EngineerPanel() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <Cards
      header={
        <Header
          variant="h2"
          counter={`(${engineerActivities.length} engineers)`}
          description="AI-generated summaries of engineer activity and associated cost impact this month"
        >
          Engineer Activity &amp; Cost Impact
        </Header>
      }
      cardDefinition={{
        header: (eng: EngineerActivity) => (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <Avatar initials={eng.avatar} />
            <div style={{ flex: 1 }}>
              <Box fontWeight="bold" fontSize="body-m">{eng.name}</Box>
              <Box color="text-body-secondary" fontSize="body-s">{eng.team}</Box>
              <Box color="text-body-secondary" fontSize="body-s">{eng.email}</Box>
            </div>
            <SpaceBetween direction="horizontal" size="xs">
              <Badge color="red">{fmt(eng.costImpact)}</Badge>
              <Badge color="grey">{eng.actions} actions</Badge>
            </SpaceBetween>
          </div>
        ),
        sections: [
          {
            id: "summary",
            content: (eng: EngineerActivity) => (
              <SpaceBetween size="s">
                <Box variant="p" fontSize="body-s" color="text-body-secondary">
                  {eng.summary}
                </Box>
                <ExpandableSection
                  headerText={`View ${eng.events.length} CloudTrail events`}
                  expanded={expanded[eng.id]}
                  onChange={({ detail }) =>
                    setExpanded((p) => ({ ...p, [eng.id]: detail.expanded }))
                  }
                >
                  <Table
                    columnDefinitions={[
                      { id: "time",     header: "Time",     cell: (e) => <Box fontSize="body-s">{e.time}</Box> },
                      { id: "event",    header: "Event",    cell: (e) => <Box fontSize="body-s" fontWeight="bold">{e.event}</Box> },
                      { id: "service",  header: "Service",  cell: (e) => <Badge color="blue">{e.service}</Badge> },
                      { id: "resource", header: "Resource", cell: (e) => <Box fontSize="body-s">{e.resource}</Box> },
                      { id: "region",   header: "Region",   cell: (e) => <Box fontSize="body-s">{e.region}</Box> },
                      {
                        id: "cost", header: "Cost Delta",
                        cell: (e) => (
                          <Box
                            fontSize="body-s"
                            color={e.costDelta > 0 ? "text-status-error" : e.costDelta < 0 ? "text-status-success" : "text-body-secondary"}
                          >
                            {e.costDelta === 0 ? "—" : e.costDelta > 0 ? `+$${e.costDelta.toLocaleString()}` : `-$${Math.abs(e.costDelta).toLocaleString()}`}
                          </Box>
                        ),
                      },
                    ]}
                    items={eng.events}
                    variant="embedded"
                    stripedRows
                    empty={<Box textAlign="center">No events</Box>}
                  />
                </ExpandableSection>
              </SpaceBetween>
            ),
          },
        ],
      }}
      items={engineerActivities}
      cardsPerRow={[{ cards: 1 }, { minWidth: 900, cards: 2 }]}
      trackBy="id"
      empty={<Box textAlign="center">No engineer activity this month</Box>}
    />
  );
}
