# Setup a flux / react builder
FROM node:9.3.0-wheezy
USER root
# RUN npm install http-server -g
# Instal facebook flux
USER node
WORKDIR /home/node
RUN git clone https://github.com/facebook/flux.git
WORKDIR /home/node/flux
RUN npm install
# Build frontend bundle
ADD . /home/node/flux/examples/cpf-frontend
USER root
RUN chown -R node:node /home/node/flux/examples/cpf-frontend
USER node
WORKDIR /home/node/flux/examples/cpf-frontend
RUN npm install
RUN npm run build
# Share bundle
RUN mkdir /home/node/public
RUN cp bundle.js /home/node/public/
RUN cp index.html /home/node/public/
RUN cp -r common /home/node/public/
ENTRYPOINT ["tail", "-f", "/dev/null"]
# Serve frontend
# ENTRYPOINT http-server . -p 3000
# EXPOSE 3000
