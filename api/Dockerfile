# Setup a golang builder with support for http serving
FROM golang:1.9.2
RUN go get gopkg.in/mgo.v2
RUN go get github.com/gorilla/mux
# Build backend
ADD . /go/src/github.com/coolparadox/cpf/api
WORKDIR /go/src/github.com/coolparadox/cpf/api
RUN go install github.com/coolparadox/cpf/api
# Serve backend
ENTRYPOINT /go/bin/api
EXPOSE 8080
