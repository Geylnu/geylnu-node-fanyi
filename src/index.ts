import {Command} from "commander"
import * as config from "./config"
import youdao from "./component/youdao"
import ora  from "ora"
import inquirer from "inquirer"


import * as pkg from '../package.json'

const spinner = ora('')

const {version} = pkg

const program = new Command()

const errorHandler = (reason: Error)=> {
    console.error(reason.message)
    process.exit(1)
}

const translateHandler = async (cmd: [string], otherWords: [string]) => {
    spinner.start()
    await youdao(`${cmd} ${otherWords.join(" ")}`).catch(errorHandler);
    spinner.stop()
};

const configHandler = async  ()=>{
    const answer = await inquirer
        .prompt([
            {
                type: "password",
                name: "youdaoKey",
                message: "youdao-id:",
                mask: "*"
            },
            {
                type: "password",
                name: "youdaoSecret",
                message: "youdao-secret:",
                mask: "*"
            }

        ]).catch(error => {
        if (error.isTtyError) {
            console.error("couldn't be rendered in the current environment")
            process.exit(1)
        } else {
            errorHandler(error)
        }
    });

    if (answer){
        const {youdaoKey,youdaoSecret } = answer
        const currentConfig = await config.readAndCache();
        const newConfig = {...currentConfig,engineConfig:{...currentConfig?.engineConfig}}
        newConfig.engineConfig.youdao = {key: youdaoKey, secret: youdaoSecret}
        config.write(newConfig)
    }
}

const start = async () => {
     await config.readAndCache();
}

program
    .version(version)
    .arguments('<word> [words...]').action(translateHandler)

program
    .command('config').action(configHandler)


start().catch(errorHandler)

program.parse(process.argv)
