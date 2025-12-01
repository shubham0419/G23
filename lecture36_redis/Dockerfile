FROM node:22

WORKDIR /redis-app

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=4000

EXPOSE 4000

CMD [ "node","index.js" ]