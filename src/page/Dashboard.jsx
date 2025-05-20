import React, { useEffect, useState } from "react";
import CreationModal from "./modal/creation";
import InformationModal from "./modal/information";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [showCreation, setShowCreation] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [bills, setBills] = useState([]);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTg3NTdiNWYwZmUwMGVhYjEyOTllZiIsInJvbGUiOiJ4eHh4IiwiZW1haWwiOiJzYWZkdTcwQGdtYWlsLmNvbSIsImlhdCI6MTc0NzcyOTg1MywiZXhwIjoxNzQ3ODE2MjUzfQ.JU_EfARNbA_YlY7zXh9Lfw7xY4c25VGsTXwSD737WkQ"

useEffect(() =>{
(async () => {
  try{
    const response = await fetch('http://localhost:3000/bills',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBills(data);
  }catch(e){
    console.error('Error fetching bills:', e)
  }
})();
},  []);

  // Exemple de callback pour la création
  const handleAddFacture = (facture) => {
    setShowCreation(false);
    setBills([...bills, facture]);
  
  };

  const handleShowInfo = (data) => {
    setSelectedData(data);
    setShowInfo(true);
  };

  return (
    <div className="boxdash" style={{ position: 'relative', padding: 32 }}>
      <div>
          <Link to="/profil" style={{ textDecoration: "none" }}>
          <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        style={{
          position: 'absolute',
          top: 20,
          right: 25,
          zIndex: 10,
        }}
      >
        <circle cx="20" cy="20" r="18" stroke="#fff" strokeWidth="2" fill="#a084ca" />
        <ellipse cx="20" cy="27" rx="10" ry="6" stroke="#fff" strokeWidth="2" fill="none" />
        <circle cx="20" cy="16" r="6" stroke="#fff" strokeWidth="2" fill="none" />
      </svg>
          </Link>
       </div>{/* SVG en haut à droite */}
      
      {/* Colonne de gauche */}
      <div style={{ flex: 1, marginRight: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ margin: 0 }}>Mes factures</h1>
        </div>
        <div style={{ margin: '24px 0 16px 0' }}>
          <input type="text" placeholder="🔍 Recherche" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #a084ca', background: '#f7f1ff', color: '#6c4ab6', fontSize: 16 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {bills.map((f, i) => (
            <div onClick={() => handleShowInfo(f)} key={i} style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(160, 132, 202, 0.2)', padding: 12, minWidth: 260 }}>
              <div style={{ width: 36, height: 36, background: '#e0d7f3', borderRadius: 6, marginRight: 12 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#6c4ab6' }}>Id : {f._id}</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{f.amount}</div>
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
        <button  onClick={() => setShowCreation(true)} style={{ width: '80%', marginBottom: 24, background: '#a084ca', color: '#fff', borderRadius: 10, border: 'none', padding: '12px 0', fontSize: 20, fontWeight: 500, boxShadow: '0 2px 8px rgba(160, 132, 202, 0.15)' }}>
          Nouvelle facture
        </button>
        {showCreation && (
        <CreationModal
        onClose={() => setShowCreation(false)}
        onSave={handleAddFacture}
      />
    )}
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
      </div>
    </div>
  );
};

export default Dashboard;
