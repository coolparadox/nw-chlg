FROM golang:1.9.2
RUN go get gopkg.in/mgo.v2
RUN go get github.com/gorilla/mux
ADD . /go/src/github.com/coolparadox/cpf/backend
WORKDIR /go/src/github.com/coolparadox/cpf/backend
RUN go install github.com/coolparadox/cpf/backend
ENTRYPOINT /go/bin/backend
EXPOSE 8080
