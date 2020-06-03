import Youdao from "youdao-fanyi"
import {TranslateContent} from "../../common/interface";
import * as config from  "../../../config"
import {ConfigError, YoudaoApiError} from "../../common/Error";

export interface youdaoTranslateContent  extends  TranslateContent{
    raw: Youdao.apiResponse
}

const translate = async (text: string, extraOptions?: Youdao.opnions) =>{
    const currentConfig = await config.readAndCache()
    const {key, secret} = currentConfig?.engineConfig?.youdao || {}
    if (key && secret || extraOptions){
        const fanyi = Youdao({appkey: key || extraOptions,secret: secret, ...extraOptions} as Youdao.opnions)
        const result = await fanyi(text)
        if (result.errorCode === "0"){
            const translateContent: youdaoTranslateContent  = {
                text: result.translation.join(""),
                raw: result
            }
            return translateContent
        }else{
            throw new YoudaoApiError(result.errorCode)
        }
    }else{
        throw new ConfigError(ConfigError.errorCode.APPKEY_AND_SECRET_NOT_EXIST, "有道翻译API ID或 secret不存在，请配置",{text})
    }
}

export default translate


