import engine from "./engine"
import view from "./view"

const adapter = async (text: string) =>{
 const translateContent = await engine(text)
    return view(translateContent)
}

export  default  adapter

