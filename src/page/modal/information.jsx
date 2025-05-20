import React from "react";

const InformationModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#f3eefb",
        borderRadius: 12,
        padding: 24,
        minWidth: 320,
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        position: "relative"
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "none",
            border: "none",
            fontSize: 22,
            color: "#8e44ad",
            cursor: "pointer"
          }}
        >
          ×
        </button>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 16
          
        }}>
          <div style={{
            width: 80,
            height: 80,
            background: "#d8d8d8",
            borderRadius: 8,
            border: "8px solid #a084ca",
            marginBottom: 12
          }} ><img
          src={data.proof}
          alt="Justificatif de la facture"
          className="h-full w-full object-contain"
          style={{width: 80,
            height: 80,}}
        />
        </div>
            
        </div>
        <div>
          <div><b>Id :</b> {data._id}</div>
          <div><b>Montant :</b> {data.amount}€</div>
          <div><b>Date :</b> {data.date}</div>
          <div><b>Description :</b> {data.description}</div>
          <div><b>Status :</b> {data.status}</div>
          <div><b>Type :</b> {data.type}</div>
          <div><b>Pièce jointe :</b> {data.pieceJointe ? <a href={data.proof} target="_blank" rel="noopener noreferrer">Voir</a> : "Aucune"}</div>
         </div>
      </div>
    </div>
  );
};

export default InformationModal;