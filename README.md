# TO-DO LIST Application

Application fullstack de gestion de tâches développée avec Next.js + Redux (frontend) et FastAPI + SQLAlchemy (backend).

## Fonctionnalités implémentées

### Page Task :

* Affichage des tâches existantes.
* Ajouter une nouvelle tâche.
* Modifier une tâche.
* Supprimer une tâche.
* Sélection multiple pour suppression des tâches.

### Page Dashboard :

* Afficher le nombre total de tâches.
* Afficher le nombre de tâches modifiées.
* Afficher le nombre de tâches supprimées.
* Afficher le nombre de tâches accompli.
* Afficher le taux d'accomplissement des tâches.
* Afficher le nombre total de tâches Actifs.

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
- MySQL 8.0 CE https://dev.mysql.com/downloads/windows/installer/8.0.html

### Installation
```bash
# Cloner le repository
git clone https://github.com/hmdmok/To-Do-List-App.git
cd To-Do-List-App

# Installer toutes les dépendances
npm run install:all

# Lunch the App servers Backend and Frontend
npm run dev

# Open the application
 http://localhost:3000
