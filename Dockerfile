FROM node:latest

RUN MKDIR /app
WORKDIR /app

COPY controllers controllers/
COPY middleware middleware/
COPY model model/
COPY prisma prisma/
COPY routes routes/
COPY utils utils/
COPY index.js .
COPY package.json .

RUN npm i

EXPOSE 8080
ENTRYPOINT [ "node" "index.js" ]