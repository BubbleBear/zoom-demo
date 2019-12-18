FROM node:10.16.3-alpine

COPY . /app
WORKDIR /app

EXPOSE 3000
RUN npm install

ENTRYPOINT ["npm", "start"]
