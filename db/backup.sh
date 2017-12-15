#!/bin/bash

usage() {
	echo "usage: backup.sh <backup-label>" 1>&2
	exit 1
}

test $# -eq 1 || usage
LABEL="$1"
test -n "$LABEL" || usage
FILENAME="${LABEL}.mongodump.gz"
echo "Generating ${FILENAME} in backup directory..."
exec docker exec cpf-db mongodump -d cpfs -c cpfs --gzip --archive="/backup/${FILENAME}"
