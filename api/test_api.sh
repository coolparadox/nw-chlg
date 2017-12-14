#!/bin/bash
#
# THIS ERASES THE DATABASE!!
#

set -e
docker exec cpf-db mongo --quiet cpfs --eval 'db.dropDatabase()'
# docker cp main_test.go cpf-api:/go/src/github.com/coolparadox/cpf/api/
exec docker exec cpf-api go test -v
