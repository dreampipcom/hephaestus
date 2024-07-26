const { configDotenv } = require("dotenv");
const fs = require('fs');
const OpenAi = require("openai");
const readline = require('readline');

ALL_TRANSLATION_LOCALES = ['en-us']

const params = {
  locale: ALL_TRANSLATION_LOCALES,
  model: 'gpt-4o',
  chunkSize: 4,
  srcLocale: 'en',
  limit: 3500,
}

const body = {
  en: `
# Programa Presidencial 0: EM BUSCA DO 1 - Cultura para Funktion Ones (WIP)

## Introdução

O Brasil é um país rico em diversidade cultural e talento artístico. No entanto, muitas vezes, esses talentos não têm a oportunidade de brilhar devido à falta de infraestrutura adequada. O programa "EM BUSCA DO 1 - Cultura para Funktion Ones" visa reverter essa realidade, proporcionando aos artistas locais a estrutura necessária para que possam se apresentar de forma digna e profissional, ao mesmo tempo que respeitam as normas de convivência social.

## Objetivo

Nosso objetivo é democratizar o acesso à cultura e à música de alta qualidade em todo o território nacional. Com um investimento de 300 milhões de reais, que seria equivalente a um único show de uma artista internacional como Madonna, poderíamos adquirir pelo menos 4.000 sistemas de som Funktion Ones. Esses sistemas seriam distribuídos entre clubes e bares em todas as regiões do Brasil, inclusive em municípios mais distantes e de difícil acesso.

## Infraestrutura Sonora

Os sistemas de som Funktion Ones são reconhecidos mundialmente por sua qualidade superior. Ao instalar esses sistemas em clubes e bares, garantimos que os artistas locais terão a oportunidade de se apresentar em palanques de alta qualidade, elevando o nível das apresentações e, consequentemente, atraindo mais público e incentivando a cultura local.

## Cobertura Nacional

Este programa não se restringirá apenas às grandes cidades. Nossa meta é garantir 100% de cobertura municipal, incluindo os rincões mais distantes do interior brasileiro. Todos os municípios terão ao menos um local equipado com os sistemas de som de última geração, assegurando que nenhum artista precise migrar para os grandes centros para ter visibilidade.

## Investimento em Isolamento Acústico

Além da aquisição dos sistemas de som, uma parte significativa do investimento será destinada ao isolamento acústico desses locais e das residências de artistas. Isso permitirá que as apresentações ocorram sem perturbar a vizinhança, garantindo o direito ao sossego de todos. Morar em uma mansão para poder ser artista é um privilégio que poucos podem ter, e nossa proposta é tornar a prática artística mais acessível e democrática.

## Incentivo à Produção Local

Com o acesso a equipamentos de alta qualidade, os artistas locais terão mais oportunidades de desenvolver suas carreiras. Além de apresentações ao vivo, esses sistemas permitirão gravações de qualidade, fomentando a produção musical e artística local. A cultura brasileira é uma das mais ricas do mundo, e devemos dar aos nossos artistas as ferramentas necessárias para expressar todo o seu potencial.

## Parcerias e Capacitação

Para garantir o sucesso do programa, estabeleceremos parcerias com produtores culturais, ONGs, e instituições de ensino. Ofereceremos cursos de capacitação para técnicos de som e produtores locais, assegurando que os equipamentos sejam utilizados de forma otimizada e que a comunidade artística local esteja preparada para aproveitar ao máximo esses recursos.

## Sustentabilidade e Manutenção

Por fim, o programa incluirá um plano de manutenção e sustentabilidade para os equipamentos. Estabeleceremos contratos de manutenção preventiva e corretiva, garantindo que os sistemas de som permaneçam em perfeito estado de uso. Além disso, incentivaremos a adoção de práticas sustentáveis, reduzindo o impacto ambiental e promovendo a responsabilidade social.

## Conclusão

O programa "EM BUSCA DO 1 - Cultura para Funktion Ones" representa um passo significativo para a democratização da cultura no Brasil. Com um investimento inteligente e estratégico, podemos transformar a realidade de milhares de artistas e comunidades em todo o país. A música e a arte têm o poder de unir, inspirar e transformar, e é nosso dever como nação proporcionar as condições necessárias para que nosso talento seja ouvido e apreciado.

Angelo REALE CALDEIRA DE LEMOS,

Barcelona, aos 30 do mês de Maio do ano 2024.

HPL3-ECO-AND

# Programa Presidencial -1: AXIOMA FESTAS (WIP)

## Introdução

O Programa AXIOMA FESTAS visa fortalecer a segurança nacional e garantir que a entrada de estrangeiros em território nacional ocorra de maneira ordenada e segura. Este programa propõe um sistema de monitoramento e análise tecnológica para todos os candidatos a vistos, exceto aqueles que buscam asilo humanitário. Através de uma supervisão artificial, utilizando CCTV e monitoramento de áudio 24/7 durante um período de um ano, poderemos assegurar que apenas indivíduos com intenções legítimas e comportamentos apropriados sejam autorizados a ingressar no país.

## Objetivo

O principal objetivo do AXIOMA FESTAS é proteger a integridade e a segurança do território nacional, prevenindo a entrada de indivíduos que possam representar uma ameaça. Ao implementar um sistema de monitoramento rigoroso e análise tecnológica, pretendemos filtrar eficazmente os candidatos a vistos, garantindo que apenas aqueles que passam nos critérios de segurança entrem no país.

## Metodologia

Para a execução do AXIOMA FESTAS, será utilizada a colaboração entre estados (MUV) no compartilhamento do sistema de monitoramento contínuo através de câmeras CCTV e gravação de áudio. Este monitoramento deverá ser oferecido da data da requisição + o periodo de 1 ano anterior à mesma, para cada candidato a visto. Os dados coletados serão analisados por uma inteligência artificial avançada, capaz de identificar comportamentos suspeitos e potenciais ameaças. A análise incluirá padrões de fala, atividades diárias e interações sociais.

## Exceções

O programa prevê exceções para indivíduos que buscam asilo humanitário. Esses candidatos serão submetidos a um período de quarentena de um ano em vilas dedicadas, onde poderão ser monitorados em um ambiente controlado. Esta medida visa garantir a segurança tanto dos candidatos quanto da população nacional, enquanto se oferece um refúgio seguro para aqueles que realmente necessitam.

## Implementação

A implementação do AXIOMA FESTAS será realizada em fases. Na primeira fase, serão anunciadas as intenções de inclusão em determinada Carta MVU através das principais embaixadas e consulados.  A segunda fase envolverá o desenvolvimento (junto ao Robocob Sensor) e integração completa do sistema de análise artificial, garantindo que todos os dados coletados sejam processados de maneira justa, humana, eficiente e segura. Na terceira fase, serão oferecidos os canais de solicitação de visto para estrangeiros, implementado o filtro e ampliada a cobertura para incluir todos os pontos de entrada no território nacional, como aeroportos e portos.

## Benefícios Esperados

Com a implementação do AXIOMA FESTAS, espera-se uma redução significativa na entrada de indivíduos que possam representar uma ameaça à segurança nacional e uma perturbação aos valores nacionais (a ordem, o progresso e a liberdade de expressão). Além disso, o programa proporcionará uma triagem mais eficiente e justa dos candidatos a vistos, permitindo que aqueles com intenções legítimas e comportamentos adequados entrem no país. A longo prazo, este programa contribuirá para a manutenção das liberdades, da paz e da segurança no território nacional.

## Considerações Éticas

Reconhecemos que a implementação de um sistema de monitoramento tão rigoroso levanta questões éticas importantes. Portanto, garantiremos que todas as medidas de privacidade sejam respeitadas e que o uso dos dados coletados seja estritamente limitado aos propósitos de segurança nacional e preservação dos valores ocidentais. Serão estabelecidos mecanismos de supervisão e auditoria para garantir a transparência e a responsabilidade no uso do sistema.

## Conclusão

O AXIOMA FESTAS representa um passo importante na modernização e fortalecimento da segurança nacional. Através do uso de tecnologia avançada e inteligência artificial, poderemos proteger melhor nossas fronteiras e garantir que apenas indivíduos com intenções legítimas e comportamentos adequados entrem no país. Este programa é uma demonstração do nosso compromisso com a segurança e o bem-estar de todos os cidadãos.

Angelo REALE CALDEIRA DE LEMOS,

Barcelona, aos 30 do mês de Maio do ano 2024.

HPL3-ECO-AND
`,
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
  ja: "",
  'en-us': "",
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
    const translatePrompt = `Array to Translate: \`\`\`${JSON.stringify(array)}\`\`\` from ${params.srcLocale} to "${localeMap[locale] || locale} p.s. please don't include the original array in your answer, keep double quotes as the array elements delimiter, don't allow double quotes inside array elements, preserve the array lengths even if they're empty strings or urls.`
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
  return answer

}

const getTranslations = async ({ array, locale }) => {
  if (!array?.length) return new Error("No array")
  const translated = []
  let retries = 5

  for (let i = 0; i <= retries; i++) {
    try {
        const response = await translate({ array, locale })
        progressBar.update()
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
    const strArray = body.en.split("\n");
    //const strArray = TEST_PROMPT
  
    const chunks = chunkArray(strArray, params?.chunkSize);
    progressBar = new ProgressBar(chunks.length);
    const promises = chunks.map((e) => getTranslations({ array: e, locale }))
     console.log({ chunks })
    let translated = [];
  
  
    Promise.all(promises)
      .then(results => {
        const flat = results.flat(1)
        const strBuffer = flat.join("\n")

        fs.writeFileSync(`./output/long-translate.json`, JSON.stringify(flat, null, 4), 'utf-8');
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
