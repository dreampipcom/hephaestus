const { configDotenv } = require("dotenv");
const fs = require('fs');
const OpenAi = require("openai");
const readline = require('readline');

ALL_TRANSLATION_LOCALES = ['en-uk', 'es-es']

const params = {
  locale: ALL_TRANSLATION_LOCALES,
  model: 'gpt-4o',
  chunkSize: 4,
  srcLocale: 'en',
  limit: 3500,
}

const body = {
  en: `
Aos Srs(as). David Callabuig Tortosa, Carlota Hernandez Hernandez e demais domiciliados na minha residência fiscal, nominadamente ao: Carrer de Bismarck 11, 2-1 Barcelona 08024 Spain.

Endereços:

- David / desconhecido, agente imobiliário, parte acusada;
- Demais partes citadas, partes acusadas: Carrer de Bismarck 11, 2-1 Barcelona 08024 Spain;

De:

Angelo Reale Caldeira de Lemos

Carrer de Bismarck 11, Barcelona

Assunto: Notificação extra judicial por crimes de agressão física, tortura e abusos psicológicos de vulneráveis, estimulo ao suicídio, sabotagem arbitrária de recursos de infra-estrutura básica (internet e eletricidade), condução coercitiva, detenção ilícita em cativeiro privado, agravadas por conhecimento de condição psíquica caracterizada pelo DSM-5 F30.10, bem como impedimento criminoso do gozo pleno do direito constitucional de livre movimento, ou habeas corpus, bem como falsidade ideológica, tentativa de violação de domicilio, tentativa de incriminação, associação criminosa, negligência ao socorro emergencial, intimidação, violação de privacidade, violação de propriedade privada, ofensa, dentre outros. 

Conteúdo:

Em vistas:

1. Do inicio de contrato de aluguel regular de habitação ao Carrer de Bismarck 11, fato jurídico ocorrido em Março/2024;
2. Do pagamento regular dos emolumentos referentes ao valor aluguel dentro do prazo (exceto um único atraso de 5 dias em função de eventos imprevistos de ordem maior, garantidos e subsidiados pelo deposito caucional) até a presente data, fato jurídico ipso facto;
3. Da constituição de domicilio legal e fiscal (por solicitação consular de inscrição anagráfica), fatos jurídicos ocorridos em Abril/2024.
4. Da disfunção de irregularidade na distribuição do fornecimento de energia elétrica nas premissas da residência desde a primeira semana (quedas injustificadas), fatos jurídicos ocorridos em Março/2024.
5. Da solicitação formal para aumento de potência nominal do fornecimento de energia elétrica na primeira semana da domiciliação, bem como reiteradas solicitações/lembretes para que garantisse a conclusão do procedimento, e a falsa justificativa da parte do agente imobiliário de que o procedimento não era imediato (e que levaria meses), bem como do conhecimento de que o mesmo procedimento costuma concluír-se no mesmo dia para a maioria das companhias elétricas europeias, bem como minha tentativa de notificar as autoridades do possível crime de 264 e 264bis do CP Espanhol através do 112, em função dos mesmos fatos, fatos jurídicos ocorridos em Abril/2024;
6. Do compartilhamento da minha condição de F30.10 (DSM-5), ocorrido em Abril/2024;
7. Da violação da minha privacidade, invadindo o banheiro comum enquanto eu me duchava, e a violação de propriedade privada, ao desligar o meu alto-falante JBL Flip 5 sem o meu consentimento, cometido por Kory e endorsado pelos co-habitantes, bem como a minha tentativa de notificar as forças da ordem através do 112, que não compareceram, ou não colheram o meu depoimento dos fatos, fatos jurídicos ocorridos em Abril/2024;
8. Da exigência ilegal e injustificada para que eu deixasse a minha residência imediatamente, com base no argumento de incompatibilidade de personalidades (”minha vibe não lhes agradava”), junto a tentativa de violação de domicílio, normalizada após eu acionar a Guarda Civil de Barcelona através do número 112, fatos jurídicos ocorridos em Maio/2024;
9. Dos reiterados emails ignorados para que discutíssemos as questões pertinentes à convivência de modo que houvéssemos a possibilidade de registrar pauta e ata dos temas a serem discutidos, bem como as deliberações dos co-habitantes, para que garantíssemos a harmonia, a tentativa de realizar tal discussão de modo não rastreável em bar nas proximidades do domicilio, o fato de que após eu consumir o meu café me sentir mal e carecer de auxílio sanitário/médico, o fato de que os co-habitantes ignoraram o meu aviso de incapacidade de seguir com a conversa por motivos de saúde, a negligência ao meu socorro imediato, bem como tentativa de intimidação nesse mesmo evento através de gritos e escândalos na rua, fatos jurídicos ocorridos em Maio/2024;
10. Da privação da minha liberdade de movimento, mantendo-me sob uso de força nas premissas da cozinha comum, enquanto eu recolhia a minha entrega de almoço, na pausa de almoço na minha jornada laboral, e a tentativa de intimidação, ocorrida por 30 minutos, bem como a minha tentativa de acionar as forças da ordem através do 112, que compareceram horas depois, e de contactar o serviço de emergência consular Italiano em Barcelona, em função da gravidade do crime de sequestro, da condução coercitiva, do impedimento criminoso do gozo pleno do direito constitucional de livre movimento, ou habeas corpus, protocolado pelo mesmo, fatos jurídicos ocorridos em Maio/2024;
11. Da privação do acesso ao meu domicílio (quarto privado) enquanto eu me duchava, durante o meu expediente laboral utilizando cópia de chave do quarto ilegal em posse seja do agente imobiliário (que se escondeu nas premissas até momento posterior) que de uma co-habitante, o proferimento de ofensas de natureza análoga a tortura psicológica enquanto eu me encontrava no corredor comum, buscando auxílio de profissional especialista em fechaduras; da tentativa de manter seja a mim quanto ao profissional que havia chegado nas premissas para me auxiliar a recuperar o acesso em situação de refém através do uso de força e de agressão física, bem como a minha tentativa de acionar as forças da ordem através do 112, que ignoraram o chamado, fatos ocorridos em Maio/2024.
12. Da privação da minha liberdade de movimento, mantendo-me sob uso de ameaça e intimidação nas premissas do meu quarto privado, por 5 dias, impedindo, inclusive o provimento de recursos básicos, quando do ato de trancar-me fora da minha residência utilizando chave de acesso que eu não possuo cópia, quando do recebimento de duas parcelas de compras de supermercado através do aplicativo de logística Uber Eats, bem como a minha tentativa de acionar as forças da ordem através do 112, que ignoraram o chamado, assim como os corpos diplomáticos da Republica Italiana e da República Federativa do Brasil, fornecendo relato dos fatos para as respectivas V. Sas. Vice-Cônsules, ao comparecimento de dois agentes da força da ordem a chamado dos corpos consulares mas que não detiveram os criminosos, em função de omisso flagrante, bem como do meu chamado das forças da ordem indicando com maior assertividade emocional a natureza do ocorrido, que compareceram com um esquadrão de operações especiais (5-8 agentes), e da minha tentativa de protocolar denúncia policia na comissaria dos Mossos D’Esquadra de Horta-Guinardó, ignorada pelo agente preceptor, fatos jurídicos ocorridos em Junho/2024;
13. Da incapacidade de poder retornar a minha residência por direito, através de intimidação, e da privação aos meus bens materiais, com valor nominal e emocional a ser epecificado em seção posterior;
14. Do que mais constar em devido provimento de inquerito policial, a ser solicitado através de denúcia policial e ao corpo competente (equivalente Espanhol ao Attorney General, ou Ministério Público);

Lhes acuso por meio desta de:

Crimes de agressão física, tortura e abusos psicológicos de vulneráveis, estimulo ao suicídio, sabotagem arbitrária de recursos de infra-estrutura básica (internet e eletricidade), condução coercitiva, detenção ilícita em cativeiro privado, agravadas por conhecimento de condição psíquica caracterizada pelo DSM-5 F30.10, bem como impedimento criminoso do gozo pleno do direito constitucional de livre movimento, ou habeas corpus, bem como falsidade ideológica, tentativa de violação de domicilio, tentativa de incriminação, associação/organização criminosa, negligência ao socorro emergencial, intimidação, violação de privacidade, violação de propriedade privada, ofensa, dentre outros.

Exigindo: 

Reparação por danos físicos: 119.600,00£

Reparação por danos psicológicos: 300.000,00£

Reparação por danos morais: 250.000,00£

Reparação por danos materiais: 200.000,00£

Detalhamento do argumento:

O estado de vulnerabilidade social, para que qualifique a negligência do cuidado profilático (do latim philiae) como abandono e/ou abuso de vulnerável, não carece de quadro clínico crônico, nem de interdição legal por incapacidade ou tutoria civil (e.g. por menoridade, outrossim agravando-se como abuso de menores). Muitas vezes o surgimento de quadros clínicos, agudos ou crônicos, podem também ser consequências diretas ou indiretas desses mesmos fatos jurídicos (F30.10), qualificado-os como fatos agravados. 

A suspeita, além dos fatos sobre-citados, de interferência dolosa nos meus afazeres profissionais, sociais, culturais e emocionais, na forma do cancelamento social (com, pelo menos, meus pares, meus amigos, meus familiares, meus empregadores, [Arc.dev](http://Arc.dev) e Hunty Iberica SL), qualificariam ainda, constituição de associação criminosa no caso do núcleo domiciliar. Carecendo de ferramentas para a condução de inquérito policial, delego o apuramento dos fatos para os orgãos competentes.

La factura por los **daños psicologicos se justifica en función de** regresión en la recuperación (F30.10), peoramento del cuadro y impedimento de encontrar la paz y la harmonia para volver a mejorarla.

La factura por los **daños morales se justifica** en función de estar en situacion de calle, exponerme publicamente por comida, mas de 7 dias sin comer y estado de cetosis, abandono de familiares, dificuldades laborales.

La factura por los **daños materiales se justifica** en función de no conseguir acceder a mi inventario personal que incluye: cartas de la familia del 1700s y 1800s, foto de mi perro, un estudio de musica completo (Ableton Live Push 3, Deep Mind 6, Juno 6, MacMini, 2x Yamaha HS-8, Tibetan Bowl, un acervo de mas de 400s vinilos, incluso raridades, test presses, dubplates, limited numbered releases, y algunas copias únicas en todo el território Europeo.

Os aferidos fatos deverão ser tratados extra judicialmente através de pagamento imediato dos valores mencionados nas exigência,  ou em comarca de forum penal na cidade de Barcelona.

Londres aos 26 de agosto de 2024,

Angelo.
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
    const percentage = Math.floor((this.current / this.total) * 100, ) > 0 ? Math.floor((this.current / this.total) * 100) : 100;
    const progress = '#'.repeat(Math.max(percentage, 0));
    const empty = ' '.repeat(Math.max((100 - percentage), 0));

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
    progressBar = new ProgressBar(strArray.length);
    const promises = chunks.map((e) => getTranslations({ array: e, locale }))
     console.log({ chunks })
    let translated = [];
  
  
    Promise.all(promises)
      .then(results => {
        const flat = results.flat(1)
        const strBuffer = flat.join("\n")

        fs.writeFileSync(`./output/long-translate-${locale}.json`, JSON.stringify(flat, null, 4), {
            flag: 'w'
          });
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
