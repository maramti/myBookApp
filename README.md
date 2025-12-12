Ma Librairie – MERN CRUD App

Une application MERN (MongoDB, Express, React, Node.js) pour gérer une bibliothèque personnelle. L’utilisateur peut ajouter, consulter, rechercher, modifier et supprimer des livres.

1-Fonctionnalités : Gestion des livres (CRUD)

Create (Ajouter un livre) : Nom, Auteur, Genre, État (terminé, en cours de lecture, en pause, va lire)

Read (Afficher tous les livres) + Rechercher par nom du livre

Update (Modifier un livre ) => Modifier l’état

Delete (Supprimer un livre de la librairie par titre et auteur )

2-Frontend (React.js)

Composants :

App.jsx – Page principale

AddBook.jsx – Formulaire pour ajouter un livre

DeleteBook.jsx – Formulaire pour supprimer un livre

PatchBook.jsx – Formulaire pour modifier un livre

GetBookSearch.jsx – Recherche de livres par nom

GetAllBooks.jsx – Liste complète des livres

Interface moderne, blanc + rose pâle, responsive et agréable à utiliser

Formulaires stylisés, boutons interactifs, cartes arrondies

3-Backend (Node.js + Express)

Routes REST API :

GET / – Récupérer tous les livres

GET /search?name=<nom> – Rechercher un livre par nom

POST /add – Ajouter un nouveau livre

DELETE /delete – Supprimer un livre (envoi name et author dans body)

PATCH /book – Modifier un livre (envoi name, author et status dans body)

Gestion des erreurs de manière basique (livre non trouvé, doublon à travers les indexes, problème serveur (500) ou problème requete (400) .., remplir touts les champs du form)

Utilisation de MongoDB pour le stockage des livres

3-Base de donnée (MongoDB Atlas) :

Nom de la base de données : myBookDB

Collection : book

Structure d’un document :

_id : identifiant généré automatiquement par MongoDB

name : nom du livre

author : nom de l’auteur

genre : genre du livre

status : état du livre (terminé, en cours de lecture, en pause, va lire)
