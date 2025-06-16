import React, { useEffect, useState, useRef } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Link, useNavigate } from "react-router-dom";
import CreationModal from "./modal/creation";
import InformationModal from "./modal/information";
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
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
        const response = await fetch("http://localhost:3000/bills", {
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
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setShowMenu(false);
      if (showCreation && creationModalRef.current && !creationModalRef.current.contains(event.target)) setShowCreation(false);
      if (showInfo && infoModalRef.current && !infoModalRef.current.contains(event.target)) setShowInfo(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCreation, showInfo]);

  const handleAddFacture = (facture) => {
    setShowCreation(false);
    setBills([...bills, facture]);
  };

  const handleShowInfo = (data) => {
    setSelectedData(data);
    setShowInfo(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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

  const getStatusClass = (statut) => {
    switch (statut.toLowerCase()) {
      case "en cours":
        return "status-in-progress";
      case "validé":
        return "status-approved";
      case "refusé":
        return "status-rejected";
      default:
        return "status-unknown";
    }
  };

  const filteredBills = bills.filter((bill) =>
    bill.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.amount.toString().includes(searchTerm) ||
    bill.date.includes(searchTerm)
  );


  return (
    <div className="dashboard-container">
      <img src={logo} alt="logo" className="logo" />

      <div className="dashboard-content">
        <div className="dashboard-left">
          <h1>Mes factures</h1>
          <input type="text" placeholder="🔍 Recherche" className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

          <div className="bills-list">
            {filteredBills.map((f, i) => (
              <div className="bill-item" onClick={() => handleShowInfo(f)} key={i}>
                <div className="bill-icon">
                  {icons[f.type] && <img src={icons[f.type]} alt={f.type} />}
                </div>
                <div className="bill-info">
                  <div className="bill-amount">{f.amount}€</div>
                  <div className="bill-date">{f.date}</div>
                </div>
                <div className={`bill-status ${f.status.toLowerCase()}`} style={{
                  color:
                    f.status.toLowerCase() === "validé" ? "#4CAF50" :
                      f.status.toLowerCase() === "en cours" ? "#FFA726" :
                        f.status.toLowerCase() === "refusé" ? "#F44336" :
                          "#9E9E9E"
                }}>
                  {f.status}
                </div>
              </div>
            ))}
          </div>

          {showInfo && (
            <InformationModal
              data={selectedData}
              ref={infoModalRef}
              isOpen={showInfo}
              onClose={() => setShowInfo(false)}
            />
          )}
        </div>

        <div className="dashboard-right">
          <div className="user-menu" ref={menuRef}>
            <img src={log} alt="log" onClick={() => setShowMenu(!showMenu)} className="menu-icon" />
            {showMenu && (
              <div className="dropdown-menu">
                <Link to="/profil" className="menu-item" style={{ color: '#6c4ab6' }} onClick={() => setShowMenu(false)}>Profil</Link>
                <a onClick={handleLogout} className="menu-item" style={{ color: '#ff4d4d' }} >Déconnexion</a>
              </div>
            )}
          </div>

          <button onClick={() => setShowCreation(true)} className="create-button">Nouvelle facture</button>

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
                fill="#8884d8"
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
