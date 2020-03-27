///<reference path='./youdao-fanyi.d.ts' />
import Youdao from "youdao-fanyi"
import {lang, TranslateContent} from "../../common/interface";
import {AxiosResponse} from "axios";

const fanyi = Youdao({appkey: "***REMOVED***",secret: "***REMOVED***"})

const translate = async (text: string) =>{
    const result = await fanyi(text)
    const translateContent: TranslateContent = {
        text: result.translation as string,
        lang:　result.dict as lang,
        raw: result as AxiosResponse
    }
    return translateContent
}

export default translate


