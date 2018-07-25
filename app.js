#!/usr/bin/env node

const express = require("express");
const app = express();

const screenshotr = require("./screenshotr");

/**
 * HTTP Parameters :
 * url - url of the page to screenshot
 * vp_width - opt. set the viewport width in pixel (default: 1024px)
 * vp_height - opt. set the viewport height in pixel (default: 768px)
 * o_width - opt. set the width of the returned image (default: same as viewport width)
 * o_height - opt. set the height of the returned image (default: same as viewport height)
 * o_format - opt. set image format fot the output (png or jpg) (default: png)
 * dom_element_selector - opt. the CSS selector of the element you want to screenshot, if you don't want the entire body
 * fullpage - opt. parameter must be present if you want a fullpage screenshot (not only the visible viewport part)
 */
app.get("/screenshot", screenshotr);

app.listen(3000);
