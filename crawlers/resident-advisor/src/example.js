import { Dataset, PlaywrightCrawler } from 'crawlee';
import { URLS } from '../lib/constants.js';

// Create an instance of the PlaywrightCrawler class - a crawler
// that automatically loads the URLs in headless Chrome / Playwright.
const crawler = new PlaywrightCrawler({
  launchContext: {
    // Here you can set options that are passed to the playwright .launch() function.
    launchOptions: {
      headless: true,
    },
  },

  // Stop crawling after several pages
  maxRequestsPerCrawl: 50,

  async requestHandler({ request, page, enqueueLinks, log }) {
    log.info(`Processing ${request.url}...`);

    const narrow_data = await page.locator('[data-tracking-id="events-all"] > * .grid:above([data-testid="sticky"] > li')
    const filter_data = narrow_data.querySelectorAll("adSlot")

    if(filter_data.length > 1) {
      filter_data.forEach((ad) => {
        narrow_data.removeChild(ad)
      })
    }

    console.log({narrow_data})


    
    // await page.$$eval('.athing', ($posts) => {
    //   const scrapedData = [];


    //   // We're getting the title, rank and URL of each post on Hacker News.
    //   $posts.forEach(($post) => {
    //     scrapedData.push({
    //       title: $post.querySelector('.title a').innerText,
    //       rank: $post.querySelector('.rank').innerText,
    //       href: $post.querySelector('.title a').href,
    //     });
    //   });

    //   return scrapedData;
    // });

    // Store the results to the default dataset.
    // await Dataset.pushData(data);

    // Find a link to the next page and enqueue it if it exists.
    // const infos = await enqueueLinks({
    //   selector: '.morelink',
    // });

    // if (infos.processedRequests.length === 0) log.info(`${request.url} is the last page!`);
  },

  // This function is called if the page processing failed more than maxRequestRetries+1 times.
  failedRequestHandler({ request, log }) {
    session.retire()
    log.info(`Request ${request.url} failed too many times.`);
  },
});

// await crawler.addRequests(['https://news.ycombinator.com/']);

// Run the crawler and wait for it to finish.
await crawler.run(URLS);

console.log('Crawler finished.');