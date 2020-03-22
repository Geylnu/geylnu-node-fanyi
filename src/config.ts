import * as os from "os"
import * as fse from "fs-extra"
import * as path from "path"

const pathName = "/.geylnu-fanyi/"
const homeDir: string = process.env.HOME || os.homedir()
const homePath = path.join(homeDir,pathName)

const read = async (spePath?: string | Buffer | number)=>{
    const configPath = spePath  || path.join(homePath,"config.json")
    await fse.ensureDir(homePath)
    const configFile = await fse.readFile(configPath, { flag: "a+", encoding: "utf-8"})
    return configFile ?　JSON.parse(configFile) : null
}

const write = async (config: Object)=>{

    const configPath = path.join(homePath,"config.json")
    const configString = JSON.stringify(config)
    return fse.writeFile(configPath, configString, {encoding: "utf-8"})
}

export {
    read,
    write,
    homePath
}



