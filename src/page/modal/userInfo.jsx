import React, { useState, useEffect } from "react";
import login from "../../assets/log.svg";

const ModalProfil = ({ user, onClose, onUpdate, onDelete }) => {
    const originalEmail = user.email;
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: "",
    role: user.role || "utilisateur",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role || "utilisateur",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const confirmDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      onDelete(user.email);
    }
  };

  return (
      <div className="modal-user">
        <button onClick={onClose} className="close-button">x</button>
        <img src={login} alt="avatar" style={{ width: 64, marginBottom: 16 }} />
        
          <>
            <h2 style={{ color: "#6c4ab6" }}>{user.name}</h2>
            <p>{user.email}</p>
            <p>Rôle : {user.role || "utilisateur"}</p>
          </>

        <hr style={{ width: "100%", margin: "20px 0" }} />
        <button onClick={confirmDelete} style={{
          background: "#ff4d4d", color: "#fff", padding: "10px 16px",
          border: "none", borderRadius: 4, cursor: "pointer"
        }}>
          Supprimer l'utilisateur
        </button>
      </div>
  );
};

const inputStyle = {
  width: "100%", padding: 8, marginBottom: 10,
  border: "1px solid #ccc", borderRadius: 4, fontSize: 16
};

const buttonStyle = {
  padding: "10px 16px", background: "#a084ca", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer"
};

const linkStyle = {
  background: "none", border: "none", color: "#6c4ab6", cursor: "pointer", marginTop: 10
};

export default ModalProfil;
