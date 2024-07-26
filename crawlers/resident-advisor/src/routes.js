import { createPlaywrightRouter } from 'crawlee';
import { RAScraper } from './script.js';

export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ enqueueLinks, log, page, request }) => {
    log.info(`enqueueing new URLs`);

    const title = await page.title();
    console.log("starting to parse", title)
    log.info(`${title}`, { url: request.loadedUrl });

    const sc = new RAScraper

    const urls = await sc.start(page)
    await enqueueLinks({
        label: 'detail',
    });
});

router.addHandler('detail', async ({ request, page, log, pushData }) => {
    const title = await page.title();
    console.log("starting to parse", title)
    log.info(`${title}`, { url: request.loadedUrl });

    const sc = new RAScraper

    const meta = await sc.loadEventMeta(page)
    await pushData(meta);
});
