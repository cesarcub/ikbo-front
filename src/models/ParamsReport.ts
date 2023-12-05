export interface ParamsReport {
    dateini: string,
    datefin?: string,
    columns: Array<ListColumns>,
    value: 'stems' | 'price'
}

export type ListColumns = 'category' |
    'color' |
    'country' |
    'customer' |
    'provider' |
    'variety'