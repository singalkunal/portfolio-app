FROM node:alpine
WORKDIR /api

COPY package.json .
RUN npm install --only=prod

EXPOSE 3080
CMD ["npm", "run", "dev"]
