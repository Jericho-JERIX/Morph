FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install typescript -g

COPY . .

RUN npx prisma migrate dev --name prod
RUN tsc
CMD [ "node", "./build/index.js" ]