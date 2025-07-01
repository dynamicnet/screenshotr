FROM ghcr.io/puppeteer/puppeteer:24.11.1
USER root

ENV NODE_OPTIONS "--dns-result-order=ipv4first"

RUN npm i --save express@5.1.0 \
    && npm i --save sharp@0.34.2 \
    && npm i --save qs@6.14.0 \
	&& npm i --save --legacy-peer-deps puppeteer-cluster@0.24.0 \
	&& npx puppeteer browsers install

RUN npm cache clean --force

HEALTHCHECK --interval=120s --timeout=15s --start-period=60s \
    CMD node /docker_healthcheck.js

COPY cluster.js cluster.js
COPY screenshotr.js screenshotr.js
COPY pdfr.js pdfr.js
COPY docker_healthcheck.js docker_healthcheck.js
COPY healthcheck.js healthcheck.js
COPY app.js app.js

EXPOSE 3000
CMD ["node", "app.js"]
