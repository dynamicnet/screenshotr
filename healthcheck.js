'use strict'

import cluster from './cluster.js'

async function makeProbe({page, data, worker}) {
	console.log(`healthcheck using worker ${worker.id}`);
	// Attempt to load the probe page in Chrome
	await page.goto( 'http://localhost:3000/probe');
	return await page.$eval("body", elt => elt.innerHTML);
}

async function healthcheck(request, response) {
    try {
        const c = await cluster();
		const probe_str = await c.execute({}, makeProbe)

		if ("Probe OK" != probe_str) {
			response.status(500).send('Something is broken ! (Invalid probe value)');
			return;
		}

    	response.status(200).send(`OK (${probe_str})`);
    } catch (e) {
        response.status(500).send('Something is broken ! (Exception during probe loading)');
        return;
    }
}

export {
	healthcheck as default,
}
