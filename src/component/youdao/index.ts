import engine from "./engine"
import view from "./view"
import Youdao from "youdao-fanyi";

const adapter = async (text: string) =>{
 const translateContent = await engine(text)
    return view(translateContent)
}

adapter.test = async (options: Youdao.opnions) =>{
        const result = await engine("test", options)
        if (result){
            if (result.raw.errorCode === "0" ){
                return result
            }
        }else {
            throw Error("unexpected Error")
        }
}

export  default  adapter

