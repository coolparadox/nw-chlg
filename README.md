# CPF / CNPJ Sample Microservice Application

This is a companion of a simple CPF/CNPJ (that's what we Brazilians use for official registration of people and companies) based in microservices. The backend (Golang + MongoDB) offers a RESTful interface with CRUD methods for managing inclusion of CPF/CNPJ numbers, and the frontend (React Flux) is a SPA application that provides a simplistic view of the backend.

## Quick Setup Instructions

* Install [docker](https://www.docker.com/)
* Install [docker-compose](https://docs.docker.com/compose/)
* Add `127.0.1.1	cpf.mydomain.org` to `/etc/hosts`
* Make sure there is no service using port 80 of your computer
* Clone this repo
* Run `docker-compose up --build` inside repo directory

At the first execution, docker will pull and build all required containers; this can take some time.
When all services are started, the following links become available (*):

* http://cpf.mydomain.org/cpfs - a RESTful http web API for inclusion and validation of CPF/CNPJ numbers. details
* http://cpf.mydomain.org/status - statistics of the proxy web server. details
* http://cpf.mydomain.org/ - a single page application for acessing /cpfs service. details

(*) On password prompt, provide user `guest` and password `guest`.


introduction

quick setup instructions

backup recovery

enabling https in the wild

architecture

wishlist

known issues

references and original work
