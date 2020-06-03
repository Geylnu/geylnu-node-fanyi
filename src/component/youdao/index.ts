import engine from "./engine"
import view from "./view"
import Youdao from "youdao-fanyi";
import {GError} from "../common/Error";

const adapter = async (text: string) =>{
 const translateContent = await engine(text)
    return view(translateContent)
}

adapter.test = async (options: Youdao.opnions) =>{
    try {
        await engine("test", options)
        return null
    } catch (e) {
        if (e instanceof  GError){
            return e
        }else{
            throw e
        }
    }
}

export  default  adapter

