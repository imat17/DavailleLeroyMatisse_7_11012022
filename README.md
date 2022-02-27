Objectif : Réalisation d'un réseau social d'entreprise

## Technologies utilisées:

* React
* Node.js
* Express
* MySQL - Sequelize
* Sass

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

-A la racine du dossier "back",  veuillez respecter le nom des variables et remplir les valeurs en suivant l'exemple pour vous connecter à la base de données.
Exemple : 
* DATABASE='groupomania'
* USER='root'
* PASSWORD='votremotdepasse'
* DIALECT='mysql'
* DB_PORT='3306'
* HOST='localhost'
* TOKEN_SECRET='chainedecaractèresrandom'

-A la racine du dossier "groupomania"  (front/groupomania), veuillez respecter le nom de la variable et remplir la valeur en suivant l'exemple pour vous connecter à la base de données.
Donnez lui comme valeur le port sur lequel tourne le serveur Express. 
Exemple : 
* REACT_APP_API_URL: http://localhost:8000/

## Backend

Ouvrir le dossier "back" puis "groupomania" dans le terminal de votre éditeur puis exécuter la commande:

    npm install

ensuite depuis le même dossier, exécuter la commande:

    npm start
