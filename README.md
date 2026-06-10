# Projet UNCHK - Système Intégré de Gestion Universitaire Fullstack

Ce projet est une application web complète (Fullstack) basée sur une architecture distribuée de microservices avec un frontend développé en **Angular 19** et un backend propulsé par **Spring Boot 3.4.3** (Java 17).

Projet d'évaluation pour le module **Architectures Logicielles Distribuées** – Master Ingénierie Logicielle (Promo 8 - Semestre 2).

## 🏢 Architecture du Projet

### Infrastructure Backend & Microservices
1. **registry** : Serveur de découverte (Netflix Eureka Server) pour centraliser l'enregistrement et le monitoring des instances (Port 8761).
2. **gateway-service** : API Gateway (Spring Cloud Gateway) gérant le routage dynamique et le dédoublonnage global des en-têtes CORS (Port 8080).
3. **utilisateur-service** : Gestion des comptes et des dossiers académiques complets avec numéros INE (Port 8081).
4. **formation-service** : Gestion des cursus, évaluations et saisie des notes académiques (Port 8082).
5. **communication-service** : Système de dématérialisation et archivage des procès-verbaux scellés (Port 8083).
6. **budget-service** : Suivi financier, dotations annuelles et contrôle strict des dépenses institutionnelles (Port 8084).
7. **insertion-service** : Observatoire de l'emploi (salarié & auto-emploi), bilans de stages et base des partenaires (Port 8085).

### Interface Frontend
- **frontend-universite** : Application cliente SPA développée avec **Angular 19** exploitant le *Control Flow* natif (`@for`, `@if`) et l'extraction statistique asynchrone via `jsPDF`.

---

## 🚀 Ordre de Lancement Obligatoire

Pour que l'écosystème distribué fonctionne correctement, les infrastructures de données et de routage doivent être démarrées dans l'ordre chronologique suivant :

### Étape 1 : Persistance des Données (Docker PostgreSQL)
Avant tout lancement applicatif, démarrez le conteneur isolé hébergeant les 5 bases de données du projet :
```bash
docker start pg-universite
```
*(Vérifiez l'activation sur le port 5432 via la commande `docker ps`)*

### Étape 2 : Le Registre de Découverte (Eureka)
Ouvrez un premier terminal dans le dossier du serveur de découverte et exécutez :
```cmd
mvnw.cmd spring-boot:run
```
*Attendez que le tableau de contrôle soit accessible à l'adresse `http://localhost:8761` avant de poursuivre.*

### Étape 3 : La Gateway Réactive (Passerelle Unique)
Ouvrez un deuxième terminal dans le dossier de la passerelle réseau et exécutez :
```cmd
mvnw.cmd spring-boot:run
```
*La Gateway est désormais active sur le port 8080 et prête à écouter l'application Angular.*

### Étape 4 : Les Microservices Métiers Fonctionnels
Ouvrez des terminaux distincts pour chacun des microservices métiers de votre dossier backend et lancez-les simultanément :
```cmd
:: Dans le dossier utilisateur-service
mvnw.cmd spring-boot:run

:: Dans le dossier formation-service
mvnw.cmd spring-boot:run

:: Dans le dossier budget-service
mvnw.cmd spring-boot:run

:: Dans le dossier communication-service
mvnw.cmd spring-boot:run

:: Dans le dossier insertion-service
mvnw.cmd spring-boot:run
```
*🛑 **IMPORTANT** : Attendez 15 à 30 secondes après le lancement du dernier service pour permettre à l'annuaire Eureka d'indexer les tables de routage avant d'effectuer vos premiers tests.*

### Étape 5 : L'Interface Graphique (Frontend Angular)
Ouvrez un terminal dédié au dossier frontend, installez l'arbre des dépendances puis lancez le serveur d'affichage local :
```bash
npm install
ng serve
```
*L'application universitaire centralisée sera accessible sur : **`http://localhost:4200`***
