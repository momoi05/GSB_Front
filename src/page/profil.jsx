import React from "react";

const Profil = () => {
  return (
      <div style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(160, 132, 202, 0.2)",
        padding: 32,
        minWidth: 320,
        maxWidth: 350,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        {/* Avatar */}
        <div style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#a084ca",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12
        }}>
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" fill="#fff"/>
            <ellipse cx="12" cy="17" rx="7" ry="4" fill="#fff"/>
          </svg>
        </div>
        {/* Nom */}
        <div style={{ fontSize: 22, fontWeight: 600, color: "#6c4ab6", marginBottom: 18 }}>
          Lola Dupont
        </div>
        {/* Email */}
        <div style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: 14 }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
            <rect width="20" height="14" x="2" y="5" rx="3" fill="#a084ca"/>
            <polyline points="4,7 12,13 20,7" fill="none" stroke="#fff" strokeWidth="2"/>
          </svg>
          <span style={{ flex: 1, color: "#6c4ab6", fontSize: 16 }}>loladupont@gmail.com</span>
          <button style={{
            background: "none",
            border: "none",
            color: "#a084ca",
            fontWeight: 500,
            cursor: "pointer"
          }}>Modifier</button>
        </div>
        {/* Mot de passe */}
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
            <rect x="5" y="10" width="14" height="8" rx="2" fill="#a084ca"/>
            <rect x="9" y="13" width="2" height="3" rx="1" fill="#fff"/>
            <rect x="13" y="13" width="2" height="3" rx="1" fill="#fff"/>
            <rect x="7" y="7" width="10" height="6" rx="3" fill="#a084ca"/>
          </svg>
          <span style={{ flex: 1, color: "#6c4ab6", fontSize: 16 }}>************</span>
          <button style={{
            background: "none",
            border: "none",
            color: "#a084ca",
            fontWeight: 500,
            cursor: "pointer"
          }}>Modifier</button>
        </div>
      </div>
  );
};

export default Profil;
