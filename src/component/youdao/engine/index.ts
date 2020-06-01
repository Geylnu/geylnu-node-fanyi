import Youdao from "youdao-fanyi"
import {TranslateContent} from "../../common/interface";
import * as config from  "../../../config"

export interface youdaoTranslateContent  extends  TranslateContent{
    raw: Youdao.apiResponse
}

const translate = async (text: string, extraOptions?: Youdao.opnions) =>{
    const currentConfig = await config.readAndCache()
    const {key, secret} = currentConfig?.engineConfig?.youdao || {}
    if (key && secret){
        const fanyi = Youdao({appkey: key,secret: secret, ...extraOptions})
        const result = await fanyi(text)
        if (result?.errorCode === "0"){
            const translateContent: youdaoTranslateContent  = {
                text: result.translation.join(""),
                raw: result
            }
            return translateContent
        }else{
            throw Error(`Youdao can't get data, errCode = ${result?.errorCode}`)
        }
    }else{
        throw Error("有道翻译key及secret不存在")
    }
}

export default translate


