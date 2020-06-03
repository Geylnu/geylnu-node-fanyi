import Youdao from "youdao-fanyi";
import YoudaoComponent from "../src/component/youdao"


jest.mock("youdao-fanyi")
type mockedFanyi = jest.Mock<Promise<Youdao.apiResponse>,[string,Youdao.fanyiCallback?]>
const mockedYoudao = Youdao as unknown as jest.Mock<mockedFanyi, [Youdao.opnions]>;
const mockedFanyi: mockedFanyi = jest.fn()
mockedYoudao.mockReturnValue(mockedFanyi)

const mockedAPiResponseData: Youdao.apiResponse = {
        "returnPhrase": [
            "love"
        ],
        "query": "love",
        "errorCode": "103",
        "l": "en2zh-CHS",
        "tSpeakUrl": "http://openapi.youdao.com/ttsapi?q=%E7%88%B1&langType=zh-CHS&sign=DC38D5254673FB9BBC72D69306CCE3D6&salt=1590664254501&voice=4&format=mp3&appKey=79ea1edb059c7907",
        "translation": [
            "爱"
        ],
        "isWord": true,
}

const mockYoudaoResponse : (errorCode: Youdao.apiErrorCodes, options?: Youdao.apiResponse) => void = (errorCode, options = mockedAPiResponseData)=>{
    mockedFanyi.mockResolvedValue({...options, errorCode})
}




describe("youdao test",()=>{
    it("mock test", async () => {
        expect(mockedYoudao({appkey: "", secret: "rere"})).toBe(mockedFanyi)
        mockYoudaoResponse("0")
        const result = await YoudaoComponent.test({appkey: "", secret: ""});
        expect(result).toBe(null)
    });
})
