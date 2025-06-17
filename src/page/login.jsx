import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logIcon from "../assets/log1.svg";

// Fonction pour décoder un JWT
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erreur lors du décodage du JWT:', error);
    return null;
  }
};

function Login({ onLogin }) {
  // Tous les hooks useState déclarés en premier
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation côté client
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    try {
      console.log('Tentative de connexion avec:', { email: formData.email });

      const response = await fetch('https://gsb-back.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      console.log('Statut de la réponse:', response.status);

      if (!response.ok) {
        // Gestion spécifique des codes d'erreur HTTP
        if (response.status === 401) {
          throw new Error('Email ou mot de passe incorrect');
        } else if (response.status === 404) {
          throw new Error('Service de connexion non disponible');
        } else if (response.status >= 500) {
          throw new Error('Erreur serveur. Veuillez réessayer plus tard.');
        }
      }

      const data = await response.json();

      if (response.ok) {
        // Connexion réussie
        console.log('Connexion réussie:', data);
        console.log('Type de data:', typeof data);
        console.log('Est-ce un tableau?', Array.isArray(data));
        console.log('Structure de data:', Object.keys(data));
        console.log('Contenu complet de data:', JSON.stringify(data, null, 2));

        // Récupérer le token
        const token = data.token || data.accessToken;

        console.log('Token extrait:', token ? 'Présent' : 'Absent');

        if (token) {
          localStorage.setItem('token', token);
          console.log('Token sauvegardé dans localStorage');

          // Décoder le JWT pour extraire les informations utilisateur
          const decodedToken = decodeJWT(token);
          console.log('Token JWT décodé:', decodedToken);

          if (decodedToken) {
            // Créer un objet utilisateur à partir du token décodé
            const userFromToken = {
              id: decodedToken.id,
              email: decodedToken.email,
              role: decodedToken.role || decodedToken.Role,
              name: decodedToken.name || decodedToken.nom || decodedToken.email
            };

            console.log('Utilisateur créé depuis le token:', userFromToken);
            console.log('Rôle extrait du token:', userFromToken.role);

            if (onLogin) {
              onLogin(userFromToken);
            }

            // Redirection basée sur le rôle extrait du token
            const userRole = userFromToken.role;
            console.log('Rôle utilisateur détecté:', userRole);

            if (userRole === 'admin' || userRole === 'Admin') {
              console.log('🚀 Redirection vers AdminDashboard');
              navigate('/dashadmin');
            } else {
              console.log('🚀 Redirection vers UserDashboard');
              navigate('/dashboard');
            }
          } else {
            console.warn('Impossible de décoder le token JWT');
            setError('Erreur lors du traitement du token d\'authentification');
            return;
          }
        } else {
          console.warn('Aucun token reçu du serveur');
          setError('Aucun token d\'authentification reçu');
          return;
        }
      } else {
        // Échec de la connexion
        setError(data.message || 'Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);

      // Gestion spécifique des erreurs réseau
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('Impossible de se connecter au serveur. Vérifiez que le serveur backend est démarré sur https://gsb-back-end.onrender.com');
      } else {
        setError(error.message || 'Erreur de connexion au serveur');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box">
      <img src={logIcon} alt="Icon de login" className="icon" />
      <h2 className="title">Se connecter</h2>
      {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            id="login-email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="login-password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button onClick={handleSubmit} type="submit" className="button">
          Se connecter
        </button>
      </form>
      <Link to="/register" style={{ textDecoration: "none" }}>
        S'inscrire
      </Link>
    </div>
  );
};

export default Login; 
