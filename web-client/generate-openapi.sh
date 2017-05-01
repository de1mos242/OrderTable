#!/usr/bin/env bash
wget http://127.0.0.1:8000/schema/swagger/?format=openapi -O src/swagger-raw.json
python -m json.tool src/swagger-raw.json > src/swagger.json
rm src/swagger-raw.json
# java -jar external-binaries/swagger-codegen-cli-2.2.2.jar
