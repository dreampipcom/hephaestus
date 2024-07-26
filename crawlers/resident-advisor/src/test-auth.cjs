const {google} = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: `${CRAWLER_KEYFILE}`,
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
});