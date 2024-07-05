#!/bin/bash

openssl genrsa -out ca.key 2048

openssl req -new -x509 -days 365 -key ca.key \
  -subj "/C=DE/CN=authz-server"\
  -out ca.crt

openssl req -newkey rsa:2048 -nodes -keyout tls.key \
  -subj "/C=DE/CN=authz-server" \
  -out tls.csr

  # -extfile <(printf "subjectAltName=DNS:host.containers.internal") \
openssl x509 -req \
  -days 365 \
  -extfile <(printf "subjectAltName=DNS:authorization-webhook") \
  -in tls.csr \
  -CA ca.crt -CAkey ca.key -CAcreateserial \
  -out tls.crt

rm *.csr
