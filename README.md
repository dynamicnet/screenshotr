# screenshotr

Dockerized node webservice that take screenshot of web page


```
# Launch Container
# The http service will listen on 127.0.0.1 on port 3000
docker run -p 3000:3000 -d dynamicnet/screenshotr

# Take a screenshot of GitHub homepage
curl http://127.0.0.1:3000/screenshot?url=https://github.com/ > github-home.png
```


## Parameters
Name | Type | Description
---- | ---- | -----------
url | required string | url of the page to screenshot
vp_width | optional int (default: 1024) | set the viewport width in pixel
vp_height | opt. int (default: 768) | set the viewport height in pixel
o_width | opt. int | set the width of the returned image
o_height | opt. int | set the height of the returned image
o_format | opt. string (png\|jpg) (default: png) | set image format for the returned image
dom_element_selector | opt. string | a CSS selector of the element you want to screenshot, only if you don't want to screenshot the entire page
fullpage | opt. int (0\|1) (default: 0) | "1" to take a screenshot of the fullpage, "0" to take a screenshot of the viewport only
