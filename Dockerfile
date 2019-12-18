FROM node:10.16.3-alpine

COPY . /app
WORKDIR /app

EXPOSE 3005
RUN npm install

ENTRYPOINT ["npm", "start"]
