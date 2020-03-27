import googleTranslate,{Options}  from 'google-translate-open-api';
import { TranslateContent, lang } from "../../common/interface"
import { AxiosResponse }  from "axios"

const options: Options = {
    tld: "cn",
    to: "zh-CN",
}

const translate = async (text: string) =>{
    const result = await googleTranslate(text, options)
    const translateContent: TranslateContent = {
        text: result.data[0] as string,
        lang:　result.data[1] as lang,
        raw: result as AxiosResponse
    }
    return translateContent
}

export default translate
