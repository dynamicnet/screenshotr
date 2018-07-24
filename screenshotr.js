#!/usr/local/bin/node


const puppeteer = require('puppeteer');
const express = require('express');
const sharp = require('sharp');
const app = express();

var browser = false;

/**
 * Get a singleton browser instance
 */
async function getBrowser(){
    if( ! browser ){
        browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
    }

    return browser;
}

/**
 * Gets viewport width/height according to the default value
 * and parameters passed with the query
 */
function getViewportDimensions( req ){
    var dim = { width: 1024, height: 768 };

    if (req.query.vp_width && !isNaN(parseInt(req.query.vp_width))){
        dim.width = parseInt(req.query.vp_width);
    }

    if (req.query.vp_height && !isNaN(parseInt(req.query.vp_height))) {
        dim.height = parseInt(req.query.vp_height);
    }

    return dim;
}

/**
 * Get the requested width of the output image
 */
function getOutputWidth(req) {
    if (req.query.o_width && !isNaN(parseInt(req.query.o_width))) {
        return parseInt(req.query.o_width);
    }

    return null;
}

/**
 * Get the requested height of the output image
 */
function getOutputHeight(req) {
    if (req.query.o_height && !isNaN(parseInt(req.query.o_height))) {
        return parseInt(req.query.o_height);
    }

    return null;
}

/**
 * Read the fullpage request parameter and return true or false
 */
function getFullPageOption(req){
    return req.query.fullpage ? true : false;
}

async function takeScreenshot(req, res){
    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.setViewport(getViewportDimensions(req) );

    await page.goto(req.query.url).catch((error)=>console.log(error));


    var elt;
    if (req.query.dom_element_selector && "" != req.query.dom_element_selector ){
        elt = await page.$(req.query.dom_element_selector);

        if( ! elt ){
            return res.status(503).send("Invalid dom_element_selector, no DOM element matched");
        }

    } else {
        elt = page;
    }


    var img = await elt.screenshot({
        fullPage: getFullPageOption(req)
    });
    img = sharp(img);

    if( getOutputWidth(req) || getOutputHeight(req) ){
        img = await img.resize(getOutputWidth(req), getOutputHeight(req));
    }

    await page.close();

    res.set('Content-Type', 'image/png');
    return res.send(await img.toFormat("png").toBuffer());
}


/**
 * Parameters
 * url - url of the page to screenshot
 * vp_width - opt. set the viewport width in pixel (default: 1024px)
 * vp_height - opt. set the viewport height in pixel (default: 768px)
 * o_width - opt. set the width of the returned image (default: same as viewport width)
 * o_height - opt. set the height of the returned image (default: same as viewport height)
 * dom_element_selector - opt. the CSS selector of the element you want to screenshot, if you don't want the entire body
 * fullpage - opt. parameter must be present if you want a fullpage screenshot (not only the visible viewport part)
 */
app.get("/screenshot", takeScreenshot);

app.listen(3000);
