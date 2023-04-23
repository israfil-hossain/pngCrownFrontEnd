FROM node:18.16

RUN mkdir /pngcrown_frontend

WORKDIR /pngcrown_frontend

COPY ./package.json /pngcrown_frontend

RUN npm install 

COPY . /pngcrown_frontend

RUN npm run build

CMD ["npm", "start"] -- node js 
