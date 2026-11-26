"use client";
import React, { useState, useId } from "react";

const DEMO_USERS = [
  { email: "j.kila@dict.gov.pg",    role: "Admin",         team: "Cloud Infrastructure" },
  { email: "p.namaliu@dict.gov.pg", role: "Data Engineer", team: "Data & Applications"  },
  { email: "s.tari@dict.gov.pg",    role: "DevOps Lead",   team: "Platforms & DevOps"   },
];
const VALID_PASSWORD = "DictPNG2025!";

function AwsMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-label="AWS">
      <rect width="80" height="80" rx="14" fill="#232f3e" />
      <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle"
        fill="white" fontSize="24" fontWeight="900" fontFamily="Arial" letterSpacing="1">
        AWS
      </text>
      <path d="M16 58 Q40 72 64 58" fill="none" stroke="#ff9900" strokeWidth="4.5" strokeLinecap="round" />
      <polyline points="57,52 64,58 58,65" fill="none" stroke="#ff9900" strokeWidth="4.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" style={{ animation: "awsspin .7s linear infinite", flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" strokeOpacity=".2" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
    </svg>
  );
}

type Props = { onLogin: (email: string) => void };

// ── Main component ────────────────────────────────────────────────────
export default function LoginPage({ onLogin }: Props) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [demoOpen, setDemoOpen] = useState(false);

  const emailId = useId();
  const pwId    = useId();

  const canSubmit = !loading && email.trim().length > 0 && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 850));
    const known = DEMO_USERS.map(u => u.email);
    if (known.includes(email.trim()) && password === VALID_PASSWORD) {
      onLogin(email.trim());
    } else {
      setError("Incorrect email or password.");
      setLoading(false);
    }
  };

  const fillDemo = (u: typeof DEMO_USERS[0]) => {
    setEmail(u.email);
    setPassword(VALID_PASSWORD);
    setError("");
    setDemoOpen(false);
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(9,114,211,0.9)";
    e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(9,114,211,0.18)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
    e.currentTarget.style.boxShadow   = "none";
  };

  return (
    <>
      <style>{`
        @keyframes awsspin { to { transform: rotate(360deg); } }
        ::placeholder { color: rgba(255,255,255,0.25) !important; }
      `}</style>

      {/* ── Full-screen background — same #232f3e as Cloudscape TopNavigation ── */}
      <div style={{
        minHeight: "100vh",
        background: "#232f3e",
        display: "flex", flexDirection: "column",
        fontFamily: "'Amazon Ember','Helvetica Neue',Roboto,Arial,sans-serif",
      }}>

        {/* ── Centered login card ── */}
        <div style={{
          flex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "40px 16px",
          position: "relative", zIndex: 10,
        }}>
          <div style={{
            width: "100%", maxWidth: 420,
            background: "rgba(13,22,42,0.75)",
            border: "1px solid rgba(255,255,255,0.11)",
            borderRadius: 20,
            backdropFilter: "blur(28px)",
            
            overflow: "hidden",
          }}>



            <div style={{ padding: "36px 36px 32px" }}>

              {/* Logo + heading */}
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
                  <AwsMark size={52} />
                </div>
                <h1 style={{
                  fontSize: 20, fontWeight: 700, color: "#fff",
                  margin: "0 0 6px", letterSpacing: "-0.02em",
                }}>
                  Sign in to Dashboard
                </h1>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.5 }}>
                  DICT PNG &middot; Department of ICT, Papua New Guinea
                </p>
              </div>

              {/* Error alert */}
              {error && (
                <div role="alert" style={{
                  display: "flex", alignItems: "center", gap: 9,
                  padding: "10px 14px", marginBottom: 18,
                  background: "rgba(209,50,18,0.15)",
                  border: "1px solid rgba(209,50,18,0.4)",
                  borderRadius: 8, fontSize: 13, color: "#ff6b4a",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>

                {/* Email */}
                <div style={{ marginBottom: 14 }}>
                  <label htmlFor={emailId} style={{
                    display: "block", fontSize: 11, fontWeight: 700,
                    color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
                    letterSpacing: "0.07em", marginBottom: 7,
                  }}>
                    Email <span style={{ color: "#ff6b4a" }}>*</span>
                  </label>
                  <input
                    id={emailId} name="email" type="email"
                    autoComplete="email" autoFocus
                    value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@dict.gov.pg"
                    onFocus={onFocus} onBlur={onBlur}
                    style={{
                      width: "100%", height: 42,
                      padding: "0 14px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      borderRadius: 8, color: "#fff",
                      fontSize: 14, outline: "none",
                      boxSizing: "border-box", fontFamily: "inherit",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                    }}
                  />
                </div>

                {/* Password */}
                <div style={{ marginBottom: 10 }}>
                  <label htmlFor={pwId} style={{
                    display: "block", fontSize: 11, fontWeight: 700,
                    color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
                    letterSpacing: "0.07em", marginBottom: 7,
                  }}>
                    Password <span style={{ color: "#ff6b4a" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      id={pwId} name="password"
                      type={showPw ? "text" : "password"}
                      autoComplete="current-password"
                      value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      onFocus={onFocus} onBlur={onBlur}
                      style={{
                        width: "100%", height: 42,
                        padding: "0 44px 0 14px",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        borderRadius: 8, color: "#fff",
                        fontSize: 14, outline: "none",
                        boxSizing: "border-box", fontFamily: "inherit",
                        transition: "border-color 0.15s, box-shadow 0.15s",
                      }}
                    />
                    <button type="button"
                      aria-label={showPw ? "Hide password" : "Show password"}
                      onClick={() => setShowPw(v => !v)}
                      style={{
                        position: "absolute", right: 12,
                        top: "50%", transform: "translateY(-50%)",
                        background: "none", border: "none", cursor: "pointer",
                        padding: 2, lineHeight: 0, display: "flex",
                        color: showPw ? "#ff9900" : "rgba(255,255,255,0.35)",
                        transition: "color 0.12s",
                      }}
                    >
                      <EyeIcon open={showPw} />
                    </button>
                  </div>
                </div>

                {/* Forgot password */}
                <div style={{ textAlign: "right", marginBottom: 22 }}>
                  <a href="#"
                    onClick={e => {
                      e.preventDefault();
                      alert("Contact your DICT PNG system administrator to reset your password.");
                    }}
                    style={{ fontSize: 12, color: "#0972d3", textDecoration: "none", fontWeight: 500 }}
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <button type="submit" disabled={!canSubmit}
                  style={{
                    width: "100%", height: 44,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    background: canSubmit
                      ? "linear-gradient(135deg, #0972d3 0%, #065faa 100%)"
                      : "rgba(255,255,255,0.07)",
                    border: `1px solid ${canSubmit ? "rgba(9,114,211,0.5)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 8,
                    color: canSubmit ? "#fff" : "rgba(255,255,255,0.25)",
                    fontSize: 14, fontWeight: 700,
                    cursor: canSubmit ? "pointer" : "not-allowed",
                    letterSpacing: "0.01em",
                    transition: "all 0.15s",
                    boxShadow: canSubmit ? "0 4px 24px rgba(9,114,211,0.4)" : "none",
                  }}
                  onMouseEnter={e => {
                    if (canSubmit) e.currentTarget.style.background = "linear-gradient(135deg,#0861b8 0%,#054d8a 100%)";
                  }}
                  onMouseLeave={e => {
                    if (canSubmit) e.currentTarget.style.background = "linear-gradient(135deg,#0972d3 0%,#065faa 100%)";
                  }}
                >
                  {loading ? <><Spinner />Signing in...</> : "Sign in"}
                </button>
              </form>

              {/* Demo accounts collapsible */}
              <div style={{ marginTop: 20 }}>
                <button
                  type="button"
                  onClick={() => setDemoOpen(o => !o)}
                  style={{
                    width: "100%",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "9px 14px",
                    background: "rgba(255,153,0,0.08)",
                    border: "1px solid rgba(255,153,0,0.22)",
                    borderRadius: demoOpen ? "8px 8px 0 0" : 8,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#ff9900" }}>
                    Demo accounts
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#ff9900" strokeWidth="2.5" strokeLinecap="round"
                    style={{ transform: demoOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {demoOpen && (
                  <div style={{
                    border: "1px solid rgba(255,153,0,0.22)",
                    borderTop: "none", borderRadius: "0 0 8px 8px",
                    overflow: "hidden",
                  }}>
                    {DEMO_USERS.map((u, i) => (
                      <button key={u.email} type="button" onClick={() => fillDemo(u)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          width: "100%", padding: "10px 14px",
                          background: email === u.email
                            ? "rgba(9,114,211,0.2)"
                            : "rgba(0,0,0,0.3)",
                          borderBottom: i < DEMO_USERS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                          border: "none", cursor: "pointer", textAlign: "left",
                          transition: "background 0.1s",
                        }}
                        onMouseEnter={e => {
                          if (email !== u.email) e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                        }}
                        onMouseLeave={e => {
                          if (email !== u.email) e.currentTarget.style.background = "rgba(0,0,0,0.3)";
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{u.email}</div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginTop: 2 }}>
                            {u.role} &middot; {u.team}
                          </div>
                        </div>
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10,
                          background: "rgba(255,153,0,0.15)",
                          color: "#ff9900", border: "1px solid rgba(255,153,0,0.3)",
                          whiteSpace: "nowrap", flexShrink: 0,
                        }}>
                          {u.role}
                        </span>
                      </button>
                    ))}
                    <div style={{
                      padding: "8px 14px",
                      background: "rgba(0,0,0,0.4)",
                      fontSize: 11, color: "rgba(255,255,255,0.3)",
                    }}>
                      Password:&nbsp;
                      <code style={{
                        background: "rgba(255,255,255,0.09)", padding: "1px 6px",
                        borderRadius: 4, color: "rgba(255,255,255,0.6)", fontSize: 11,
                      }}>
                        DictPNG2025!
                      </code>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}
