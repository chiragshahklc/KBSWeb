FROM node:14.17.0-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm i
CMD [ "npm","start" ]