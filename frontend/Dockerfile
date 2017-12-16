FROM node:9.3.0-wheezy
USER root
RUN npm install http-server -g
USER node
WORKDIR /home/node
RUN git clone https://github.com/facebook/flux.git
WORKDIR /home/node/flux
RUN npm install
WORKDIR /home/node/flux/examples/flux-todomvc
RUN npm install
RUN npm run build
ENTRYPOINT http-server . -p 3000
EXPOSE 3000
