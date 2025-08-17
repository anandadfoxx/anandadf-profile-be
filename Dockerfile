FROM node:18-alpine

ENV NODE_ENV=production

RUN adduser -D runner \
    && mkdir /app \
    && chown -R runner:runner /app \
    && apk add --no-cache openssl

WORKDIR /app
USER runner

COPY --chown=runner:runner . .

RUN npm ci

EXPOSE 8080
CMD [ "index.js" ]