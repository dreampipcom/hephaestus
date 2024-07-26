const { configDotenv } = require("dotenv");
const fs = require('fs');
const OpenAi = require("openai");
const readline = require('readline');

ALL_TRANSLATION_LOCALES = ['it', 'pt', 'es', 'de', 'fr', 'ro', 'pl', 'cs', 'sv', 'et', 'ja']

const params = {
  locale: ALL_TRANSLATION_LOCALES,
  model: 'gpt-4o',
  chunkSize: 2,
  limit: 3500,
}

const body = {
  en: "We speak anything now, as well.",
  it: "",
  pt: "",
  es: "",
  de: "",
  fr: "",
  ro: "",
  pl: "",
  cs: "",
  sv: "",
  et: "",
  ja: ""
}

const title = {
  en: "",
  it: "",
  pt: "",
  es: "",
  de: "",
  fr: "",
  ro: "",
  pl: "",
  cs: "",
  sv: "",
  et: "",
  ja: ""
}


function safeArray(str) {
  console.log({ str })
  let parts = str.split(",");
  let results = [];
  let temp = '';

  for (let i = 0; i < parts.length; i++) {
      let part = parts[i].trim();
      if (temp === '') {
          if (part.startsWith('"') && part.endsWith('"')) {
              results.push(part.substring(1, part.length - 1));
          } else if (part.startsWith('"')) {
              temp = part;
          } else {
              results.push(part); // this assumes that there can be non-string elements too
          }
      } else {
          temp += ',' + part;
          if (part.endsWith('"')) {
              results.push(temp.substring(1, temp.length - 1));
              temp = '';
          }
      }
  }

  if (temp !== '') {
      throw new Error('Unmatched quote');
  }

  return results.map(result => result.replace(/\\"/g, '"')); // unescape the inner quotes
}

// Progress Bar Class
class ProgressBar {
  constructor(total) {
    this.total = total;
    this.current = 0;
  }

  // Update the progress bar and display
  update() {
    this.current += 1;
    const percentage = Math.floor((this.current / this.total) * 100);
    const progress = '#'.repeat(percentage);
    const empty = ' '.repeat(100 - percentage);

    // Move cursor to the beginning of the line
    readline.cursorTo(process.stdout, 0);

    // Print progress bar
    process.stdout.write(`[${progress}${empty}] ${percentage}%`);
  }
}

var progressBar

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

configDotenv()

const configuration = {
  apiKey: process.env.CHAT_GPT,
}
const openai = new OpenAi(configuration);

// Function to split an array into chunks of a specific size
function chunkArray(array, chunkSize = 10) {
  //console.log({ arraytoChunk: array, chunkSize})
  let chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

const TEST_PROMPT = [`How are you?`, 'All good']

const localeMap = {
  'ee': 'estonian'
}

const getChat = async ({ prompt, temperature, context }) => {
  context && console.log("TALKING TO CHAT GPT AGAIN", {context, prompt})
  const chatCompletion = await openai.chat.completions.create({
    model: params?.model || 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are an AI assistant able to translate any string to any language. You input an array of strings and simply output an array of strings with the exact same number of elements but with the strings translated. You make sure both input and output array lengths are the same.'
      },
      {
        role: 'assistant',
        content: context && prompt
      },
      {
        role: 'user',
        content: context || prompt
      },
      {
        role: 'assistant',
        content: `Result Example: \`\`\`["", "", "translated 'string' 1", "translated string 3", "translated\nstring3", "translated string 4", "\n"]\`\`\``
      }
    ],
    temperature
  });

  return chatCompletion

}

const translate = async ({ array, length, locale }) => {
  if (!array?.length) throw new Error("No prompt")
  let answer
  try {
    //const translatePrompt = `can you please help me translate this array \`\`\`${JSON.stringify(array)}\`\`\` from "en-US" to "${params.locale}" and please make sure your output returns a javascript array (square brackets and strings in double quotes)? as in an actual array e.g. \`\`\`["Translated string 1", "Translated string 2"]\`\`\``
    const context = length ? 'youre missing an element. try again making sure the length of the original and translated arrays match, return the verified translated array' : ''
    const translatePrompt = `Array to Translate: \`\`\`${JSON.stringify(array)}\`\`\` from "en-US" to "${localeMap[locale] || locale} p.s. please don't include the original array in your answer, keep double quotes as the array elements delimiter, don't allow double quotes inside array elements, preserve the array lengths even if they're empty strings or urls.`
    let completion = await getChat({ prompt: translatePrompt, context, temperature: 0.5 })

  console.log(completion)

    const reply = completion.choices[0].message?.content
   console.log("before split", {translatePrompt, reply, answer, array})
   const split = `["` + reply.split(`["`)[1].split(`"]`)[0] + `"]`
   console.log( {split})
   answer = JSON.parse(split)

    if(answer.length !== array.length) {
      console.log( {translatePrompt, reply, answer, array})
      return translate({ array, length: true})

    }
  } catch (e) {
    throw new Error(e)
  }
  title[locale] = answer[0]
  body[locale] = answer[1]
  return answer

}

const getTranslations = async ({ array, locale }) => {
  if (!array?.length) return new Error("No array")
  const translated = []
  let retries = 5

  for (let i = 0; i <= retries; i++) {
    try {
        const response = await translate({ array, locale })
        // progressBar.update()
        return response
    } catch (error) {
      console.log("RETRYING", { error })
        if (i === retries) {
          console.log("MAX RETRIES", { error })
            return Promise.reject(error);
        }
    }
  }

  return { answer: response.answer, retry: response.retry, error: response.error }
}

const doTranslations = async ({ locale }) => {
  return new Promise((resolve, reject) => {
    const strArray = [title.en, body.en];
    //const strArray = TEST_PROMPT
  
    const chunks = chunkArray(strArray, params?.chunkSize);
    // progressBar = new ProgressBar(chunks.length);
    const promises = chunks.map((e) => getTranslations({ array: e, locale }))
     console.log({ chunks })
    let translated = [];
  
  
    Promise.all(promises)
      .then(results => {
        const flat = results.flat(1)

  
        console.log({ title, body })

        fs.writeFileSync(`./output/next-notification.json`, JSON.stringify({ title, body }, null, 4), 'utf-8');
        console.log('All promises have been fulfilled!', results);
        resolve()
      })
      .catch(error => {
        console.error('One of the promises was rejected.', error);
        reject()
      });


  })


}

ALL_TRANSLATION_LOCALES.forEach((locale) => {
  doTranslations({ locale })
})
