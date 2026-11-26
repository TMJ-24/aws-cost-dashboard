"use client";
import React, { useState, useCallback } from "react";

// Cloudscape
import AppLayout        from "@cloudscape-design/components/app-layout";
import SideNavigation   from "@cloudscape-design/components/side-navigation";
import TopNavigation    from "@cloudscape-design/components/top-navigation";
import ContentLayout    from "@cloudscape-design/components/content-layout";
import Header           from "@cloudscape-design/components/header";
import SpaceBetween     from "@cloudscape-design/components/space-between";
import Grid             from "@cloudscape-design/components/grid";
import Button           from "@cloudscape-design/components/button";
import Box              from "@cloudscape-design/components/box";
import Badge            from "@cloudscape-design/components/badge";
import Flashbar         from "@cloudscape-design/components/flashbar";
import { applyMode, Mode } from "@cloudscape-design/global-styles";

// Dashboard panels
import KPIStrip       from "@/components/dashboard/KPIStrip";
import AIBanner       from "@/components/dashboard/AIBanner";
import SpendChart     from "@/components/dashboard/SpendChart";
import ServiceTable   from "@/components/dashboard/ServiceTable";
import OUPanel        from "@/components/dashboard/OUPanel";
import EngineerPanel  from "@/components/dashboard/EngineerPanel";
import SecurityTable  from "@/components/dashboard/SecurityTable";
import WAFReview      from "@/components/waf/WAFReview";
import LoginPage      from "@/components/auth/LoginPage";
import { kpis }       from "@/lib/demo-data";

// -- Types ------------------------------------------------------------
type NavHref = "/" | "/engineers" | "/waf" | "/security";

type FlashItem = {
  type: "success" | "error" | "warning" | "info";
  content: string;
  id: string;
  dismissible: boolean;
  onDismiss: () => void;
};

// -- Helpers ----------------------------------------------------------
function refreshedLabel(iso: string) {
  return new Date(iso).toLocaleString("en-PG", {
    timeZone: "Pacific/Port_Moresby",
    hour12: true,
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function exportPDF(activeNav: NavHref) {
  const titles: Record<NavHref, string> = {
    "/":          "Cost Overview",
    "/engineers": "Engineer Activity",
    "/waf":       "WAF Review",
    "/security":  "Security Findings",
  };
  // In production replace with a real PDF library (e.g. react-pdf or server-side Puppeteer).
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`
    <html><head><title>DICT PNG � ${titles[activeNav]}</title>
    <style>body{font-family:Arial,sans-serif;padding:32px;color:#000716}
    h1{font-size:22px}p{color:#545b64;font-size:13px}</style></head>
    <body>
      <h1>DICT PNG � AWS ${titles[activeNav]}</h1>
      <p>Exported: ${new Date().toLocaleString("en-PG", { timeZone: "Pacific/Port_Moresby" })} PGT</p>
      <p>Data as at: ${refreshedLabel(kpis.lastRefreshed)} PGT</p>
      <p style="color:#d13212;margin-top:32px">
        ? This is a print-friendly placeholder.<br/>
        Connect a headless PDF renderer (Puppeteer / react-pdf) for production exports.
      </p>
      <script>window.print();window.close();<\/script>
    </body></html>`);
  w.document.close();
}

// -- Main page --------------------------------------------------------
export default function DashboardPage() {
  const [authed,     setAuthed]     = useState(false);
  const [activeUser, setActiveUser] = useState("");
  const [navOpen,    setNavOpen]    = useState(true);
  const [activeNav,  setActiveNav]  = useState<NavHref>("/");
  const [darkMode,   setDarkMode]   = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(kpis.lastRefreshed);
  const [flash,      setFlash]      = useState<FlashItem[]>([]);

  // -- Auth handlers ------------------------------------------------
  const handleLogin = (email: string) => {
    setActiveUser(email);
    setAuthed(true);
  };

  const handleLogout = () => {
    setAuthed(false);
    setActiveUser("");
  };

  // -- Dark mode toggle ---------------------------------------------
  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    applyMode(next ? Mode.Dark : Mode.Light);
  };

  // -- Flash helper -------------------------------------------------
  const addFlash = useCallback((type: FlashItem["type"], content: string) => {
    const id = Date.now().toString();
    setFlash(prev => [...prev, {
      type, content, id, dismissible: true,
      onDismiss: () => setFlash(p => p.filter(f => f.id !== id)),
    }]);
    // Auto-dismiss success/info after 4 s
    if (type === "success" || type === "info") {
      setTimeout(() => setFlash(p => p.filter(f => f.id !== id)), 4000);
    }
  }, []);

  // -- Fix 6: Refresh -----------------------------------------------
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate network round-trip; replace with real API call in production.
    await new Promise(r => setTimeout(r, 1400));
    const now = new Date().toISOString();
    setLastRefreshed(now);
    setRefreshing(false);
    addFlash("success", `Dashboard refreshed at ${refreshedLabel(now)} PGT`);
  };

  // -- Fix 5: Export PDF --------------------------------------------
  const handleExport = () => {
    exportPDF(activeNav);
    addFlash("info", "Print / save-as-PDF dialog opened in new tab.");
  };

  // -- Show login page if not authenticated -------------------------
  if (!authed) return <LoginPage onLogin={handleLogin} />;

  // -- Page content per nav item ------------------------------------
  const pageContent = () => {
    if (activeNav === "/engineers") return (
      <SpaceBetween size="l"><AIBanner /><EngineerPanel /></SpaceBetween>
    );
    if (activeNav === "/waf")       return <WAFReview />;
    if (activeNav === "/security")  return (
      <SpaceBetween size="l"><SecurityTable /></SpaceBetween>
    );
    return (
      <SpaceBetween size="l">
        <AIBanner />
        <KPIStrip />
        <Grid gridDefinition={[
          { colspan: { default: 12, m: 8 } },
          { colspan: { default: 12, m: 4 } },
        ]}>
          <SpaceBetween size="l">
            <SpendChart />
            <ServiceTable />
          </SpaceBetween>
          <OUPanel />
        </Grid>
      </SpaceBetween>
    );
  };

  const PAGE_TITLES: Record<NavHref, string> = {
    "/":          "AWS Cost Overview",
    "/engineers": "Engineer Activity & Cost Impact",
    "/waf":       "Well-Architected Framework Review",
    "/security":  "Security Hub Findings",
  };

  const sideNav = (
    <SideNavigation
      activeHref={activeNav}
      header={{ text: "DICT PNG", href: "/" }}
      onFollow={e => { e.preventDefault(); setActiveNav(e.detail.href as NavHref); }}
      items={[
        { type: "link",    text: "Cost Overview",     href: "/"          },
        { type: "link",    text: "Engineer Activity",  href: "/engineers" },
        { type: "link",    text: "WAF Review",         href: "/waf"       },
        { type: "link",    text: "Security Findings",  href: "/security"  },
        { type: "divider" },
        { type: "link", text: "AWS Cost Explorer",   href: "https://console.aws.amazon.com/cost-management/home", external: true },
        { type: "link", text: "Security Hub",        href: "https://console.aws.amazon.com/securityhub/home",    external: true },
        { type: "link", text: "AWS Organizations",   href: "https://console.aws.amazon.com/organizations/home",  external: true },
      ]}
    />
  );

  const initials = activeUser.split("@")[0].split(".").map(s => s[0]?.toUpperCase() ?? "").slice(0, 2).join("");

  return (
    <>
      {/* Flash notifications */}
      {flash.length > 0 && (
        <div style={{ position: "fixed", top: 56, right: 16, zIndex: 2000, width: 380 }}>
          <Flashbar items={flash} />
        </div>
      )}

      {/* -- Top nav -- */}
      <div id="h" style={{ position: "sticky", top: 0, zIndex: 1002 }}>
        <TopNavigation
          identity={{
            href: "/",
            title: "DICT PNG � AWS Cost Dashboard",
            logo: {
              src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='6' fill='%230972D3'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='18' font-weight='bold' font-family='Arial'%3EA%3C/text%3E%3C/svg%3E",
              alt: "DICT PNG",
            },
          }}
          utilities={[
            {
              type: "button",
              iconName: refreshing ? "status-pending" : "refresh",
              title: `Last refreshed: ${refreshedLabel(lastRefreshed)}`,
              disableUtilityCollapse: false,
              onClick: handleRefresh,
            },
            {
              type: "button",
              // Fix 4: dark mode toggle button in top nav
              iconName: "settings",
              title: darkMode ? "Switch to light mode" : "Switch to dark mode",
              onClick: toggleDark,
            },
            {
              type: "menu-dropdown",
              text: initials || "Admin",
              iconName: "user-profile",
              title: activeUser,
              items: [
                { id: "account", text: "Account: 001122334455" },
                { id: "region",  text: "Region: ap-southeast-2" },
                { id: "org",     text: "Org: DICT-PNG-ROOT" },
                { id: "divider", text: "-", disabled: true },
                { id: "logout",  text: "Sign out" },
              ],
              onItemClick: ({ detail }) => {
                if (detail.id === "logout") handleLogout();
              },
            },
          ]}
        />
      </div>

      {/* -- App shell -- */}
      <AppLayout
        headerSelector="#h"
        navigation={sideNav}
        navigationOpen={navOpen}
        onNavigationChange={({ detail }) => setNavOpen(detail.open)}
        toolsHide
        notifications={flash.length > 0 ? <Flashbar items={flash} /> : undefined}
        content={
          <ContentLayout
            header={
              <Header
                variant="h1"
                description={`Department of Information & Communications Technology, Papua New Guinea  �  Last refreshed: ${refreshedLabel(lastRefreshed)} PGT`}
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Badge color="red">{kpis.criticalFindings} Critical</Badge>
                    <Badge color="grey">{kpis.openFindings} Open Findings</Badge>
                    <Button iconName="download" onClick={handleExport}>Export PDF</Button>
                    <Button
                      variant="primary"
                      iconName="refresh"
                      loading={refreshing}
                      onClick={handleRefresh}
                    >
                      {refreshing ? "Refreshing�" : "Refresh Data"}
                    </Button>
                  </SpaceBetween>
                }
              >
                {PAGE_TITLES[activeNav]}
              </Header>
            }
          >
            <Box padding={{ bottom: "xl" }}>
              {pageContent()}
            </Box>
          </ContentLayout>
        }
      />
    </>
  );
}
