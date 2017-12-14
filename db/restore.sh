#!/bin/bash

usage() {
	echo "usage: restore.sh <backup-label>" 1>&2
	exit 1
}

test $# -eq 1 || usage
LABEL="$1"
test -n "$LABEL" || usage
FILENAME="${LABEL}.mongodump.gz"
echo "Restoring from ${FILENAME} in backup directory..."
exec docker exec -it cpf-db mongorestore --drop --gzip --archive="/backup/${FILENAME}"
