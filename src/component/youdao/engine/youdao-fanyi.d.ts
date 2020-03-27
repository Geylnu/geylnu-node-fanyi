declare module 'youdao-fanyi' {
    export interface YouDaoOptions {
        appkey: string,
        secret: string,
        [propName: string]: unknown;
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

    function Youdao( opions: YouDaoOptions) : fanyi
    function Youdao(text: string):　Promise<any>
    export default Youdao
}
