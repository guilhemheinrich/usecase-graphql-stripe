# Étape 1 : Construction
FROM node:18-alpine AS builder
ARG EXPRESS_PORT
ENV EXPRESS_PORT=${EXPRESS_PORT}
# Installer pnpm globalement
RUN npm install -g pnpm && apk add --no-cache tree

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json, pnpm-lock.yaml et pnpm-workspace.yaml depuis la racine
COPY ./tsconfig.json ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./

# Copier les packages partagés
# Copy package.json and tsconfig.json and tsup.config.ts from packages, keeping the structure
#! Preservation de la structure : Dans cet exemple, si tu as plusieurs packages, il se peut que cela ne préserve pas la structure de répertoire de manière optimale, car tous les fichiers seront copiés à la racine de /app/server. Pour garder la structure de répertoire, il faut faire plusieurs COPY.
COPY ./packages/configuration/package.json ./packages/configuration/tsconfig.json ./packages/configuration/tsup.config.ts ./packages/configuration/
COPY ./packages/typescript-config ./packages/typescript-config/

# Copier également les fichiers package.json de l'application express-server
COPY ./apps/express-server/package.json ./apps/express-server/tsconfig.json ./apps/express-server/tsup.config.ts ./apps/express-server/


# Installer les dépendances pour l'application express-server
RUN pnpm install

RUN tree -L 3 -I 'node_modules|metadata|migrations|seeds' .

# Copier tous les fichiers du projet
COPY . .



# RUN pwd
# RUN ls /app/node_modules
# RUN ls -l /app/node_modules && ls -l /app/node_modules/nx

# RUN ls /app/node_modules/nx
# WORKDIR /app/apps/express-server
# Compiler le projet TypeScript pour l'application express-server
RUN npx nx run configuration:build
RUN npx nx run @org/express-server:build
EXPOSE ${EXPRESS_PORT}

# Démarrer l'application
CMD ["node", "apps/express-server/dist/index.js"]



# # Étape 2 : Production
# FROM node:18-alpine

# # Installer pnpm globalement
# RUN npm install -g pnpm

# # Définir le répertoire de travail pour le conteneur final
# WORKDIR /app

# # Copier les fichiers compilés depuis l'étape de construction
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/packages ./packages
# COPY --from=builder /app/apps/express-server/dist ./apps/express-server/dist

# # Exposer le port que l'application va utiliser
# EXPOSE 3000

# # Démarrer l'application
# CMD ["node", "apps/express-server/dist/index.js"]
