import express from "express"
import qs from "qs"

import screenshotr from "./screenshotr.js"
import pdfr from "./pdfr.js"
import healthcheck from "./healthcheck.js"
import authentication from "./basic-auth.js"

const app = express();
const router = express.Router()

app.set("query parser", function (str) {
  return qs.parse(str)
})

app.get('/probe', function( req, res ){
    res.send("<html><head></head><body>Probe OK</body></html>");
});

app.get('/healthcheck', healthcheck);

/**
 * Common HTTP Parameters
 *
 * username - Username for HTTP auth basic authentication
 * password - Password for HTTP auth basic authentication
 */

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
 router.use("/screenshot", authentication);
 router.get("/screenshot", screenshotr);


/**
 * HTTP Parameters :
 * url - url of the page to convert
 * scale - opt. Scale of the webpage rendering. Defaults to 1. Scale amount must be between 0.1 and 2.
 * printBackground - opt. Print background graphics. Defaults to false.
 * landscape - Paper orientation. Defaults to false.
 * format - opt. Paper format. Defaults to 'A4'.
 * pageRanges - Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
 */
router.use("/pdf", authentication);
router.get("/pdf", pdfr);

app.use('/', router)
app.listen(3000);
