FROM node:18-alpine

MAINTAINER Tesliuk Kirill

RUN mkdir /app

COPY backend/package.json /app

WORKDIR /app

RUN npm install --production