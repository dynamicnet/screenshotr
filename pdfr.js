'use strict'

import browser from './browser.js'

const default_parameters = {
    url: "",
    username: null,
    password: null,
    scale: 1,
    printBackground: false,
    landscape: false,
    format: "A4",
    delay: 0,
    pageRanges: "",
    headerTemplate: "",
    footerTemplate: "",
    displayHeaderFooter: false,
    margin: null,
};

/**
 * Read parameters passed in the request and merge them with the default values
 */
function readParameters(req){
    var request_parameters = {};

    var page_formats = ["Letter", "Legal", "Tabloid","Ledger","A0","A1","A2","A3","A4","A5","A6"];

    if (req.query.url && "" != req.query.url) {
        request_parameters.url = req.query.url;
    }

    if (req.query.username && null != req.query.username) {
        request_parameters.username = req.query.username;
    }

    if (req.query.password && null != req.query.password) {
        request_parameters.password = req.query.password;
    }

    if (req.query.scale && !isNaN(parseFloat(req.query.scale))) {
        request_parameters.scale = parseFloat(req.query.scale);
    }

    if (req.query.printBackground && 1 === parseInt(req.query.printBackground)) {
         request_parameters.printBackground = true;
    }

    if (req.query.landscape && 1 == parseInt(req.query.landscape)) {
        request_parameters.landscape = true;
    }

    if (req.query.format && page_formats.indexOf(req.query.format) > -1) {
        request_parameters.format = req.query.format;
    }

    if (req.query.delay && parseInt(req.query.delay) > 0) {
        request_parameters.delay = parseInt(req.query.delay);
    }

    if (req.query.pageRanges && "" != req.query.pageRanges) {
        request_parameters.pageRanges = req.query.pageRanges;
    }

    if (req.query.headerTemplate && "" != req.query.headerTemplate) {
        request_parameters.headerTemplate = req.query.headerTemplate;
    }

    if (req.query.footerTemplate && "" != req.query.footerTemplate) {
        request_parameters.footerTemplate = req.query.footerTemplate;
    }

    if (request_parameters.headerTemplate || request_parameters.footerTemplate) {
        request_parameters.displayHeaderFooter = true;
    }

    if (req.query.margin) {
        request_parameters.margin = {}

        if (req.query.margin.top) {
            request_parameters.margin.top = req.query.margin.top
        }

        if (req.query.margin.bottom) {
            request_parameters.margin.bottom = req.query.margin.bottom
        }

        if (req.query.margin.left) {
            request_parameters.margin.left = req.query.margin.left
        }

        if (req.query.margin.right) {
            request_parameters.margin.right = req.query.margin.right
        }
    }

    return Object.assign({}, default_parameters, request_parameters);
}

async function makePdf( params, page ){
    console.log("Converting " + params.url);
    console.log("Options: ", params);

    if (null != params.username && null != params.password) {
        await page.authenticate({
            username: params.username,
            password: params.password
        });
    }

    await page.goto(params.url, {waitUntil: "networkidle2"});
    if( params.delay > 0 ){
        await page.waitFor(params.delay);
    }

    return page.pdf(params);
}

async function outputPdf(pdf, response){
    response.set('Content-Type', 'application/pdf');
    return response.send(pdf);
}


async function convertToPdf(request, response) {
	let page

	try {
		const params = readParameters(request)
		page = await browser()
		const pdf = await makePdf(params, page)

		return outputPdf(pdf, response)
	} catch (error) {
		console.log(error)
		return
	} finally {
		await page.close()
	}
}


export {
	convertToPdf as default,
}
