FROM node:10

# Install latest chrome package.
RUN apt-get update && apt-get install -y wget --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y wget \
    && rm -rf /src/*.deb

RUN yarn add express@4.17.1
RUN yarn add puppeteer@2.0.0
RUN yarn add sharp@0.23.1

RUN yarn cache clean

EXPOSE 3000

COPY screenshotr.js /screenshotr.js
COPY pdfr.js /pdfr.js
COPY browser.js /browser.js
COPY app.js /app.js

RUN chmod +x /app.js

CMD ["/app.js"]
