FROM node:lts-slim

RUN mkdir -p /app

WORKDIR /app
# install node_modules
ADD package.json /app/package.json
RUN npm install --loglevel verbose
# copy codebase to docker codebase
ADD . /app

EXPOSE 8081

# You can change this
CMD [ "node", "serverApp.js" ]