
export class RAScraper {
  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  constructor() {
    this.currentDay = ""
    this.currentData = []
    this.venues = ['Kater Blau', '://about blank', 'Berghain | Panorama Bar | Säule']
    this.filteredEvents = []
    this.finalData = {
      'berlin': {
        events: []
      }
    }
  }
   
  async getNextPage() {
    const next = document.querySelectorAll('[href="/pro/event/create"]')[1]
    next.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
    return await this.sleep(2000)
  }

  async loadAllCurrentDay() {
    const current = await this.getCurrentDay()

    console.log({ current, store: this.currentDay })

    while (await this.currentDay === current) {
      await this.getNextPage()
      await this.getCurrentDay()
    } 

    return true
  }

  async getCurrentDay() {
    console.log("loading current day")
    const narrow_data = document.querySelectorAll('[data-tracking-id="events-all"] > div > div > .grid > li:first-of-type > div:not(.adSlot)')
    const latest_day = narrow_data.length - 1
    const day = narrow_data[latest_day].querySelector('[data-testid="sticky"]')
    this.currentDay = day.innerText
    this.currentData = narrow_data[latest_day]
    console.log("day is ", day.innerText)
    return day.innerText
  }

  async filterCurrentDayEvents() {
    const events = this.currentData.querySelectorAll('.grid')

    events.forEach((event) => {
      const event_venue = event.querySelector('li:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > a')?.innerText
      if (event_venue && this.venues.includes(event_venue)) {
        console.log("includes selected venue event")
        const url = event.querySelector('a').getAttribute('href')
        this.filteredEvents.push(url)
      }
    })
  }

  async navigateToEachEvent() {
    this.filteredEvents.forEach((url, index) => {
      if (index === 0) {
        window.open(url)
        console.log("opened event")
        this.loadEventMeta()
      }
    })
  }

  loadEventMeta() {
    const title = document.querySelector('h1').innerText
    const date = this.currentDay.replace('/', '')
    const meta = document.querySelector('[data-tracking-id="event-detail-bar"] > * .grid ')
    const venue = { name: meta.querySelector('li:first-of-type > * a').innerText , address: meta.querySelector('li:first-of-type > * ul').innerText }
    const datetime = { start_time: meta.querySelector('li:nth-of-type(2) > div > div:nth-of-type(2) > div').querySelector('span:first-of-type').innerText, end_time: meta.querySelector('li:nth-of-type(2) > div > div:nth-of-type(2) > div').querySelector('span:nth-of-type(3)').innerText}
    const final = { date, title, venue, datetime, url: window.location.url }
    this.finalData.berlin.events.push(final)
    console.log("loaded event")
    return final
  }

  async start() {
    await this.loadAllCurrentDay()
    await this.filterCurrentDayEvents()
    await this.navigateToEachEvent()
  }
}
