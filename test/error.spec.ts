import {
    ConfigError,
    configErrorCodesMap,
    getErrorsNameByCode,
    youdaoApiErrorCodesMap
} from "../src/component/common/Error"

describe("error test",()=>{
    it("error must contain a description", ()=>{
        const Error = new ConfigError(ConfigError.errorCode.APPKEY_AND_SECRET_NOT_EXIST, "test");
        const  template = `${ConfigError.name}: APPKEY_AND_SECRET_NOT_EXIST errorCode=11`
        expect(Error.desc).toEqual(template)
        expect(Error.toString()).toEqual(template)
    })

    it("can get error name by code", () => {
        const configName = getErrorsNameByCode("11", configErrorCodesMap)
        const youdaoName = getErrorsNameByCode("108", youdaoApiErrorCodesMap);
        expect(configName).toEqual("APPKEY_AND_SECRET_NOT_EXIST")
        expect(youdaoName).toEqual("INVALID_APPLICATION_ID")
    });

})
