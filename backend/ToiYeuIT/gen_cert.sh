#!/bin/bash
# Remember to add certs to .gitignore
DIR="src/main/resources/certs"
rm -rf $DIR
mkdir $DIR
openssl genpkey -algorithm RSA -out $DIR/keypair.pem
openssl rsa -pubout -in $DIR/keypair.pem -out $DIR/public.pem
openssl pkcs8 -topk8 -inform PEM -outform PEM -in $DIR/keypair.pem -out $DIR/private.pem -nocrypt
rm -f $DIR/keypair.pem
