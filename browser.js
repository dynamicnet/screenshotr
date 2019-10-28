'use strict'

const puppeteer = require('puppeteer');

let browser = false;

/**
 * Get a new page from a singleton browser instance
 */
async function getBrowserPage() {
    if (!browser) {
        browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
    }

    return browser.newPage();
}


module.exports = getBrowserPage;