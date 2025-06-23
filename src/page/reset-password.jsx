import React, { useState } from 'react';

const ResetPassword = () => {
  const [token, setToken] = useState(''); // ici tu peux le récupérer par URL si tu veux
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    const res = await fetch('http://localhost:3000/users/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        newPassword: password1
      })
    });

    if (res.ok) {
      setMessage('Mot de passe réinitialisé avec succès.');
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
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
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
        <button type="submit">Envoyer</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;