import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import signIcon from "../assets/sign1.svg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    setSuccess('');
    setLoading(true);

    // Validation côté client
    if (!formData.email || !formData.password || !formData.name || !formData.confirmPassword) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      console.log('Tentative d\'inscription avec:', {
        email: formData.email,
        name: formData.name,
        password: '***'
      });

      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'user' // Ajout du rôle par défaut
        }),
      });

      console.log('Statut de la réponse:', response.status);

      const responseText = await response.text();
      console.log('Réponse brute du serveur:', responseText);

      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error('Erreur de parsing JSON:', e);
        throw new Error('Le serveur a renvoyé une réponse invalide');
      }

      if (response.ok) {
        console.log('Inscription réussie:', data);
        setSuccess('Compte créé avec succès ! Redirection vers la page de connexion');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        if (response.status === 400) {
          setError(data.message || 'Données d\'inscription invalides');
        } else if (response.status === 409) {
          setError('Un compte avec cet email existe déjà');
        } else if (response.status === 500) {
          setError('Erreur serveur. Veuillez réessayer plus tard.');
        } else {
          setError(data.message || 'Erreur lors de la création du compte');
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setError(error.message || 'Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box">
      <img src={signIcon} alt="Icône d'inscription" className="icon" />
      <h2 className="title">S'inscrire</h2>
      <form className="form" onSubmit={handleSubmit}>
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        {success && <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
        <div>
          <input
            type="text"
            id="signin-name"
            name="name"
            placeholder="Nom Prénom"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            id="signin-email"
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
            id="signin-password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="signin-confirm-password"
            name="confirmPassword"
            placeholder="Confirmation mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="button" disabled={loading}>
        {loading ? 'Création en cours...' : 'Créer le compte'}
        </button>
      </form>
      <Link to="/" style={{ textDecoration: "none" }}>
        Se connecter
      </Link>
    </div>
  );
};

export default Register;
