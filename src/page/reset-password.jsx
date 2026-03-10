import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [token, setToken] = useState(''); // ici tu peux le récupérer par URL si tu veux
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setuserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

  const params = new URLSearchParams(window.location.search);
  const tokenFromUrl = params.get('token');
  const idFromUrl = params.get('id');

  if (tokenFromUrl) setToken(tokenFromUrl);
  if (idFromUrl) setuserId(idFromUrl);
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }
     // URL de base du backend via variable d'environnement Vite
     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://gsb-back.onrender.com';

     const res = await fetch(`${API_BASE_URL}/user/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        token,
        newPassword: password1
      })
    });

    if (res.ok) {
      setMessage('Mot de passe réinitialisé avec succès.');
      navigate('/');
    } else {
      setMessage('Erreur lors de la réinitialisation.');
    }
  };

  return (
    <div>
      <h2>Réinitialiser le mot de passe</h2>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          placeholder="userId"
          value={userId}
          onChange={(e) => setuserId(e.target.value)}
          required
          style={{ display: 'none' }}
        />
        <input
          type="text"
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
          style={{ display: 'none' }}
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmez le mot de passe"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <button onClick={handleSubmit} type="submit">Envoyer</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;