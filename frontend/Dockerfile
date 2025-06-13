# ------- BUILDER ---------
FROM node:23-alpine AS basenode

WORKDIR /app

COPY package*.json ./

RUN npm install #&  npm install universal-cookie, axios, clsx

COPY . .

# ------- BUILDER ---------

# ------- RUNNER ---------
FROM node:23-alpine

WORKDIR /app

COPY --from=basenode /app/. .

EXPOSE 3001

CMD ["npm", "run", "dev"]

# ------- RUNNER ---------
