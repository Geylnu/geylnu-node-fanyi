type ValueOf<T> = T[keyof T];

const configErrorCodesMap= {
    "APPKEY_AND_SECRET_NOT_EXIST":  "11",
} as const

type configErrorCode =  ValueOf<typeof configErrorCodesMap>
type configErrorName = keyof typeof configErrorCodesMap

const youdaoApiErrorCodesMap = {
    "TEXT_TO0_LONG": "103",
    "INVALID_APPLICATION_ID": "108",
    "NO_VALID_EXAMPLES_OF_RELATED_SERVICES": "110",
    "SIGNATURE_VERIFICATION_FAILED": "202",
} as const


type youdaoApiErrorCode = ValueOf<typeof youdaoApiErrorCodesMap>
type youdaoApiErrorName = keyof typeof  youdaoApiErrorCodesMap

type GErrorCode = configErrorCode | youdaoApiErrorCode
type ErrorsMap = typeof youdaoApiErrorCodesMap | typeof configErrorCodesMap


const getErrorsNameByCode =
        (code: GErrorCode, ErrorsMap: ErrorsMap ) =>(Object.keys(ErrorsMap) as [keyof ErrorsMap]).find((key)=>{
            if (ErrorsMap[key] === code){
                return key
            }
        })

class GError extends Error{
    constructor(public errorCode: GErrorCode, message?: string,  public raw?: any) {
        super(message)
        this.errorCode = errorCode
        this.raw = raw
        this.name = this.constructor.name
    }

    get desc(){
        return this.toString()
    }

    public toString(): string{
           return `GError: ${this.message}` + ` errorCode=${this.errorCode}`
    }
}


class ConfigError extends  GError {
    static  errorCode = configErrorCodesMap
    public descFlag : undefined | configErrorName

    constructor(public errorCode: configErrorCode,  message?: string, public raw?: any) {
        super(errorCode, message, raw);
        this.descFlag = getErrorsNameByCode(this.errorCode, configErrorCodesMap)
    }

    public toString(): string {
        return this.name + (this.descFlag ? `: ${this.descFlag}` : '') + ` errorCode=${this.errorCode}`
    }
}

class YoudaoApiError extends GError {
    public descFlag : undefined | youdaoApiErrorName
    constructor(public errorCode: youdaoApiErrorCode,  message?: string, public raw?: any) {
        super(errorCode, message, raw);
        this.descFlag = getErrorsNameByCode(this.errorCode, youdaoApiErrorCodesMap)
    }

    public toString(): string {
        return this.name + (this.descFlag ? `: ${this.descFlag}` : '') + ` errorCode=${this.errorCode}`
    }
}

export {GError,ConfigError,YoudaoApiError, getErrorsNameByCode, configErrorCodesMap, youdaoApiErrorCodesMap}


