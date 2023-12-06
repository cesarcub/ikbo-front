export interface ParamsReport {
    dateini: string,
    datefin?: string,
    columns: Array<ListColumns>,
    value: ValueType
}

export const LIST_COLUMNS = ['category', 'color', 'country', 'customer', 'provider', 'variety']

export type ListColumns = typeof LIST_COLUMNS[number]

export type ValueType = 'stems' | 'price'
