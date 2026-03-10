import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

     // URL de base du backend via variable d'environnement Vite
     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://gsb-back.onrender.com';

     const res = await fetch(`${API_BASE_URL}/user/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if (res.ok) {
      setMessage('Lien de réinitialisation envoyé par email.');
    } else {
      setMessage('Erreur lors de l\'envoi du lien.');
    }
  };

  return (
    <div>
      <h2>Mot de passe oublié</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Envoyer</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;