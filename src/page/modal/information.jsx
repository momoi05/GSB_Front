import React, { useState, forwardRef } from "react";

const InformationModal = forwardRef(({ data, onClose }, ref) => {
  const [showFullImage, setShowFullImage] = useState(false);
  
  if (!data) return null;

  return (
    <div className="modal" ref={ref}>
      <button
        onClick={onClose}
        className="close-button"
      >
        x
      </button>
      <div className="modal-right" >
        <img
          src={data.proof}
          alt="Justificatif de la facture"
          className="h-full w-full object-contain"
          style={{ cursor: 'pointer' }}
          onClick={() => setShowFullImage(true)}
        />
        <div><b>Status :</b> {data.status}</div>
      </div>

      <div className="modal-left">
        <div><b>Id :</b> {data._id}</div>
        <div><b>Date :</b> {data.date}</div>
        <div><b>Type :</b> {data.type}</div>
        <div><b>Description :</b> {data.description}</div>
        <div><b>Montant :</b> {data.amount}€</div>
        <div><b>Pièce jointe :</b> {data.proof ? <a href={data.proof} target="_blank" rel="noopener noreferrer">Télécharger</a> : "Aucune"}</div>
      </div>

      {showFullImage && (
        <div className="modal-image"
          onClick={() => setShowFullImage(false)}
        >
          <img
            src={data.proof}
            alt="Justificatif de la facture en grand"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain'
            }}
          />
        </div>
      )}
    </div>
  );
});

export default InformationModal;