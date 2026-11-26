"use client";
import "./globals.css";
import { applyMode, Mode } from "@cloudscape-design/global-styles";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applyMode(Mode.Light);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>DICT PNG - AWS Cost Dashboard</title>
        <meta name="description" content="Department of Information and Communications Technology - AWS Cost and Well-Architected Dashboard" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
