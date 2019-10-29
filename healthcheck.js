'use strict'

const browser = require('./browser');


async function healthcheck(request, response) {

    try {
        var page = await browser();
        // Attempt to load the probe page in Chrome
        await page.goto( 'http://localhost:3000/probe');
        var probe_str = await page.$eval("body", elt => elt.innerHTML);
    } catch (e) {
        response.status(500).send('Something is broken ! (Exception during probe loading)');
        return;
    }

    if( "Probe OK" != probe_str ){
        response.status(500).send('Something is broken ! (Invalid probe value)');
        return;
    }

    response.status(200).send('OK ('+probe_str+')');
}

module.exports = healthcheck;