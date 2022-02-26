
Objectif : Réalisation d'un réseau social d'entreprise

## Technologies utilisées:

-React
-Node.js
-Express
-MySQL - Sequelize
-Sass

## Procédure d'installation du projet :

## Front

Ouvrir le dossier "front" depuis le terminal de votre éditeur puis exécuter la commande:

    npm install

ensuite depuis le même dossier, exécuter la commande:

    npm start

Votre navigateur devrait s'ouvrir, sinon rendez-vous sur ce lien:

- http://localhost:3000

## Base de données

Deux fichiers .env sont nécessaires: 

-A la racine du dossier "back", ce fichier contient déjà des variables vides, veuillez remplir les variables avec les informations de base pour vous connecter à la base de données.
Exemple : 
DATABASE='groupomania'
USER='root'
PASSWORD='votremotdepasse'
DIALECT='mysql'
DB_PORT='3306'
HOST='localhost'

-A la racine du dossier "groupomania" , une variable "REACT_APP_API_URL" est présente, donnez lui comme valeur le port sur lequel tourne le serveur Express. 
Exemple: http://localhost:8000/

## Backend

Ouvrir le dossier "back" puis "groupomania" dans le terminal de votre éditeur puis exécuter la commande:

    npm install

ensuite depuis le même dossier, exécuter la commande:

    npm start