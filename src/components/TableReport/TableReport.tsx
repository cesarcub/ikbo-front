import { useState, useEffect } from 'react'
import { Report } from '../../models/Report'

function TableReport({ data }: { data: Report[] }) {
    const [columnsTable, setColumnsTable] = useState(Array<string>())
    const [rowsTable, setRowsTable] = useState('')

    useEffect(() => {
        handleChangeData(data)
    }, [data])

    const handleChangeData = (dataReport: Report[]) => {
        if (dataReport.length === 0) return
        const dates = [...new Set(dataReport.map(item => item.date))]
        let dataGroupByDates = []
        dates.forEach(date => {
            dataGroupByDates.push(dataReport.filter(itemData => itemData.date === date))
        })
        const columnsData = buildColumns(dataReport, dataGroupByDates, dates)
        setRowsTable(tableDataConstructor(columnsData, dataGroupByDates, dates))
        setColumnsTable(columnsData)
    }

    const buildColumns = (dataReport: Report[], dataGroupByDates = [], dates: string[]) => {
        return Object.keys(dataReport[0])
            .filter(column => !['stems', 'date', 'price'].includes(column))
            .concat(dates)
            .concat('Total')
    }

    const columnsConstructor = (columns: string[]) => {
        return columns.map(column => (<th key={column} className="capitalize border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">{column}</th>))
    }

    const tableDataConstructor = (columns: string[], dataGroupByDates: [], dates: string[]) => {
        console.log(dataGroupByDates)
        if(dates.length === 1) {
            const [dataOfDate] = dataGroupByDates;
            let total = 0
            return dataOfDate.map(item => {
                total += item.stems ?? item.price
                const valueType = item.stems ? item.stems.toLocaleString() : `$${item.price.toLocaleString()}`
                return (<tr>
                    {Object.keys(item)
                    .filter(item => item !== 'date' && item !== 'price' && item !== 'stems')
                    .map( field => <td className="border p-2 text-sm text-left">{item[field]}</td>)}
                    <td className="border p-2 text-sm text-right">{valueType}</td>
                    <td className="border p-2 text-sm text-right">{valueType}</td>
                </tr>)
            })
            
        }
        
    }

    const tableViewConstructor = () => {

    }

    return (
        <>
            {data.length === 0 && <div className="text-center p-4">👀 Report not found, please select at least a column</div>}
            {data.length !== 0 &&
                <table className="w-full border-collapse border border-slate-400">
                    <thead className="bg-slate-50 dark:bg-slate-700">
                        <tr>
                            {columnsConstructor(columnsTable)}
                        </tr>
                    </thead>
                    <tbody>
                        {rowsTable}
                    </tbody>
                </table>
            }
        </>
    )
}

export default TableReport