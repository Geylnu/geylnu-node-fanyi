export interface YouDaoOptions {
    appkey: string,
    secret: string,
}

export interface youdaoApiResponse {
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

export interface YouDaoQuery {
    to: string,
    from: string,
}

export interface fanyiCallback {
    (error: Error, response: {}): void
}

export interface fanyi {
    (text: string, callback?: fanyiCallback): Promise<youdaoApiResponse>,
    (text: string, query: YouDaoQuery, callback?: fanyiCallback): Promise<youdaoApiResponse>,
    fanyi: this
}

declare function Youdao(options: YouDaoOptions): fanyi
declare function Youdao(text: string): Promise<youdaoApiResponse>

export default Youdao
