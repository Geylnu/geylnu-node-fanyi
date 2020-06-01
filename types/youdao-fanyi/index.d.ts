declare namespace Youdao{
    interface fanyi {
        (text: string, callback?: fanyiCallback): Promise<apiResponse>,
        (text: string, query: query, callback?: fanyiCallback): Promise<apiResponse>,
        fanyi: this
    }

    interface opnions {
        appkey: string,
        secret: string,
    }
    interface apiResponse {
        errorCode: string,
        query: string,
        translation: [string],
        basic?:{
            "us-phonetic": string,
            "phonetic": string,
            "uk-phonetic": string,
            "uk-speech": string,
            "us-speech": string,
            "explains": [string],
            "wfs": [{wf: {name: string,value: string}}]
        },
        web?: [{value: [string], key: string}]
        l: string,
        tSpeakUrl: string,
        returnPhrase: [string],
        isWord: boolean
    }

    interface query {
        to: string,
        from: string,
    }

    interface fanyiCallback {
        (error: Error, response: {}): void
    }
}

declare function Youdao(options: Youdao.opnions): Youdao.fanyi
declare function Youdao(text: string): Promise<Youdao.apiResponse>

export  default  Youdao
