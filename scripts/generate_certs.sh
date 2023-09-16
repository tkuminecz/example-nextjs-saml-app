#!/usr/bin/env bash

openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout ./.certs/privateKey.key -out ./.certs/certificate.crt