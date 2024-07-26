// send-push.js
const fetch = require('node-fetch-commonjs')
const payload = require('./push/next-notification')
const argv = require('minimist')(process.argv.slice(2));
const apiKey = process.env.PUSH_APIKEY
const secret = process.env.PUSH_SECRET
const endpoint = `${process.env.PUSH_GETURI}?secret=${secret}&project=purizu`
const discord = `${process.env.PUSH_DISCORDURI}`
const DURATION = 4
const expiry = new Date(Date.now() + DURATION * (60 * 60 * 1000) ).getTime()?.toString();
const expiryUrl = 'https://www.dreampip.com'
const url = ''

const skipDiscord = argv?.skipD === "1" || false
const skipApp = argv?.skipA === "1" || false
const data = { 
  url: url || "", 
  expiry: expiry || new Date(argv?.expiry || new Date().toISOString())?.getTime()?.toString(), 
  expiryUrl: expiryUrl || argv?.expiryUrl || argv?.url || 'https://www.dreampip.com' 
}


// const body = payload.body
// const title = payload.title

const title = {
  en: argv?.title_en || "🌐 Tune in.",
  it: argv?.title_it || "🌐 Sintonizzati.",
  pt: argv?.title_pt || "🌐 Sintonize-se.",
  es: argv?.title_es || "🌐 Sintoniza.",
  de: argv?.title_de || "🌐 Einschalten.",
  fr: argv?.title_fr || "🌐 S'accorder.",
  ro: argv?.title_ro || "🌐 Conectați-vă.",
  pl: argv?.title_pl || "🌐 Strojenie.",
  cs: argv?.title_cs || "🌐 Naladit.",
  sv: argv?.title_sv || "🌐 Stäm in.",
  et: argv?.title_et || "🌐 Häälestu.",
  ja: argv?.title_ja || "🌐 チューニングイン.",
  ru: argv?.title_ru || "🌐 チューニングイン."
}
const body = {
  en: argv?.body_en || "Welcome Angelo Reale, live now for Reale Listening Session (live from Salvador, Bahia)",
  it: argv?.body_it || "Benvenuto Angelo Reale, ora in diretta per la Reale Listening Session (live from Salvador, Bahia)",
  pt: argv?.body_pt || "Bem-vindo Angelo Reale, ao vivo agora para a Reale Listening Session (live from Salvador, Bahia)",
  es: argv?.body_es || "Bienvenido Angelo Reale, en vivo ahora para Reale Listening Session (live from Salvador, Bahia)",
  de: argv?.body_de || "Willkommen Angelo Reale, jetzt live für Reale Listening Session (live from Salvador, Bahia)'",
  fr: argv?.body_fr || "Bienvenue Angelo Reale, en direct maintenant pour la Reale Listening Session (live from Salvador, Bahia)",
  ro: argv?.body_ro || "Bine ai venit Angelo Reale, acum în direct pentru Reale Listening Session (live from Salvador, Bahia)",
  pl: argv?.body_pl || "Witaj Angelo Reale, na żywo teraz dla Reale Listening Session (live from Salvador, Bahia)",
  cs: argv?.body_cs || "Vítejte Angelo Reale, nyní naživo pro Reale Listening Session (live from Salvador, Bahia)",
  sv: argv?.body_sv || "Välkommen Angelo Reale, live nu för Reale Listening Session (live from Salvador, Bahia)",
  et: argv?.body_et || "Tere tulemast Angelo Reale, otseülekanne nüüd Reale Listening Session (live from Salvador, Bahia)",
  ja: argv?.body_ja || "ようこそAngelo Reale、Reale Listening Session (live from Salvador, Bahia)",
  ru: argv?.body_ru || "ようこそAngelo Reale、Reale Listening Session (live from Salvador, Bahia)" /* to-do */
}

// const title = {
//   en: argv?.title_en || "🌐 Tune in.",
//   it: argv?.title_it || "🌐 Sintonizzati.",
//   pt: argv?.title_pt || "🌐 Sintonize-se.",
//   es: argv?.title_es || "🌐 Sintoniza.",
//   de: argv?.title_de || "🌐 Einschalten.",
//   fr: argv?.title_fr || "🌐 S'accorder.",
//   ro: argv?.title_ro || "🌐 Conectați-vă.",
//   pl: argv?.title_pl || "🌐 Strojenie.",
//   cs: argv?.title_cs || "🌐 Naladit.",
//   sv: argv?.title_sv || "🌐 Stäm in.",
//   et: argv?.title_et || "🌐 Häälestu.",
//   ja: argv?.title_ja || "🌐 チューニングイン."
// }
// const body = {
//   en: argv?.body_en || "Ooops. We're under maintenance. Meanwhile, dream, vibe, ...pip!",
//   it: argv?.body_it || "Ops. Siamo in manutenzione. Nel frattempo, sogna, vibra, ...pip!",
//   pt: argv?.body_pt || "Ops. Estamos em manutenção. Enquanto isso, sonhe, vibre, ...pip!,",
//   es: argv?.body_es || "Ups. Estamos en mantenimiento. Mientras tanto, sueña, vibra, ...pip!",
//   de: argv?.body_de || "Hoppla. Wir sind in Wartung. In der Zwischenzeit träume, vibriere, ...pip!",
//   fr: argv?.body_fr || "Oups. Nous sommes en maintenance. Pendant ce temps, rêve, vibre, ...pip!",
//   ro: argv?.body_ro || "Ups. Suntem în întreținere. Între timp, visează, simte vibrațiile, ...pip!",
//   pl: argv?.body_pl || "Ups. Pracujemy nad konserwacją. Tymczasem śnij, czuj, ...pip!",
//   cs: argv?.body_cs || "Ups. Jsme ve stavu údržby. Mezitím sni, vibruj, ...pip!",
//   sv: argv?.body_sv || "Hoppsan. Vi är under underhåll. Under tiden, dröm, känn, ...pip!",
//   et: argv?.body_et || "THoopis. Oleme hoolduses. Seniks unista, tunneta vibratsiooni, ...pip!",
//   ja: argv?.body_ja || "おっと。メンテナンス中です。その間に、夢見て、ビブラートして、...pip!",
// }




// confirmation
console.log({ title, body })

const sendPushNotification = async (expoPushToken, locale) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title[locale] || title['en'],
    body: body[locale] || body['en'],
    data
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

const getKeys = async () => {
  const settings = { 
    method: "GET",
    headers: {
      'api-key': apiKey
    }
  }
  const res = await fetch(endpoint, settings)

  if (res.ok) {
    const data = await res.json()
    console.log({ data })
    return data
  }
  return []
}

const sendNotifications = async () => {
  console.log("(!!!!!! NOT A TEST !!!!!) SENDING IN 5" )
  await sleep(5000)
  // app
  if(!skipApp) {
    const source = await getKeys()
    const languages = source.language
    console.log({source})

    //country specific
    //const locales = source.locales

    let counter = 0
    const sentMap = []
    for (const language in languages) {
      for (const token of languages[language]) {
        sentMap.push(token)
        console.log("(!!!!!! NOT A TEST !!!!!) SENDING ", counter, language )
        await sendPushNotification(token, language)
        counter = counter + 1
      }
    }
    for (const token of source.store) {
      if(sentMap.includes(token)) {
        console.log("?SKIPPING ALREADY SENT? " )
      } else {
        console.log("(!!!!!! NOT A TEST !!!!!) SENDING ENGLISH", counter )
        await sendPushNotification(token, 'en')
        counter = counter + 1
      }
    }
  }

  // discord
  if (!skipDiscord) {
    console.log("SENDING DISCORD")
    const discordContent =  {
      content: body['en'] + `\n${data.expiryUrl || data.url}`
    }
  
    await fetch(discord, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordContent),
    });
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

sendNotifications()