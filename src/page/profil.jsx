import React, { useEffect, useState } from "react";
import login from "../assets/log.svg"
import { useNavigate } from "react-router-dom";


function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}


const Profil = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", newEmail: "", password: "" });
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const payload = parseJwt(token);
  const userEmail = payload?.email;

  useEffect(() => {
    if (!token || !userEmail) {
      navigate('/');
      return;
    }

    (async () => {
      try {
        const response = await fetch(`https://gsb-back.onrender.com/user?email=${userEmail}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
        const data = await response.json();
        const currentUser = data[0];
        setUser(currentUser);
        setFormData({
          name: currentUser.name,
          newEmail: currentUser.email,
          password: ""
        });

        
      } catch (e) {
        console.error('Error fetching user:', e)
      }
    })();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://gsb-back.onrender.com/user?email=${userEmail}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditMode(false);
      } else {
        console.error("Erreur lors de la mise à jour.");
      }
    } catch (e) {
      console.error("Erreur de mise à jour :", e);
    }
  };

  if (!user) {
    return <div>Chargement du profil...</div>;
  }
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      padding: "20px"
    }}>
      <button
        onClick={() => {
          if (user && user.role === "admin") {
            navigate("/dashadmin");
          } else {
            navigate("/dashboard");
          }
        }}
        style={{
          alignSelf: "flex-start",
          padding: "8px 16px",
          backgroundColor: "#a084ca",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Retour
      </button>

      <div  className="card-profil">
        {/* Avatar */}
        <img src={login} alt="login" className="icon" />
        {/* Nom */}
        <div style={{
          fontSize: 22, fontWeight: 600, color: "#6c4ab6", marginBottom: 18,
        }}>
          {editMode ? (
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className= "inputStyle"
            />
          ) : (
            user.name
          )}
        </div>
        {/* Email */}
        <div style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: 14 }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
            <rect width="20" height="14" x="2" y="5" rx="3" fill="#a084ca" />
            <polyline points="4,7 12,13 20,7" fill="none" stroke="#fff" strokeWidth="2" />
          </svg> {editMode ? (
            <input
              name="email"
              value={formData.newEmail}
              onChange={handleChange}
              className= "inputStyle"
            />
          ) : (
            <span style={{ flex: 1, color: "#6c4ab6", fontSize: 16 }}>{user.email}</span>
          )}
        </div>
        {/* Mot de passe */}
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
            <rect x="5" y="10" width="14" height="8" rx="2" fill="#a084ca" />
            <rect x="9" y="13" width="2" height="3" rx="1" fill="#fff" />
            <rect x="13" y="13" width="2" height="3" rx="1" fill="#fff" />
            <rect x="7" y="7" width="10" height="6" rx="3" fill="#a084ca" />
          </svg> {editMode ? (
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nouveau mot de passe"
              className= "inputStyle"
            />
          ) : (
            <span style={{ flex: 1, color: "#6c4ab6", fontSize: 16 }}>************</span>
          )}
        </div>
        {editMode ? (
          <>
            <button onClick={handleSave} style={{ marginTop: 10, padding: 8, backgroundColor: "#a084ca", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
              Enregistrer
            </button>
            <button onClick={() => setEditMode(false)} style={{ marginTop: 6, background: "none", border: "none", color: "#6c4ab6", cursor: "pointer" }}>
              Annuler
            </button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)} style={{ marginTop: 10, background: "none", border: "none", color: "#a084ca", fontWeight: 500, cursor: "pointer" }}>
            Modifier le profil
          </button>
        )}
      </div>
    </div>
  );
};

export default Profil;
