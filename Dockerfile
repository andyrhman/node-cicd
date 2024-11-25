# Build dependencies
FROM node:20.17 AS dependencies
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# Build production image
FROM dependencies AS builder
RUN npm run build
EXPOSE 8000
CMD ["npm", "run", "start"]
