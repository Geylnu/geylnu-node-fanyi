import * as os from "os"
import * as fse from "fs-extra"
import * as path from "path"

const pathName = "/.geylnu-fanyi/"
const homeDir: string = process.env.HOME || os.homedir()
const homePath = path.join(homeDir,pathName)
let configCache: translateConfig | null = null

interface translateConfig extends Readonly<Object>{
     engineConfig?: {
        readonly youdao?: {
            readonly key: string,
            readonly secret: string
        }
    }
}


const readAndCache = async (spePath?: string | Buffer | number): Promise<translateConfig | null>=>{
    if (configCache !== null){
        return configCache
    }

    const configPath = spePath  || path.join(homePath,"config.json")
    await fse.ensureDir(homePath)
    const configFile = await fse.readFile(configPath, { flag: "a+", encoding: "utf-8"})
    return configFile ? JSON.parse(configFile) as translateConfig : {}
}

const write = async (config: translateConfig)=>{

    const configPath = path.join(homePath,"config.json")
    const configString = JSON.stringify(config)
    return fse.writeFile(configPath, configString, {encoding: "utf-8"})
}

export {
    readAndCache,
    write,
    homePath,
    translateConfig
}



