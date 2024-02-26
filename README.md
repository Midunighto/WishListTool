**Want it !**

🖥️🖥**Aperçu**
Want it ! est une application web qui permet aux utilisateurs de créer et de gérer des listes de souhaits pour des produits provenant de différents sites de commerce électronique. Les utilisateurs peuvent créer un compte pour créer, éditer et consulter leurs listes de souhaits. 
L'application suit les conventions de l'API REST pour une intégration facile avec différentes plateformes.

🚀🚀**Fonctionnalités**
Authentification des Utilisateurs: Les utilisateurs peuvent créer des comptes et se connecter pour gérer leurs listes de souhaits en toute sécurité.

**----Opérations sur les Wishlists:**

Récupérer toutes les listes de souhaits : 
GET /wishlists

Récupérer une liste de souhaits spécifique : 
GET /wishlists/:id

Récupérer les listes de souhaits d'un utilisateur : 
GET /users/:user_id/wishlists

Créer une nouvelle liste de souhaits : 
POST /wishlists

**----Opérations sur les Produits :**

Récupérer un produit d'une liste de souhaits : 
GET /users/:user_id/wishlists/:wishlist_id/items/:id

Ajouter un nouveau produit à une liste de souhaits : 
POST /items

Modifier un produit existant : 
PUT /items/:id

🛡️🛡️**Sécurité :**

La sécurité est une priorité pour Want It, c'est pourquoi nous utilisons JWT pour l'authentification et veillons à protéger les données de nos utilisateurs. 
**Démarrage**

**Installation**
Cloner le dépôt : git clone https://github.com/your-username/wishlist-manager.git

Accéder au répertoire du projet : cd wishlist-manager

Installer les dépendances : npm install

**Configuration**

Créer un fichier .env à la racine du projet et configurer les variables suivantes :

makefile
Copy code
PORT=3000
DATABASE_URL=mongodb://localhost:27017/wishlist_manager
SECRET_KEY=your_secret_key
Assurez-vous de remplacer your_secret_key par une clé sécurisée pour la gestion de session.

**Lancement de l'Application**

Démarrer le serveur : npm run dev
L'application sera accessible à l'adresse http://localhost:3000


**Contribution**
Si vous souhaitez contribuer au développement du Gestionnaire de Listes de Souhaits, veuillez suivre nos directives de contribution.

**Licence**
Ce projet est sous licence MIT - consultez le fichier LICENSE pour plus de détails.





