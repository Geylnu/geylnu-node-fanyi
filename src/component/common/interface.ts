import { AxiosResponse }  from "axios"

export enum lang {
    en = "en",
    zh  = "zh",
}

export interface TranslateContent {
    text: string,
    lang: lang,
    raw: AxiosResponse
}



