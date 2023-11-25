FROM node:latest

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY . .

RUN yarn install

CMD ["yarn", "dev"]