# CPF / CNPJ Sample Microservice Application

This is a companion of a simple CPF/CNPJ (that's what we Brazilians use for official registration of people and companies) application based in microservices. The backend (Golang + MongoDB) offers a RESTful interface with CRUD methods for managing inclusion of CPF/CNPJ numbers, and the frontend (React Flux) is a SPA application that provides a simplistic view of the backend.

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

## Backup and Recovery

Scripts `db/backup.sh` and `db/restore.sh` generate and restore backups from/to the database. Backup files are generated (and expected to be when restored) in directory `backup`.

There is a sample backup provided with this repository containing a couple of items for playing around; you can recover the data stored by the database microservice with this sample by running:

```
$ ./db/restore.sh sample
Restoring from sample.mongodump.gz in backup directory...
2017-12-17T22:36:44.763+0000	preparing collections to restore from
2017-12-17T22:36:44.822+0000	reading metadata for cpfs.cpfs from archive '/backup/sample.mongodump.gz'
2017-12-17T22:36:45.001+0000	restoring cpfs.cpfs from archive '/backup/sample.mongodump.gz'
2017-12-17T22:36:45.017+0000	no indexes to restore
2017-12-17T22:36:45.017+0000	finished restoring cpfs.cpfs (3 documents)
2017-12-17T22:36:45.017+0000	done
```
Note that restoring a backup erases all previous data from the database.

## Enabling Https for the Wild

This system makes automatic use of [Let’s Encrypt](https://letsencrypt.org/) authority to get valid certificates for encryption of https data. For this to be enabled, you must have a publicly available domain and email. If this is your case, edit `docker-compose.yml` and `frontend/src/data/CpfStore.js`, replacing occurrences of the fake domain and email by valid ones, and restart the services.

This process should render a valid service in https port of your machine.

## Authentication

A basic user / password authentication is in place; file `proxy/htpasswd` can be manipulated with `htpasswd` command for management of users and passwords for a single level of authentication.

The cloned version of this file contains one user `guest` with password `guest`.

## Architecture

Please refer to ... for details on the architecture of this software.

## Wishlist / Known Issues

* Real world acquisiton of valid Lets's Encrypt certificates is yet to be tested.
* There are no authorization levels (eg. read only users versus admins).
* The frontend demonstrates Flux + React pattern and RESTful access by managing only CPF / CNPJ numbers; for production  more fields would have to be supported (eg: name, contact info etc.)

## References and Original Work

This software is based on the marvellous third-party work:

* [Flux Application Architecture](https://github.com/facebook/flux) by Facebook
* [Docker + Nginx + Let's Encrypt](https://gilyes.com/docker-nginx-letsencrypt/) by George Ilyes
* [Validação de CPF e CNPJ em Go](https://gopher.net.br/validacao-de-cpf-e-cnpj-em-go/) by Arthur Mastropietro
* [Example of Microservices in Go with Docker and MongoDB](https://github.com/mmorejon/microservices-docker-go-mongodb) by Manuel Morejón
