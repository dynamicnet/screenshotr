'use strict'

import puppeteer from 'puppeteer'

let browser = false;

/**
 * Get a new page from a singleton browser instance
 */
async function getBrowserPage() {
    if (!browser) {
        const ignoreHTTPSErrors = process.env.IGNORE_HTTPS_ERRORS || false;

        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: ignoreHTTPSErrors,
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

export {
	getBrowserPage as default,
}
