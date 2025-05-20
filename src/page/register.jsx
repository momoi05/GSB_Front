import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="box">
      <div style={{ marginBottom: 10 }}>
        <svg height="48" width="48" viewBox="0 0 48 48" fill="#a084ca">
          <g>
            <ellipse cx="24" cy="36" rx="14" ry="8" stroke="#a084ca" strokeWidth="2" fill="none" />
            <circle cx="24" cy="18" r="10" stroke="#a084ca" strokeWidth="2" fill="none" />
            <text x="30" y="16" fontSize="12" fill="#a084ca" fontWeight="bold">+</text>
          </g>
        </svg>
      </div>
      <h2>S'inscrire</h2>
      <form style={{ width: "100%" }}>
        <div>
          <input
            type="text"
            placeholder="Nom Prénom"
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Mot de passe"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirmation mot de passe"
            required
          />
        </div>
        <button type="submit" style={{ width: "100%", marginTop: 8, marginBottom: 8, background: "#a084ca", color: "#fff" }}>
          S'inscrire
        </button>
      </form>
      <a>
          <Link to="/login" style={{ textDecoration: "none" }}>
          Se connecter
          </Link>
       </a>
    </div>
  );
};

export default Register;
