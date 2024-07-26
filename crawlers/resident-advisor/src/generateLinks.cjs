
const moment = require('moment');
const { exec } = require('node:child_process');
const fs = require('node:fs');
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const { params } = require('./params.cjs');
const momentTZ = require('moment-timezone')

const G_API = process.env.CRAWLER_CALKEY
// const open = require('open')
const DOW = {
  'Sun': 0,
  'Mon': 1,
  'Tue': 2,
  'Wed': 3,
  'Thu': 4,
  'Fri': 5,
  'Sat': 6
}



// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const CALENDARS = {
  'bologna': 'c_390f4175b89d2f6534a4798bb7db387ae80cde55cbb3b255fc181aea4e7c1ede@group.calendar.google.com',
  'milan': 'c_2626fbe9688611a6294283a3ad8163e93440db0c6599399c2be13cd6cc2caf9f@group.calendar.google.com',
  'rome': 'c_b714326e03498a801ab208754c4a518634ee98d3ea370d59a292cdc19a532c6b@group.calendar.google.com',
  'salvador': 'c_1653126482bad6fd45f7ace580b7e6058b37ed49fd9710067a583ec2d5482fed@group.calendar.google.com',
  'barcelona': 'c_adbb03c19583700a51dc075b9bb02c4a1b137945cd4d6ccb6fd60febd5295c13@group.calendar.google.com',
  'montevideo': 'c_168780246217c52a89aa2bea8bd3d654cee54cb229e9aa92f3b97fb62f1fa17b@group.calendar.google.com',
  'buenos-aires': 'c_1e6a740267d14851831ba137f778df8a9b4aeb120d26e9d011a69c75e21c0357@group.calendar.google.com',
  'sao-paulo': 'c_73304054c53f9106835e0ab95ed58b36b01e235e4ab55c45c0722e0713216ed7@group.calendar.google.com',
  'rio-de-janeiro': 'c_ea16535c91b9963827d93e0f06eb749658baf92d00d46d0aeb01951378428ed8@group.calendar.google.com',
  'new-york': 'c_a637f59d05fa6568bde74480ea6860c88631526f4508064f427e6adf3e8f6631@group.calendar.google.com',
  'los-angeles': 'c_2a1b5af48c5951c3df431da51b1a0534dba4306dd51d943f09c86f347f080158@group.calendar.google.com',
  'london': 'c_1d0f44f81f56d2723e049a1785244a4173c2aabc118d0f3e5b235717691fbf5d@group.calendar.google.com',
  'amsterdam': 'c_14349a6b6e0acd2f79570c50ac442cb6032a462445b98b168635f5cd320433ca@group.calendar.google.com',
  'berlin': 'c_d1882ca957c5c1440e5e480a471688147d61ae201d4f6f33a4c38fcb53aea1f1@group.calendar.google.com',
  'paris': 'c_b3385207013b04cfc0ae34e50b505c914148265728d7982fded0d90675b3cf15@group.calendar.google.com',
  'madrid': 'c_68c55b257aa095bac71c2bf9c8ff8dd88f018d0a53ba4f7b571571275302811f@group.calendar.google.com',
  'lisbon': 'c_f22c7d2798178f0b62acd4189a29ad8fde25787728cf21aa0390405640b7cbc0@group.calendar.google.com',
  //
  'brussels': 'c_a5d4b433b7b9d6997b77133051dd8e97446b5157e580ac98b15c26816bcb0898@group.calendar.google.com',
  'helsinki': 'c_97c3b463b04446654fd96f3eef98d318022e8e8c0b13ffd3c54ef220a133ceba@group.calendar.google.com',
  //'stockholm': '',
  'vienna': 'c_39edc97e2b88be33d0ff2e42a21af8ff2b7aa1a4b79eb65949a728ce547a35c4@group.calendar.google.com',
  'malmo': 'c_5064c388faf3b0183786827537f14fdf94fa907a8a6bac47069513be1ac4fc9a@group.calendar.google.com',
  'copenhagen': 'c_cd096954275d59720078525adb50167b6adb7a918ca4bfac34b4574a0c053515@group.calendar.google.com',
  'tallinn': 'c_9cbb34731ee29ffb9c1152a1303f6977679263db8737faae63cfd426e4ac875a@group.calendar.google.com',
  'kassel': 'c_765963438176df3d9db23847dc501f296b2aebc8f19fa7d6bb9c812c76f989e2@group.calendar.google.com',
  'warsaw': 'c_d724e7dfd96d89bad9858821c4770505fd958e2dec81ff372e916c7a1046c096@group.calendar.google.com',
  'bucharest': 'c_f37dd84d83429526a1d27398a2251a9b4d5a2ab48d4e346b4f7fdfefefbeea04@group.calendar.google.com',
  'prague': 'c_64afab174aef19f5da23d591e2264b3e239e0019d3fb07b5055661d02163b244@group.calendar.google.com',
  'zurich': 'c_a4623dd704257b21ca3bd959274f2966428e1feae2f09aeeaebac4bfb92d7d9f@group.calendar.google.com',
  'cape-town': 'c_2f67f1022a13c766ac81d3a2d993cb04605cde98462386ce5423cb57635de56c@group.calendar.google.com',
  //'tokyo': '',
  //'sydney': '',
  //'vilnius: '',
  //'riga': ''
}

const TIMEZONES = {
  'bologna': 'Europe/Rome',
  'milan': 'Europe/Rome',
  'rome': 'Europe/Rome',
  'salvador': 'America/Bahia',
  'barcelona': 'Europe/Madrid',
  'montevideo': 'America/Montevideo',
  'buenos-aires': 'America/Buenos_Aires',
  'sao-paulo': 'America/Sao_Paulo',
  'rio-de-janeiro': 'America/Sao_Paulo',
  'new-york': 'America/New_York',
  'los-angeles': 'America/Los_Angeles',
  'london': 'Europe/London',
  'amsterdam': 'Europe/Amsterdam',
  'berlin': 'Europe/Berlin',
  'paris': 'Europe/Paris',
  'madrid': 'Europe/Madrid',
  'lisbon': 'Europe/Lisbon',
  //
  'brussels': 'Europe/Brussels',
  'helsinki': 'Europe/Helsinki',
  //'stockholm': '',
  'vienna': 'Europe/Vienna',
  'malmo': 'Europe/Stockholm',
  'copenhagen': 'Europe/Copenhagen',
  'tallinn': 'Europe/Tallinn',
  'kassel': 'Europe/Berlin',
  'warsaw': 'Europe/Warsaw',
  'bucharest': 'Europe/Bucharest',
  'prague': 'Europe/Prague',
  'zurich': 'Europe/Zurich',
  'cape-town': 'Africa/Johannesburg',
  //'tokyo': '',
  //'sydney': '',
  //'vilnius: '',
  //'riga': ''
}


const MAP_CENTRES = {
  'bologna': {
    coordinates: [44.4950954609241, 11.342671827389358],
    zoom: 13,
    slug: 'bologna',
    city: 'Bologna'
  },
  'milan': {
    coordinates: [45.468964617372144, 9.185626132750581],
    zoom: 12,
    slug: 'milan',
    city: 'Milan'
  },
  'rome': {
    coordinates: [41.89155469633848, 12.489295340697346],
    zoom: 10,
    slug: 'rome',
    city: 'Rome'
  },
  'salvador': {
    coordinates: [-13.004604344148513, -38.508604693368525],
    zoom: 11,
    slug: 'salvador',
    city: 'Salvador'
  },
  //
  'barcelona': {
    coordinates: [41.406545280288164, 2.1748619972294425],
    zoom: 10,
    slug: 'barcelona',
    city: 'Barcelona'
  },
  'montevideo': {
    coordinates: [-34.87964393846871, -56.17967780626219],
    zoom: 11,
    slug: 'montevideo',
    city: 'Montevideo'
  },
  'buenos-aires': {
    coordinates: [-34.605404817586916, -58.44372023511807],
    zoom: 11,
    slug: 'buenos-aires',
    city: 'Buenos Aires'
  },
  'sao-paulo': {
    coordinates: [-23.539530638879445, -46.632974596201784],
    zoom: 9,
    slug: 'sao-paulo',
    city: 'São Paulo'
  },
  'rio-de-janeiro': {
    coordinates: [-22.896288364477716, -43.18010298590159],
    zoom: 9,
    slug: 'rio-de-janeiro',
    city: 'Rio de Janeiro'
  },
  'new-york': {
    coordinates: [40.78343167530586, -73.9649807684582],
    zoom: 9,
    slug: 'new-york',
    city: 'New York'
  },
  'los-angeles': {
    coordinates: [34.04280112429188, -118.27994380137976],
    zoom: 9,
    slug: 'los-angeles',
    city: 'Los Angeles'
  },
  'london': {
    coordinates: [51.49707494166325, -0.11830187408555738],
    zoom: 9,
    slug: 'london',
    city: 'London'
  },
  'amsterdam': {
    coordinates: [52.37300011627217, 4.89914502114092],
    zoom: 10,
    slug: 'amsterdam',
    city: 'Amsterdam'
  },
  'berlin': {
    coordinates: [52.51558001390169, 13.405471175511197],
    zoom: 10,
    slug: 'berlin',
    city: 'Berlin'
  },
  'paris': {
    coordinates: [48.85837373820162, 2.347719247553416],
    zoom: 10,
    slug: 'paris',
    city: 'Paris'
  },
  'madrid': {
    coordinates: [40.419543366570025, -3.6980869726309074],
    zoom: 10,
    slug: 'madrid',
    city: 'Madrid'
  },
  'lisbon': {
    coordinates: [38.72170956493803, -9.137077200346017],
    zoom: 11,
    slug: 'lisbon',
    city: 'Lisbon'
  },
  // 'brussels': {
  //   coordinates: [50.847942220069974, 4.359278621249498],
  //   zoom: 10,
  //   slug: 'brussels'
  // },
  // 'helsinki': {
  //   coordinates: [60.17060646408163, 24.9417479081061],
  //   zoom: 10,
  //   slug: 'helsinki'
  // },
  // 'stockholm': {
  //   coordinates: [59.3291904587081, 18.0747421483835],
  //   zoom: 10,
  //   slug: 'stockholm'
  // },
  // 'vienna': {
  //   coordinates: [48.205271439006324, 16.370205155676686],
  //   zoom: 11,
  //   slug: 'vienna'
  // },
  // 'malmo': {
  //   coordinates: [55.60429001203468, 13.002924043355616],
  //   zoom: 11,
  //   slug: 'malmo'
  // },
  // 'copenhagen': {
  //   coordinates: [55.67646697784446, 12.568415929865017],
  //   zoom: 11,
  //   slug: 'copenhagen'
  // },
  // 'tallinn': {
  //   coordinates: [59.43529132682876, 24.758830754731353],
  //   zoom: 11,
  //   slug: 'tallinn'
  // },
  // 'kassel': {
  //   coordinates: [51.31249663730745, 9.474345469392675],
  //   zoom: 11,
  //   slug: 'kassel'
  // },
  // 'warsaw': {
  //   coordinates: [52.2286176198592, 21.01380667963312],
  //   zoom: 11,
  //   slug: 'warsaw'
  // },
  // 'bucharest': {
  //   coordinates: [44.427254325634394, 26.10012813246689],
  //   zoom: 11,
  //   slug: 'bucharest'
  // },
  // 'prague': {
  //   coordinates: [50.075419900329166, 14.432655632695203],
  //   zoom: 11,
  //   slug: 'prague'
  // },
  // 'zurich': {
  //   coordinates: [47.3784801240796, 8.520658940136343],
  //   zoom: 11,
  //   slug: 'zurich'
  // },
  // 'cape-town': {
  //   coordinates: [-33.91965737680834, 18.433543390603305],
  //   zoom: 11,
  //   slug: 'cape-town'
  // },
  //
  // 'tokyo': {
  //   coordinates: [35.77884404494747, 139.74709804249656],
  //   zoom: 11,
  //   slug: 'tokyo'
  // },
  // 'sydney': {
  //   coordinates: [-33.86377138104712, 51.21894962803245],
  //   zoom: 11,
  //   slug: 'sydney'
  // },
  // 'vilnius': {
  //   coordinates: [54.68549232478511, 25.279117815293635],
  //   zoom: 11,
  //   slug: 'vilnius'
  // },
  // 'riga': {
  //   coordinates: [56.96603489318597, 24.10777947553373],
  //   zoom: 11,
  //   slug: 'riga'
  // },
  'global': {
    coordinates: [0, 0],
    zoom: 7,
    slug: 'global',
    city: 'All cities'
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function fetchWithRetry(url, options = {}, retries = 10, retryDelay = 1000, parentUrl) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) { // if you want to retry on specific HTTP status codes

        console.log("error", response)
        throw new Error('Response was not ok');
      }

      return response; // or whatever you want to return
    } catch (error) {
      if (i < retries - 1) {  // if not the last retry attempt
        await delay(retryDelay * (i + 2 / 2)); // wait before next attempt
      } else {
        throw error;  // if the last retry attempt, throw the error
      }
    }
  }
}

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFileSync(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFileSync(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFileSync(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    const auth = new google.auth.GoogleAuth({
  keyFile: process.env.CRAWLER_KEYFILE,
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  projectId: process.env.CRAWLER_PROJECT,
  credentials: {
    'private_key': process.env.CRAWLER_SERVICEKEY,
    'client_email': process.env.CRAWLER_SERVICEEMAIL
  }
});
  const client = await auth.getClient();
  
  const authClient = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  if (authClient.credentials) {
    await saveCredentials(authClient);
  }
  return authClient;
}

function countDays(start, end) {
  let count = start
  let delta = 0
  while (count !== end) {
    console.log({ start, count, end, delta })
    count++
    if (count === 7) {
      count = 0
    }
    delta++
  }
  return delta
}

async function generate(auth, city) {
  const CITY = params?.city || city
  let rawdata = fs.readFileSync(`storage/key_value_stores/default/${CITY}.json`);
  let events = JSON.parse(rawdata);
  const timezoneString = TIMEZONES[CITY]

  for (const event of events) {
    const reg = /[^0-9:\n]+/g
    //console.log({ event, reg })
    const parsedStart = event.datetime.start_time.replace(reg, "")
    const concat = (event.datetime.date.split(', ')[1] || event.datetime.date.split(', ')[0]) + ' ' + parsedStart
    const tzStart = moment.tz(concat , "D MMM YYYY hh\:mm", timezoneString)
    const dateStart = tzStart.toDate()
    const parsedEnd = event.datetime.end_time.replace(reg, "")

    console.log({ tzStart, dateStart, concat, parsedStart})
    let dateEnd
    if (event.datetime.start_time.match(reg)) {
      const startDOW = event.datetime.start_time.split(' ')[0]
      const endDOW = event.datetime.end_time.split(' ')[0]

      const startIndex = DOW[startDOW]
      const endIndex = DOW[endDOW]

      const distance = countDays(startIndex, endIndex)

      console.log({ distance })

      dateEnd = tzStart.clone().add(distance, "days").set({ h: parsedEnd.split(':')[0], m: parsedEnd.split(':')[1]}).toDate()


    } else {
      if (Number(parsedEnd.split(':')[0]) < Number(parsedStart.split(':')[0])) {
        console.log("endstart")
        dateEnd = tzStart.clone().add(1, "day").set({ h: parsedEnd.split(':')[0], m: parsedEnd.split(':')[1]}).toDate()

      } else {
        dateEnd = tzStart.clone().set({ h: parsedEnd.split(':')[0], m: parsedEnd.split(':')[1]}).toDate()
      }
    }

    const formatedStart = moment(dateStart).format('YYYYMMDD\THHmm')
    const formatedEnd = moment(dateEnd).format('YYYYMMDD\THHmm')

    const gLink = `https://calendar.google.com/calendar/r/eventedit?`

    let res, latlng
    if(event?.venue?.address) {
      res = await fetchWithRetry(`https://maps.googleapis.com/maps/api/geocode/json?address=${event.venue.address}&key=${G_API}`)
      latlng = await res.json()
    }

    const cord = latlng?.results[0]?.geometry?.location || { lat: MAP_CENTRES[CITY].coordinates[0], lng: MAP_CENTRES[CITY].coordinates[1] }
    // const data = `text=${event.artists} - ${event.title}&details=${cord.lat}, ${cord.lng}<br />${event.url}&location=${event.venue.address}&dates=${formatedStart}/${formatedEnd}&ctz=${timezoneString}`
    // const url = new URL(gLink + data)
    // console.log({ url: url.href })

    const genres = event.genres.includes('update this') ? `electro` : event.genres

    const calendar = google.calendar({ version: 'v3', auth });

    const gEvent = {
      'summary': `[music, ${genres}] ${event.artists} - ${event.title}`,
      'location': event.venue.address || event.venue.name,
      'description': `${cord.lat}, ${cord.lng}<br />${event.url}`,
      'start': {
        'dateTime': dateStart,
        'timeZone': timezoneString
      },
      'end': {
        'dateTime': dateEnd,
        'timeZone': timezoneString
      },
      'reminders': {
        'useDefault': false,
        'overrides': [
          { 'method': 'email', 'minutes': 24 * 60 },
          { 'method': 'popup', 'minutes': 10 }
        ]
      }
    };

    console.log({ gEvent })

    const request = calendar.events.insert({
      auth,
      'calendarId': CALENDARS[CITY],
      'resource': gEvent
    }).then((res) => {
      console.log("EVENT CREATED")
    })

    await delay(500)
  }
}

const run = async (city) => {
  authorize().then((auth) => generate(auth, city)).catch(console.error)
}

run()

module.exports = {
  run
}