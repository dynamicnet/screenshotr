# screenshotr

Dockerized node webservice that take screenshot of web page


```
# Launch Container
docker run -p 3000:3000 -d dynamicnet/screenshotr

# Take a screenshot og GitHub homepage
curl http://127.0.0.1:3000/screenshot?url=https://github.com/ > github-home.png
```


## Parameters
 * url - required. url of the page to screenshot
 * vp_width - optional. set the viewport width in pixel (default: 1024)
 * vp_height - opt. set the viewport height in pixel (default: 768)
 * o_width - opt. set the width of the returned image
 * o_height - opt. set the height of the returned image
 * dom_element_selector - opt. the CSS selector of the element you want to screenshot, if you don't want the entire body
 * fullpage - opt. "1" to take a screenshot of the fullpage, "0" to take a screenshot of the visible area (default: 0)
