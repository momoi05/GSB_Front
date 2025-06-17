import React, { useEffect, useState, useRef } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Link, useNavigate } from "react-router-dom";
import CreationModal from "./modal/creation";
import InformationModal from "./modal/information";
import ModalProfil from "./modal/userInfo";
import autre from "../assets/autre.svg";
import carburant from "../assets/carburant.svg";
import hotel from "../assets/hotel.svg";
import materiel from "../assets/materiel.svg";
import peage from "../assets/peage.svg";
import resto from "../assets/resto.svg";
import transport from "../assets/transport.svg";
import log from "../assets/log.svg";
import logo from "../assets/preview.webp";


const Dashboard = () => {
  const [showCreation, setShowCreation] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [bills, setBills] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [showMenu, setShowMenu] = useState(false);
  const [onglet, setOnglet] = useState("factures");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalProfil, setShowModalProfil] = useState(false);
  const menuRef = useRef(null);
  const creationModalRef = useRef(null);
  const infoModalRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {

    if (!token) {
      navigate('/');
      return;
    }
    (async () => {
      try {
        const response = await fetch("https://gsb-back.onrender.com/bills", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setBills(data);
      } catch (e) {
        console.error("Error fetching bills:", e);
      }

    })();

    (async () => {
      try {
        const response = await fetch("https://gsb-back.onrender.com/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (e) {
        console.error("Error fetching bills:", e);
      }
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setShowMenu(false);
      if (showCreation && creationModalRef.current && !creationModalRef.current.contains(event.target)) setShowCreation(false);
      if (showInfo && infoModalRef.current && !infoModalRef.current.contains(event.target)) setShowInfo(false);
      if (showModalProfil && infoModalRef.current && !infoModalRef.current.contains(event.target)) setShowModalProfil(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCreation, showInfo, showModalProfil]);

  const handleAddFacture = (facture) => {
    setShowCreation(false);
    setBills([...bills, facture]);
  };

  const handleShowInfo = (data) => {
    setSelectedData(data);

    if (onglet === "factures") {
      setShowInfo(true);
    } else if (onglet === "utilisateur") {
      setSelectedUser(data);
      setShowModal(true);
    }
  };

  const handleShowProfil = (user) => {
    setSelectedUser(user);
    setShowModalProfil(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSelectUserBills = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = async (email) => {
    try {
      console.log("Deleting user with email:", email);
      const response = await fetch(`https://gsb-back.onrender.com/user?email=${email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de la suppression utilisateur");
      }

      const filteredUsers = users.filter(user => user.email !== email);
      setUsers(filteredUsers);
      setShowModal(false);
      setShowModalProfil(false);
    } catch (error) {
      console.error("Erreur suppression utilisateur :", error);
      alert("Erreur lors de la suppression de l'utilisateur: " + error.message);
    }
  };

  const filteredBills = bills.filter((bill) =>
    bill.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.amount.toString().includes(searchTerm) ||
    bill.date.includes(searchTerm)
  );

  const typeCountMap = bills.reduce((acc, bill) => {
    acc[bill.type] = (acc[bill.type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(typeCountMap).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  const colors = ["#d1b3ff", "#b799ff", "#a084ca", "#6c4ab6", "#8e7ab5", "#c3aed6"];

  const icons = {
    Transport: transport,
    Restauration: resto,
    Hôtel: hotel,
    Matériel: materiel,
    Carburant: carburant,
    Péage: peage,
    Autre: autre
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`https://gsb-back.onrender.com/bills/${id}`, {
        method: "PUT", // ou PUT selon ton backend
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour du statut");

      const updatedBill = await response.json();

      // Met à jour localement
      setBills((prevBills) =>
        prevBills.map((bill) => (bill._id === id ? updatedBill : bill))
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
      alert("Une erreur est survenue lors de la mise à jour du statut.");
    }
  };

  const statusOrder = {
    "en cours": 0,
    "validé": 1,
    "refusé": 2
  };

  const sortedBills = [...filteredBills].sort((a, b) => {
    const aStatus = a.status.toLowerCase();
    const bStatus = b.status.toLowerCase();
    return statusOrder[aStatus] - statusOrder[bStatus];
  });



  return (
    <div className="dashboard-container">
      <img src={logo} alt="logo" className="logo" />

      <div style={{ padding: "20px 20px 0", display: "flex", gap: 24, height: 30 }}>
        <div
          onClick={() => setOnglet("factures")}
          style={{ cursor: "pointer", fontWeight: onglet === "factures" ? "bold" : "normal" }}
        >
          Factures
        </div>
        <div
          onClick={() => setOnglet("utilisateur")}
          style={{ cursor: "pointer", fontWeight: onglet === "utilisateur" ? "bold" : "normal" }}
        >
          Utilisateur
        </div>
        <div className="user-menu" ref={menuRef}>
          <img
            src={log}
            alt="menu"
            onClick={() => setShowMenu(!showMenu)}
            className="menu-icon"
          />
          {showMenu && (
            <div className="dropdown-menu">
              <Link to="/profil" className="menu-item" style={{ color: "#6c4ab6" }}>
                Profil
              </Link>
              <a onClick={handleLogout} className="menu-item" style={{ color: "#ff4d4d" }}>
                Déconnexion
              </a>
            </div>
          )}
        </div>
      </div>



      <div className="dashboard-content">
        {/* === Colonne gauche === */}
        <div className="dashboard-left" style={{ paddingTop: 0 }}>
          <input
            type="text"
            placeholder="🔍 Recherche"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {onglet === "factures" && (
            <>

              <div className="bills-list">
                {sortedBills.map((f, i) => (
                  <div className="bill-item" key={i} onClick={() => handleShowInfo(f)}>
                    <div className="bill-icon">
                      {icons[f.type] && <img src={icons[f.type]} alt={f.type} />}
                    </div>
                    <div className="bill-info">
                      <div className="bill-amount">{f.amount}€</div>
                      <div className="bill-date">{f.date}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                      <div className={`bill-status ${f.status.toLowerCase()}`} style={{
                        color:
                          f.status.toLowerCase() === "validé" ? "#4CAF50" :
                            f.status.toLowerCase() === "en cours" ? "#FFA726" :
                              f.status.toLowerCase() === "refusé" ? "#F44336" :
                                "#9E9E9E"
                      }}>
                        {f.status}
                      </div>
                      {f.status.toLowerCase() === "en cours" && (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleUpdateStatus(f._id, "Validé"); }}
                            style={{
                              padding: "4px 8px",
                              backgroundColor: "#4CAF50",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              fontSize: "12px",
                              cursor: "pointer"
                            }}
                          >
                            Valider
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleUpdateStatus(f._id, "Refusé"); }}
                            style={{
                              padding: "4px 8px",
                              backgroundColor: "#F44336",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              fontSize: "12px",
                              cursor: "pointer"
                            }}
                          >
                            Refuser
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {onglet === "utilisateur" && (
            <>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {users.map((user, i) => (
                  <div
                    key={i}
                    className="bill-item"
                    style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <div onClick={() => handleSelectUserBills(user)} style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ color: "#6c4ab6" }}>Nom : {user.name}</div>
                      <div style={{ color: "#999", fontSize: 13 }}>{user.date}</div>
                    </div>
                    <button
                      onClick={() => handleShowProfil(user)}
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#6c4ab6",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    >
                      Voir profil
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* === Colonne droite === */}
        <div className="dashboard-right">

          {onglet === "factures" && (
            <>
              <button onClick={() => setShowCreation(true)} className="create-button">
                Nouvelle facture
              </button>
              {showCreation && (
                <CreationModal
                  ref={creationModalRef}
                  isOpen={showCreation}
                  onClose={() => setShowCreation(false)}
                  onSave={handleAddFacture}
                />
              )}
              <div className="chart-container">
                <h3>Répartition des factures</h3>
                <PieChart width={300} height={250}>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </>
          )}
        </div>
      </div>

      {showInfo && (
        <InformationModal
          ref={infoModalRef}
          data={selectedData}
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
        />
      )}

      {showModalProfil && selectedUser && (
        <ModalProfil
          user={selectedUser}
          onClose={() => setShowModalProfil(false)}
          onDelete={(email) => handleDeleteUser(email)}
        />
      )}
    </div>
  );
};

export default Dashboard;
