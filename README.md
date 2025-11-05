# TO-DO LIST Application

Application fullstack de gestion de tâches développée avec Next.js + Redux (frontend) et FastAPI + SQLAlchemy (backend).

## 🛠 Technologies Utilisées

### Frontend
- Next.js 14
- Redux Toolkit
- Material-UI (MUI)
- TypeScript

### Backend  
- FastAPI
- SQLAlchemy ORM
- MySQL
- Aerich (migrations)
- Python 3.8+

## 🚀 Installation et Lancement

### Pré-requis
- Node.js 18+
- Python 3.8+
- MySQL

### Installation
```bash
# Cloner le repository
git clone [votre-repo-url]
cd todo-app

# Installer toutes les dépendances
npm run install:all

# Configurer les variables d'environnement
cp backend/.env.example backend/.env
# Éditer le fichier .env avec vos paramètres MySQL
