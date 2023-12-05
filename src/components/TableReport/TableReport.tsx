import { useState, useEffect } from 'react';
import { Report } from '../../models/Report';

function TableReport({ data }: { data: Report[] }) {
    const [columnsTable, setColumnsTable] = useState(Array<string>())

    useEffect(() => {
        handleChangeData(data)
    }, [data])

    const handleChangeData = (dataReport: Report[]) => {
        if (dataReport.length === 0) return
        const dates = [...new Set(dataReport.map(item => item.date))]
        let dataGroupByDates = {};
        dates.forEach(date => {
            dataGroupByDates[date] = dataReport.filter(itemData => itemData.date === date)
        })
        const columnsData = buildColumns(dataReport, dataGroupByDates)
        setColumnsTable(columnsData)
        tableBodyConstructor(columnsData, dataGroupByDates)

    }

    const buildColumns = (dataReport: Report[], dataGroupByDates = []) => {
        return Object.keys(dataReport[0])
            .filter(column => !['stems', 'date', 'price'].includes(column))
            .concat(Object.keys(dataGroupByDates))
            .concat('Total')
    }

    const columnsConstructor = (columns: string[]) => {
        return columns.map(column => (<th key={column} className="capitalize border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">{column}</th>))
    }

    const tableBodyConstructor = (columns: string[], dataGroupByDates: object) => {
        console.log(dataGroupByDates)

        const cosito = Object.keys(dataGroupByDates).map( index => {
            const fill = dataGroupByDates[index].map( objeto => {
                const fillCosito = columns.map(col => {
                    if(col === index) {
                    }
                })
            })

        })
        
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

                    </tbody>
                </table>
            }
        </>
    )
}

export default TableReport