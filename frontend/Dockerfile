# Setup a flux / react builder
FROM node:9.3.0-wheezy
USER root
RUN npm install http-server -g
USER node
WORKDIR /home/node
RUN git clone https://github.com/facebook/flux.git
ADD . /home/node/flux/examples/cpf-frontend
# Files transferred by ADD above are owned by root in container; working around
USER root
RUN chown -R node:node /home/node/flux/examples/cpf-frontend
USER node
WORKDIR /home/node/flux
RUN npm install
# Build frontend bundle
WORKDIR /home/node/flux/examples/cpf-frontend
RUN npm install
RUN npm run build
# Serve frontend
ENTRYPOINT http-server . -p 3000
EXPOSE 3000
