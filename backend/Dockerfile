FROM node:17.1-alpine AS builder

WORKDIR /opt/web
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npx prisma generate
CMD ["npm", "run", "dev"]
