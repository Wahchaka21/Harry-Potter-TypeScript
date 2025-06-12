FROM node:22.16-alpine3.22 AS base
# L' OS est constuit
WORKDIR /app
# WORKDIR ça veut dire -> mkdir app && cd app (/app : créé à la racine)
COPY package*.json ./
# copié à l'intérieur de app (./)
RUN npm i

FROM base AS dev
# on arrive de base (/) et on va dans app (car WORKDIR = mkfir app && cd app, mais comme il existe déjà il va juste se déplace dedans)
WORKDIR /app
COPY . .
# Copy tout
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
# séparation d'un espace, le 1er ce qu'il y a dans l'ordi, et après l'espace ce qu'il y a dans le conteneur (là on lui donne un path absolu)
RUN chmod +x /usr/local/bin/entrypoint.sh
EXPOSE 3000 
# notre conteneur a le droit d'exposer sur le port 3000 (tu peux bien sur le port que tu veux)
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
# à la création du conteneur tu executes ce qu'il y a entre []
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]