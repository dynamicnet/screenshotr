import { Cluster } from "puppeteer-cluster";

let cluster = false;

async function getcluster() {
	if (!cluster) {
		const ignoreHTTPSErrors = process.env.IGNORE_HTTPS_ERRORS || false;

		cluster = Cluster.launch({
			concurrency: Cluster.CONCURRENCY_CONTEXT,
			maxConcurrency: 5,
			puppeteerOptions: {
				headless: "shell",
				ignoreHTTPSErrors: ignoreHTTPSErrors,
				devtools: false,
				args: [
					"--no-sandbox",
					"--disable-setuid-sandbox",
					"--disable-gpu",
				],
			},
		});
	}

    return cluster;
}

export { getcluster as default };
