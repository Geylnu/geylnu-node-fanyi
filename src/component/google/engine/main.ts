import googleTranslate,{Options}  from 'google-translate-open-api';
import { TranslateContent } from "../../common/interface"

const options: Options = {
    tld: "cn",
    to: "zh-CN",
}

const translate = async (text: string) =>{
    const result = await googleTranslate(text, options)
    const translateContent: TranslateContent = {
        text: result.data[0] as string,
    }
    return translateContent
}

export default translate
