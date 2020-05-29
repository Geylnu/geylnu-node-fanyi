import chalk from "chalk"
import {youdaoTranslateContent} from "../engine"
import say from  "say"

const log = console.log

const highlightText = (source: string, target: string, color: chalk.Chalk) : string =>{
    const splitWords = source.split(" ");
    const regExp = new RegExp(target,"i")
    if (splitWords.length === 1) {
        return source.replace(new RegExp(target,"i"), `${color(target)}`);
    } else {
        // 这会多次扫描数组，大量输入会影响性能
        if (splitWords.some(word=> word.toLowerCase() === target.toLowerCase())){
            return splitWords.map(word=> word.toLowerCase() === target.toLowerCase() ? color(word) : word ).join(" ")
        }
        const findWord = splitWords.find(word => {
            return regExp.test(word)
        })
        return findWord ? source.replace(new RegExp(findWord,"i"), color(findWord)) : source
    }
}


const generateExplains = (explains: [string]) =>
    explains.map(
        (desc) =>
            `${chalk.gray("-")} ${chalk.blue(desc)}\n`
    )
const generatePosTagging = (postTagging: [{wf:{name:string, value: string}}]) =>
    postTagging.map(
        ({wf:{name,value}}, index)=>
            `${index === 0 ? chalk.gray("-") : " "} ${chalk.green(value)} ${chalk.gray(name)}`
    )

const generateWebExplain = (explains: [{ value: [string], key: string }], query: string) =>
    explains.map(
        (explain,index) =>
            `${chalk.gray(`${index+1}.`)} ${chalk.gray(highlightText(explain.key, query.trim(), chalk.yellow))}\n   ${chalk.blue(explain.value.join(","))}\n`
    );

const showView = (translateContent: youdaoTranslateContent)=>{
    const { raw: result} = translateContent
    say.speak(result.query)
    /* 音标*/
    const ukPhonetic = result.basic?.["uk-phonetic"]
    const usPhonetic = result.basic?.["us-phonetic"]
    const normalPhonetic = result.basic?.phonetic
    const phoneticTemplate = ukPhonetic &&  usPhonetic
        ?`${ukPhonetic ? chalk.magenta(`英[${ukPhonetic}]`) : ''} ${usPhonetic ? chalk.magenta(`美[${usPhonetic}]`) : ''}` : normalPhonetic
            ?  `${chalk.magenta(`[${normalPhonetic}]`)}` : ""
    const headerTemplate = `\n  ${chalk.bold.red(result.query)}   ${phoneticTemplate}    ${chalk.gray("~fanyi.youdao.com")}\n`
    log(headerTemplate)

    /* 句子直译*/
    if (!result.isWord){
        log(`${chalk.gray(`-`)} ${chalk.blue(`${result.translation}`)}\n`)
    }

    /* 词性*/
    const posTagging = result.basic?.wfs
    if (posTagging){
        const posTaggingTemplate = generatePosTagging(posTagging);
        log(posTaggingTemplate.join("")+"\n")
    }

    /* 解释*/
    const explainsArray = result.basic?.explains
    if (explainsArray){
        const explainsTemplate = generateExplains(explainsArray)
        log(explainsTemplate.join(""))
    }

    /* 网络解释*/
    const webExplainArry = result.web
    if (webExplainArry){
        log(generateWebExplain(webExplainArry, result.query).join(""))
    }


}

export default  showView

