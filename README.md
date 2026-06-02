# Projet UNCHK - Système de Gestion Universitaire Fullstack

Ce projet est une application web complète (Fullstack) basée sur une architecture de microservices avec un frontend développé en **Angular** et un backend propulsé par **Spring Boot** (Java).

## 🏢 Architecture du Projet

### Infrastructure Backend & Microservices
1. **registry** : Serveur de découverte (Eureka Server) pour centraliser l'enregistrement des services.
2. **gateway-service** : API Gateway (Spring Cloud Gateway) gérant le routage des requêtes.
3. **utilisateur-service** : Gestion des comptes et des accès utilisateurs.
4. **formation-service** : Gestion des cursus et des inscriptions.
5. **budget-service** : Suivi financier et allocation des ressources.
6. **communication-service** : Système de notifications et d'annonces.
7. **insertion-service** : Suivi des diplômés et des stages.

### Interface Frontend
- **frontend-universite** : Application cliente SPA développée avec **Angular**.

---

## 🚀 Ordre de Lancement Obligatoire

Pour que l'application fonctionne correctement, les services doivent être lancés dans l'ordre suivant :

### Étape 1 : Le Registre (Eureka)
```bash
cd registry && ./mvnw spring-boot:run
```
*Attendez que l'interface soit accessible sur le port configuré (généralement 8761) avant de continuer.*

### Étape 2 : La Gateway
```bash
cd ../gateway-service && ./mvnw spring-boot:run
```

### Étape 3 : Les Microservices Fonctionnels
Ouvrez de nouveaux terminaux pour lancer vos services applicatifs selon vos besoins :
```bash
cd ../utilisateur-service && ./mvnw spring-boot:run
cd ../formation-service && ./mvnw spring-boot:run
cd ../budget-service && ./mvnw spring-boot:run
cd ../communication-service && ./mvnw spring-boot:run
cd ../insertion-service && ./mvnw spring-boot:run
```

### Étape 4 : Le Frontend Angular
Ouvrez un terminal dédié au dossier frontend, installez les dépendances puis lancez le serveur de développement :
```bash
cd ../frontend-universite
npm install
ng serve
```
*L'application sera accessible sur `http://localhost:4200`.*

