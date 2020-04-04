export interface YouDaoOptions {
    appkey: string,
    secret: string,
}

export interface YouDaoQuery {
    to: string,
    from: string,
}

export interface fanyiCallback {
    (error: Error, response: {}): void
}

export interface fanyi {
    (text: string, callback?: fanyiCallback): Promise<any>
}

export interface fanyi {
    (text: string, query: YouDaoQuery, callback?: fanyiCallback): Promise<any>
}

export interface fanyi {
    fanyi: fanyi
}

declare function Youdao(options: YouDaoOptions): fanyi
declare function Youdao(text: string): Promise<any>

export default Youdao
