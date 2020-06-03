#!/usr/bin/env node

import {Command} from "commander"
import * as config from "./config"
import youdao from "./component/youdao"
import ora  from "ora"
import inquirer from "inquirer"
import {ConfigError, GError} from "./component/common/Error";
import chalk from "chalk"


const spinner = ora('')
const program = new Command()

const trimInput = (input: string)=>input.trim()

const youDaoOptions: [inquirer.InputQuestion, inquirer.PasswordQuestion] = [
    {
        type: "input",
        name: "youdaoKey",
        message: "youdao-id:",
        validate(input: any): boolean {
            return !!input
        },
        transformer: trimInput,
        filter: trimInput
    },
    {
        type: "password",
        name: "youdaoSecret",
        message: "youdao-secret:",
        mask: "*",
        validate(input: any): boolean {
            return !!input
        },
        transformer: trimInput,
        filter: trimInput
    },

]

const errorHandler = async (reason: Error) => {
    spinner.stop()
    console.error(reason.message)
    if (reason instanceof ConfigError && reason.errorCode === "11") {
        await configHandler()
        const raw = reason.raw
        if (raw instanceof Object) {
             await translateHandler([raw.text], [""]).catch(errorHandler)
        }
    }
    process.exit(1)
};

const translateHandler = async (cmd: [string], otherWords: [string]) => {
    spinner.start()
    await youdao(`${cmd} ${otherWords.join(" ")}`).catch(errorHandler);
    spinner.stop()
}

const configHandler: ()=>Promise<void> = async ()=>  {
    const answer: any = await inquirer
        .prompt(youDaoOptions).catch(error => {
        if (error.isTtyError) {
            console.error("couldn't be rendered in the current environment")
            process.exit(1)
        } else {
            errorHandler(error)
        }
    });

    if (answer){
        const {youdaoKey,youdaoSecret } = answer
        const result = await youdao.test({appkey: youdaoKey, secret: youdaoSecret})
        if (result instanceof GError){
            let errorMessage = "验证失败："
            switch (result.errorCode) {
                case "108":
                    errorMessage += "有道API应用ID错误"
                    break
                case "202":
                    errorMessage += "签名验证失败，请检查密钥及文字编码"
                    break
                default:
                    errorMessage = result.toString()
            }
            console.error(chalk.red(">>")+errorMessage)
            process.exit(1)
        }else{
            console.log(chalk.green("√")+ " 添加成功")
        }
        const currentConfig = await config.readAndCache();
        const newConfig = {...currentConfig,engineConfig:{...currentConfig?.engineConfig}}
        newConfig.engineConfig.youdao = {key: youdaoKey, secret: youdaoSecret}
        config.write(newConfig)
    }
}

const start = async () => {
     await config.readAndCache();
}

program.arguments('<word> [words...]').action(translateHandler)

program
    .command('config').action(configHandler)


start().catch(errorHandler)

program.parse(process.argv)
