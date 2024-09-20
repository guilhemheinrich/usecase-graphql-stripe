# Étape 1 : Construction
FROM node:18-alpine AS builder

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances (y compris TypeScript et autres outils nécessaires pour le build)
RUN npm install

# Copier tous les fichiers du projet
COPY . .

# Compiler le projet TypeScript
RUN npm run build

# Étape 2 : Production
FROM node:18-alpine

# Définir le répertoire de travail pour le conteneur final
WORKDIR /app

# Copier les dépendances de production uniquement depuis l'étape précédente
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

# Copier les fichiers compilés depuis l'étape de construction
COPY --from=builder /app/dist ./dist

# Exposer le port que l'application va utiliser
EXPOSE 3000

# Démarrer l'application
CMD ["node", "dist/index.js"]
