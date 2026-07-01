import { useEffect, useState } from "react";

export default function Welcome() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("welcome_seen");
    if (!seen) {
      setVisible(true);
      const timer = setTimeout(() => dismiss(), 3200);
      return () => clearTimeout(timer);
    }
  }, []);

  function dismiss() {
    setLeaving(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("welcome_seen", "1");
    }, 600);
  }

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at 60% 30%, rgba(229,62,62,0.18) 0%, #0a0a12 60%)",
        cursor: "pointer",
        opacity: leaving ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Glow rings */}
      <div style={{
        position: "absolute",
        width: 420,
        height: 420,
        borderRadius: "50%",
        border: "1.5px solid rgba(229,62,62,0.15)",
        animation: "pulse-ring 2.4s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute",
        width: 300,
        height: 300,
        borderRadius: "50%",
        border: "1.5px solid rgba(229,62,62,0.25)",
        animation: "pulse-ring 2.4s ease-in-out 0.3s infinite",
      }} />

      {/* Logo icon */}
      <div style={{
        width: 80,
        height: 80,
        borderRadius: 24,
        background: "rgba(229,62,62,0.12)",
        border: "1.5px solid rgba(229,62,62,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 28,
        animation: "float 3s ease-in-out infinite",
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      </div>

      {/* Title */}
      <div style={{
        fontSize: "2.6rem",
        fontWeight: 800,
        color: "#fff",
        letterSpacing: "-0.03em",
        marginBottom: 10,
        fontFamily: "Inter, sans-serif",
      }}>
        Best<span style={{ color: "#e53e3e" }}>UGCs</span>
      </div>

      {/* Subtitle */}
      <div style={{
        fontSize: "1rem",
        color: "rgba(255,255,255,0.45)",
        fontFamily: "Inter, sans-serif",
        marginBottom: 48,
        letterSpacing: "0.01em",
      }}>
        Comunidade #1 de UGC Roblox
      </div>

      {/* Loading bar */}
      <div style={{
        width: 160,
        height: 3,
        borderRadius: 99,
        background: "rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          borderRadius: 99,
          background: "linear-gradient(90deg, #e53e3e, #ff7070)",
          animation: "load-bar 3s ease-in-out forwards",
        }} />
      </div>

      <p style={{
        marginTop: 20,
        fontSize: "0.75rem",
        color: "rgba(255,255,255,0.2)",
        fontFamily: "Inter, sans-serif",
      }}>
        clique para entrar
      </p>

      <style>{`
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.06); opacity: 0.2; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes load-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
