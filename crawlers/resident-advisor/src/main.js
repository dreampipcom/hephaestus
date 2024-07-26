// For more information, see https://crawlee.dev/
import { Dataset, PlaywrightCrawler, ProxyConfiguration, log } from 'crawlee';
import { router } from './routes.js';
import { URLS, VENUES_FILTER } from '../lib/constants.js';
import { RAScraper } from './script.js';
import _ from 'lodash';
import { params } from './params.cjs';
import { run } from './generateLinks.cjs';

const cities = params?.city ? [params.city] : Object.keys(URLS)



const lookAhead = 8


// URLS[city].flatMap((agenda) => {
//     _.times(lookAhead, (index) => {
//         var ms = new Date().getTime() + (86400000 * index);
//         var next = new Date(ms);
//         const day = next.getDate()
//         const month = next.getMonth() + 1
//         const year = next.getFullYear()
//         startUrls.push(agenda + `?startDate=${month}-${day}-${year}`)
//     })
// });


for (const city of cities) {
    const startUrls = []
    const dataset = await Dataset.open(city)

    _.times(lookAhead, (index) => {
        var ms = new Date().getTime() + (86400000 * index);
        var next = new Date(ms);
        const day = next.getDate()
        const month = next.getMonth() + 1
        const year = next.getFullYear()
        startUrls.push(URLS[city] + `?page=${index}`)
    })

    console.log(`going to crawl ${city} for ${lookAhead} days: `, { startUrls })

    const crawler = new PlaywrightCrawler({
        maxRequestRetries: 10,
        proxyConfiguration: new ProxyConfiguration({
            proxyUrls: [
                process.env.CRAWLER_PROXY,
                process.env.CRAWLER_PROXY,
                process.env.CRAWLER_PROXY,
                process.env.CRAWLER_PROXY
            ]
        }),
        headless: false,
        maxConcurrency: 3,
        async requestHandler({ page, request, enqueueLinks }) {
            const document = await page.evaluateHandle('document')

            const state = {
                currentDay: "",
                currentData: [],
                toParse: [],
                parsed: [],
                venues: VENUES_FILTER[city],
                filteredEvents: [],
            }

            function sleep(time) {
                return new Promise((resolve) => setTimeout(resolve, time));
            }

            async function loadAllCurrentDay() {
                const current = await getCurrentDay()

                while (await state.currentDay === current) {
                    await getNextPage()
                    await getCurrentDay()
                }

                const narrow_data = await page.locator('[data-tracking-id="events-all"] > div > div > .grid > li:first-of-type > div:not(.adSlot)').all()
                state.currentData = narrow_data[0]


                return true
            }

            async function navigateToEachEvent() {
                state.filteredEvents.forEach((url, index) => {
                    if (index === 0) {
                        window.open(url)
                        console.log("opened event")
                        loadEventMeta()
                    }
                })
            }

            async function getNextPage() {
                const next = await page.locator('[href="/pro/event/create"] >> nth=1')
                console.log({ next })
                next.scrollIntoViewIfNeeded({ timeout: 5000 })
                return await sleep(2500)
            }


            async function getCurrentDay() {
                console.log("loading current day")
                const narrow_data = await page.locator('[data-tracking-id="events-all"] > div > div > .grid > li:first-of-type > div:not(.adSlot)').all()
                const latest_day = narrow_data.length - 1
                const day = await narrow_data[latest_day].locator('[data-testid="sticky"]').innerText()
                state.currentDay = day
                console.log("day is ", day)
                return day
            }

            async function loadEventMeta() {
                const title = await (await page.locator('h1')).innerText()
                const meta = await page.locator('[data-tracking-id="event-detail-bar"] > * .grid ')
                const venue = { name: await meta.locator('li:first-of-type > * a').innerText(), address: await meta.locator('li:first-of-type > * ul').innerText() }
                const datetime = {
                    date: await meta.locator('li:nth-of-type(2) > div > div:nth-of-type(2) > a').innerText(),
                    start_time: await meta.locator('li:nth-of-type(2) > div > div:nth-of-type(2) > div').locator('span:first-of-type').innerText(),
                    end_time: await meta.locator('li:nth-of-type(2) > div > div:nth-of-type(2) > div').locator('span:nth-of-type(3)').innerText(),
                }
                const artists_links = await page.locator('section > div > section:first-of-type > * li:nth-of-type(1) > * a').allInnerTexts()
                const genres_links = await page.locator('section > div > section:nth-of-type(2) > * li:nth-of-type(1) > * a').allInnerTexts()
                const artists = artists_links.join(', ')
                const genres = genres_links.map((genre) => genre.toLowerCase()).join(', ')
                const final = { title, venue, datetime, artists, url: request.loadedUrl, genres }
                console.log("loaded event")
                return final
            }

            async function filterCurrentDayEvents() {
                const events = await state.currentData.locator('.grid').all()
                const toParse = _.difference(events, state.parsed)
                let count = 0
                let length = toParse.length
                for (let i = 0; i < length; i++) {
                    const event = toParse[i]
                    const event_located = await event.locator('li:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > * span')
                    const event_array = await event_located?.allInnerTexts()
                    const event_venue = event_array[0]
                    console.log({ event_venue, event_array })
                    if (state.venues && event_venue && (state.venues.includes(event_venue) || state.venues.some((venue) => event_venue.includes(venue)))) {
                        console.log("includes selected venue event", event_venue)
                        const url = await event.locator('a >> nth=1').getAttribute('href')
                        console.log("url is", { url })
                        state.filteredEvents.push(url)
                    } else if (!state.venues && event_venue) {
                        const url = await event.locator('a >> nth=1').getAttribute('href')
                        console.log("url is", { url })
                        state.filteredEvents.push(url)
                    }
                    count++
                }
                state.parsed = [...state.parsed, ...events]
                console.log(" finished filtering ")
                return state.filteredEvents
            }

            async function start() {
                await loadAllCurrentDay()
                return await filterCurrentDayEvents()
            }

            const title = await page.title();
            console.log("starting to parse", title)
            log.info(`${title}`, { url: request.loadedUrl });

            let urls = []
            if (request.loadedUrl.match(/events\/[0-9]/)) {
                const data = await loadEventMeta()

                await dataset.pushData(data);
            } else {
                urls = await start(page)
                console.log({ urls })
                if (urls.length) {
                    log.info(`enqueueing new URLs`);
                    await enqueueLinks({
                        globs: ['http?(s)://ra.co/events/*'],
                        transformRequestFunction(req) {
                            // ignore all links ending with `.pdf`
                            const should = state.filteredEvents.some((dest) => {
                                return req.url.includes(dest)
                            })
                            if (should) {
                                return req;
                            }
                            //console.log("IGNORE", { req: req.url})
                            return false;
                        },
                    });
                }
            }
        },
    });

    await crawler.run(startUrls);
    console.log({ dataset })
    await dataset.exportToJSON(`${city}`);

    await run(city)
}

