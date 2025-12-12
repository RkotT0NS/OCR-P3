#!/usr/bin/env bash

java -jar \
    ../p3/docs/bin/plantuml-gplv2-1.2025.10.jar \
    -DRELATIVE_INCLUDE="relative" \
    --format png \
    --output-dir ../dist \
    ./diagrams/src
