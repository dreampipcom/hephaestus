const { configDotenv } = require("dotenv");
const fs = require('fs');
const OpenAi = require("openai");
const readline = require('readline');

const ALL_LOCALES = ['pt-br']

const params = {
  locale: ALL_LOCALES,
  model: 'gpt-4o',
  chunkSize: 2,
  limit: 3500,
  minLength: 8,
  maxLength: 15,
  type: 'Programa Presidencial'
}

const prompt = `
Programa 0: EM BUSCA DO 1 - Cultura para Funktion Ones. 300 milhões de reais (show da Madonna) poderiam comprar, pelo menos 4000 sistemas Funktion Ones, a serem distribuidos entre clubes e bares em todo território nacional (incluindo 100% de cobertura municipal nos interior brabo), para servir de palanque para artistas locais. Bem como investir em isolamento acustico com os outros shows/cachês (não Madonna) para que os artistas possam escutar seus sons em casa tranquilamente sem incomodar a vizinhança. Morar em uma mansão para poder ser artista é pouco democrático.`

const title = {}
const body = {}

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
        content: `You are an AI assistant able to develop political speeches, programs, laws, and bills based on a text input and return a markdown document.`
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
        content: `Result Example: # Program 1 ## Abstract Lorem ipsum ## Action Plan. Lorem ipsum. ## Estimated Budget Yearly: 1 billion USD ## Estimated roadmap - Phase 1: Lorem ipsum - Phase 2: Lorem ipsum.`
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
    const translatePrompt = `Please develop a: \`\`\`${JSON.stringify(params.type)}\`\`\` in at least ${params.minLength} paragraphs and in less than ${params.maxLength}. You develop in in the following language/locale ${locale}. The subject/point is: ${prompt}`
    let completion = await getChat({ prompt: translatePrompt, context, temperature: 0.7 })

  console.log(completion)

    const reply = completion.choices[0].message?.content
    answer = reply

    // if(answer.length !== array.length) {
    //   console.log( {translatePrompt, reply, answer, array})
    //   return translate({ array, length: true})

    // }
  } catch (e) {
    throw new Error(e)
  }
  title[locale] = params.type
  body[locale] = answer
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
    const strArray = [prompt];
    //const strArray = TEST_PROMPT
  
    const chunks = chunkArray(strArray, params?.chunkSize);
    // progressBar = new ProgressBar(chunks.length);
    const promises = chunks.map((e) => getTranslations({ array: e, locale }))
    console.log({ chunks })
    let translated = [];
  
  
    Promise.all(promises)
      .then(results => {
        const flat = results.flat(1)


        fs.writeFileSync(`./output/next-bigtext.txt`, JSON.stringify({ title, body }, null, 4), 'utf-8');
        console.log('All promises have been fulfilled!', results);
        resolve()
      })
      .catch(error => {
        console.error('One of the promises was rejected.', error);
        reject()
      });


  })


}

ALL_LOCALES.forEach((locale) => {
  doTranslations({ locale })
})
