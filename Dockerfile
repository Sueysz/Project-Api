FROM node:20

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]