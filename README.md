Application frontend React/Vite pour le projet GSB.

Le principe de l'application GSB:
GSB est une application de gestion de note de frais. Elle doit permettre au utilisateur d'ajouter des notes de frais et de consulter celle déjà ajouter. Elle doit également permettre a un administrateur de valider ou non les notes de frais des utilisateurs

Ce frontend comprends 5 page : une page de login pour se connecté a l'application, une page d'inscription pour s'inscrire sur l'application, une page Dashboard pour voir, en tant qu'utilisateur lambda, nos notes de frais et en ajouter, une page profil pour pouvoir consulter notre profil et faire des modifications si besoin. Et une page dashadmin qui permet a un utilisateur admin de consulter toute els note de frais et de les validées ou refusées et lui permet également de voir tout les utilisateur et leur profil. 

Prérequis
Node.js (version 20 ou supérieure)
npm (généralement installé avec Node.js)
Docker (optionnel, pour la conteneurisation)
Installation
Installation locale
Cloner le repository :
git clone <url-du-repo>
cd gsb_front
Installer les dépendances :
npm install
Lancer l'application en mode développement :
npm run dev
L'application sera accessible à l'adresse : http://localhost:5173

Installation avec Docker
Construire et lancer avec Docker Compose (recommandé pour le développement) :
docker compose up
Ou construire l'image Docker manuellement :
sudo docker build -t gsb-front .
Lancer le conteneur :
sudo docker run -p 5173:5173 gsb-frontend
Note : L'utilisation de Docker Compose est recommandée car elle configure automatiquement :

Le hot-reload avec nodemon
Les volumes pour le développement
Les variables d'environnement nécessaires
Scripts disponibles
npm run dev : Lance le serveur de développement
npm run build : Compile l'application pour la production
npm run preview : Prévisualise la version de production localement
npm run lint : Exécute le linter pour vérifier le code
Structure du projet
gsb-front/
├── src/              # Code source de l'application
├── public/           # Fichiers statiques
├── node_modules/     # Dépendances (généré automatiquement)
├── package.json      # Configuration du projet et dépendances
├── vite.config.js    # Configuration de Vite
├── eslint.config.js  # Configuration d'ESLint
└── dockerfile        # Configuration Docker