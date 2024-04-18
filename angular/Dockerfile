FROM node:lts-alpine

WORKDIR /app

RUN npm install -g npm@10.5.2

RUN npm install -g @angular/cli

CMD ["ng", "serve", "--host", "0.0.0.0"]