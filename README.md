# Screenshot and PDF converter

Dockerized NodeJS webservice that take screenshot of webpage or convert them to PDF. A simple ExpressJS service that wrap Puppeteer.

```
# Launch Container
# The http service will listen on 127.0.0.1 on port 3000
docker run -p 3000:3000 -d dynamicnet/screenshotr

# Take a screenshot of GitHub homepage
curl http://127.0.0.1:3000/screenshot?url=https://github.com/ > github-home.png

# Convert GitHub homepage to PDF
curl http://127.0.0.1:3000/pdf?url=https://github.com/ > github.pdf
```


## Endpoints and parameters
The service offers 2 main endpoints.

### endpoint `GET /screenshot`
Name | Type | Description
---- | ---- | -----------
url | string<br>**required** | url of the page to screenshot
username | string<br>*optional* | Username for HTTP auth basic authentication
password | string<br>*optional* | Password for HTTP auth basic authentication
vp_width | integer<br>*optional* | set the viewport width in pixel. Defaults to 1024
vp_height | integer<br>*optional* | set the viewport height in pixel. Defaults to 768
o_width | integer<br>*optional* | set the width of the returned image. Default to the viewport width
o_height | integer<br>*optional* | set the height of the returned image. Default to the viewport height
o_format | string (one of png \| jpg)<br>*optional* | set image format for the returned image. Defaults to png
dom_element_selector | string<br>*optional* | a CSS selector of the element you want to screenshot, only if you don't want to screenshot the entire page
fullpage | integer (0 \| 1)<br>*optional* | "1" to take a screenshot of the fullpage, "0" to take a screenshot of the viewport only. Default to 0

### endpoint `GET /pdf`
Name | Type | Description
---- | ---- | -----------
url | string<br>**required** | url of the page to screenshot
username | string<br>*optional* | Username for HTTP auth basic authentication
password | string<br>*optional* | Password for HTTP auth basic authentication
scale | float<br>*optional* | Scale of the webpage rendering. Defaults to 1. Scale amount must be between 0.1 and 2.
printBackground | bool<br>*optional* | Print background graphics. Defaults to false.
landscape | bool<br>*optional* | Paper orientation. Defaults to false.
format | string<br>*optional* | Paper format. Defaults to 'A4'.
pageRanges | string<br>*optional* | Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
headerTemplate | string<br>*optional* | HTML template for the print header.
footerTemplate | string<br>*optional* | HTML template for the print footer.
margin | map<br>*optional* | Keys: "top", "right", "bottom", "left".<br>Values: string

## Environments variables
Name | Description
---- | -----------
IGNORE_HTTPS_ERRORS | If set, the launched browser will not complaint about invalid certifcate. Designed mainly for development environment that use self signed certifacate or [Caddy Local Authority](https://caddyserver.com/docs/automatic-https#local-https)
HTTP_AUTH_BASIC_USER | Protection of `/pdf` and `/screenshot` endpoints, the username to be used for the HTTP Basic Auth
HTTP_AUTH_BASIC_PWD | Protection of `/pdf` and `/screenshot` endpoints, the password to be used for the HTTP Basic Auth
