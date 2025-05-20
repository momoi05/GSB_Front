import React, { useState } from "react";
import InformationModal from "./modal/information";


const factures = [
  { id: "99591525333351", montant: "2500€", date: "12/09/2025", statut: "En cours" },
  { id: "99591525333351", montant: "2500€", date: "12/09/2025", statut: "Terminer" },
  { id: "99591525333351", montant: "2500€", date: "12/09/2025", statut: "En cours" },
  { id: "99591525333351", montant: "2500€", date: "12/09/2025", statut: "En cours" },
  { id: "99591525333351", montant: "2500€", date: "12/09/2025", statut: "En cours" },
  { id: "99591525333351", montant: "2500€", date: "12/09/2025", statut: "En cours" },
  { id: "99591525333351", montant: "2500€", date: "12/09/2025", statut: "En cours" },
  { id: "99591525333351", montant: "2500€", date: "12/09/2025", statut: "En cours" },
  { id: "99591525333351", montant: "2500€", date: "12/09/2025", statut: "En cours" },
];
const utilisateur = [
    { name: "lola", date: "12/09/2025", role: "Commercial" },
    { name: "patrick", date: "12/09/2025", role: "Commercial" },
    { name: "jean",date: "12/09/2025", role: "Commercial" },
    { name: "benoit",date: "12/09/2025", role: "Commercial" },
    { name: "paul", date: "12/09/2025", role: "Commercial" },
    { name: "iris",  date: "12/09/2025", role: "Commercial" },
    { name: "bernard",  date: "12/09/2025", role: "Commercial" },
    { name: "je sais pas ", date: "12/09/2025", role: "Commercial" },
    { name: "ok",  date: "12/09/2025", role: "Commercial" },
  ];

const Dashboard = () => {
  const [showCreation, setShowCreation] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [onglet, setOnglet] = useState("factures"); // "factures" ou "utilisateur"

  // Exemple d’ouverture du modal d’info
  const handleShowInfo = (data) => {
    setSelectedData(data);
    setShowInfo(true);
  };

  return (
    <div className="boxdash" style={{ position: 'relative', padding: 32 }}>        
        <div style={{ 
  position: 'absolute',
  top: 20,
  left: 25,
  zIndex: 10,
  display: 'flex',
  gap: 24
}}>
  <div
    onClick={() => setOnglet("factures")}
    style={{
      cursor: "pointer",
      fontWeight: onglet === "factures" ? "bold" : "normal",
      color: onglet === "factures" ? "#a084ca" : "#6c4ab6",
      fontSize: 24,
      borderBottom: onglet === "factures" ? "3px solid #a084ca" : "none",
      paddingBottom: 4
    }}
  >
    Factures
  </div>
  <div
    onClick={() => setOnglet("utilisateur")}
    style={{
      cursor: "pointer",
      fontWeight: onglet === "utilisateur" ? "bold" : "normal",
      color: onglet === "utilisateur" ? "#a084ca" : "#6c4ab6",
      fontSize: 24,
      borderBottom: onglet === "utilisateur" ? "3px solid #a084ca" : "none",
      paddingBottom: 4
    }}
  >
    Utilisateur
  </div>
</div>
<div style={{ display: 'flex', flexDirection: 'row', gap: 32 }}>
  {onglet === "factures" && (
    <>
      {/* Colonne de gauche */}
      <div style={{ flex: 1, marginRight: 32, marginTop: 15 }}>
        <div style={{ margin: '24px 0 16px 0' }}>
          <input type="text" placeholder="🔍 Recherche" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #a084ca', background: '#f7f1ff', color: '#6c4ab6', fontSize: 16 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {factures.map((f, i) => (
            <div onClick={() => handleShowInfo(f)} key={i} style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(160, 132, 202, 0.2)', padding: 12, minWidth: 260}}>
              <div style={{ width: 36, height: 36, background: '#e0d7f3', borderRadius: 6, marginRight: 12 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#6c4ab6' }}>Id : {f.id}</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{f.montant}</div>
                <div style={{ fontSize: 13, color: '#888' }}>{f.date}</div>
              </div>
              <div style={{ fontSize: 13, color: f.statut === 'Terminer' ? '#6c4ab6' : '#a084ca', fontWeight: 600 }}>{f.statut}</div>
            </div>
          ))}          
          {showInfo && (
              <InformationModal
                data={selectedData}
                onClose={() => setShowInfo(false)}
              />
            )}
        </div>
      </div>
      {/* Colonne de droite */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(160, 132, 202, 0.2)', padding: 24, width: 460, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg width="180" height="180" viewBox="0 0 180 180">
            <g>
              <path d="M90,90 L90,20 A70,70 0 0,1 160,90 Z" fill="#d1b3ff" />
              <path d="M90,90 L160,90 A70,70 0 0,1 120,155 Z" fill="#b799ff" />
              <path d="M90,90 L120,155 A70,70 0 0,1 60,155 Z" fill="#a084ca" />
              <path d="M90,90 L60,155 A70,70 0 0,1 20,90 Z" fill="#6c4ab6" />
              <path d="M90,90 L20,90 A70,70 0 0,1 90,20 Z" fill="#8e7ab5" />
              <path d="M90,90 L90,20 A70,70 0 0,1 90,20 Z" fill="#c3aed6" />
            </g>
          </svg>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 16, gap: 12, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, background: '#d1b3ff', display: 'inline-block', borderRadius: 3 }}></span>ok1</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, background: '#b799ff', display: 'inline-block', borderRadius: 3 }}></span>ok2</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, background: '#a084ca', display: 'inline-block', borderRadius: 3 }}></span>ok3</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, background: '#6c4ab6', display: 'inline-block', borderRadius: 3 }}></span>ok4</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, background: '#8e7ab5', display: 'inline-block', borderRadius: 3 }}></span>ok5</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, background: '#c3aed6', display: 'inline-block', borderRadius: 3 }}></span>ok6</div>
          </div>
        </div>
      </div> </>
  )}
  {onglet === "utilisateur" && (
  <div style={{ flex: 1, marginRight: 32 }}>
  <div style={{ margin: '24px 0 16px 0' }}>
    <input type="text" placeholder="🔍 Recherche" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #a084ca', background: '#f7f1ff', color: '#6c4ab6', fontSize: 16 }} />
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {utilisateur.map((f, i) => (
      <div onClick={() => handleShowInfo(f)} key={i} style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(160, 132, 202, 0.2)', padding: 12, minWidth: 260 }}>
        <div style={{ width: 36, height: 36, background: '#e0d7f3', borderRadius: 6, marginRight: 12 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#6c4ab6' }}>Nom : {f.name}</div>
          <div style={{ fontSize: 13, color: '#888' }}>{f.date}</div>
        </div>
        <div style={{ fontSize: 13, color:'#6c4ab6' }}>{f.role}</div>
      </div>
    ))}          
    {showInfo && (
        <InformationModal
          data={selectedData}
          onClose={() => setShowInfo(false)}
        />
      )}
  </div>
</div>
  )}
</div>
    </div>
  );
};

export default Dashboard;
