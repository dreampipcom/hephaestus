const fs = require('fs').promises;
const path = require('path');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');


const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents() {
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


  // return authClient.credentials

  // const app = await auth.getApplicationDefault()
  // const token = await auth.getAccessToken()
  // const creds = await auth.fromJSON('/Users/angeloreale/purizu/purizumobile-secrets/crawlers/resident-advisor/src/credentials.json')

  console.log({ auth, client, authClient })
  // const calendar = google.calendar({version: 'v3', client});
  // const res = await calendar.events.list({
  //   calendarId: 'primary',
  //   timeMin: new Date().toISOString(),
  //   maxResults: 10,
  //   singleEvents: true,
  //   orderBy: 'startTime',
  // });
  // const events = res.data.items;
  // if (!events || events.length === 0) {
  //   console.log('No upcoming events found.');
  //   return;
  // }
  // console.log('Upcoming 10 events:');
  // events.map((event, i) => {
  //   const start = event.start.dateTime || event.start.date;
  //   console.log(`${start} - ${event.summary}`);
  // });
}

try {
listEvents();
} catch (e)  {
console.log({ e })
}
