import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="box">
          <div style={{ marginBottom: 10 }}>
            <svg height="48" width="48" viewBox="0 0 48 48" fill="#a084ca">
              <circle cx="24" cy="18" r="10" stroke="#a084ca" strokeWidth="2" fill="none" />
              <ellipse cx="24" cy="36" rx="14" ry="8" stroke="#a084ca" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <h2>Se connecter</h2>
          <form style={{ width: "100%" }}>
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
            <button type="submit" style={{ width: "100%", marginTop: 8, marginBottom: 8 }}>
              Se connecter
            </button>
          </form>          
      <a>
          <Link to="/register" style={{ textDecoration: "none" }}>
          S'inscrire
          </Link>
       </a>
        </div>
    );
};

export default Login; 
