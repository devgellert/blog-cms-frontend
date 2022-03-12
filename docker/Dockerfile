FROM node:14

WORKDIR /usr/src/app/my-app

COPY package*.json ./

RUN npm i -g npm

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]