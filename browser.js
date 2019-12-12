'use strict'

const puppeteer = require('puppeteer');

let browser = false;

/**
 * Get a new page from a singleton browser instance
 */
async function getBrowserPage() {
    if (!browser) {
        browser = await puppeteer.launch({
            devtools: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
    }

    let page = await browser.newPage();

    return page;
}


module.exports = getBrowserPage;