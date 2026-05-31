# GSB Frontend

Frontend React/Vite de l’application GSB (Gestion des Notes de Frais).

## 📌 Présentation

GSB permet :

- aux utilisateurs :
  - se connecter / créer un compte
  - créer des notes de frais
  - consulter leurs remboursements
  - modifier leur profil

- aux administrateurs :
  - consulter toutes les notes de frais
  - valider ou refuser des notes
  - consulter les utilisateurs

## 🚀 Stack technique

- React 19
- Vite
- React Router
- Recharts
- Docker

## 🌐 Démo en ligne

Application déployée :

https://gsb-front-mauve.vercel.app

## 🔗 Dépôts liés

Backend API :

https://github.com/momoi05/GSB_Back

## 🧪 Comptes de démonstration (jury)

### Utilisateur standard

Email :
briane@gmail.com

Mot de passe :
Utilisateur05!v

---

### Administrateur

Email :
admin@gmail.com

Mot de passe :
MonG$b2026

---

Ces comptes sont présents sur l’environnement de démonstration.

## 📁 Structure

```bash
gsb-front/
├── src/
├── public/
├── package.json
├── vite.config.js
├── eslint.config.js
├── Dockerfile
└── .env.example
```

## ⚙️ Installation locale

### Prérequis

- Node.js >=20
- npm >=10

### Installation

```bash
git clone https://github.com/momoi05/GSB_Front.git
cd GSB_Front

npm install
cp .env.example .env
npm run dev
```

Application disponible sur :

```bash
http://localhost:5173
```

## 📜 Scripts disponibles

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## 📦 Fonctionnalités

- Authentification JWT
- Dashboard utilisateur
- Dashboard administrateur
- Gestion profil
- Gestion notes de frais
- Validation / refus admin

## 🤝 Contribution

```bash
git checkout -b feature/nom-feature
git commit -m "Ajout fonctionnalité"
git push origin feature/nom-feature
```

Puis ouvrir une Pull Request.

## 👤 Auteur

Projet réalisé par Tessa Taraschini
