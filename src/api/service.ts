import { API_ENDPOINT } from '../utils/constants'
import { ListColumns, ParamsReport } from '../models/ParamsReport'
import { Report } from '../models/Report';

export const getReport = (params: ParamsReport) => {
    const queryParams = mapParams(params)
    const url = `${API_ENDPOINT}?${queryParams}`
    fetch(url)
    .then(res => res.json())
    .then(console.log)
}

const mapParams = (params: ParamsReport): string => {
    const queryParamsString = (Object.keys(params) as Array<keyof typeof params>).map(key => {
        if(params[key] && key !== 'columns'){
            return key + '=' + params[key]
        } else if (key === 'columns' && params.columns.length > 0)  {
            return 'columns[]=' + params.columns.join('&columns[]=')
        }
    })
    .filter(param => param !== undefined)
    .join('&')
    return queryParamsString
}