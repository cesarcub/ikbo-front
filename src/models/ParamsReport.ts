export interface ParamsReport {
    dateini: string,
    datefin?: string,
    columns: Array<ListColumns>,
    value: ValueType
}

export type ListColumns = 'category' |
    'color' |
    'country' |
    'customer' |
    'provider' |
    'variety'

export type ValueType = 'stems' | 'price'