import { useState, useEffect } from 'react'
import { ListColumns, ParamsReport, ValueType } from '../../models/ParamsReport'
import { Report } from '../../models/Report';
import { getReport } from '../../api/service'
import Loader from '../Loader/Loader'
import TableReport from '../TableReport/TableReport'

function App() {
	const [columns, setColumns] = useState(Array<ListColumns>())
	const [dateInit, setDateInit] = useState('2023-10-01')
	const [dateEnd, setDateEnd] = useState('2023-10-01')
	const [valueType, setValueType] = useState('stems')
	const [isLoading, setIsLoading] = useState(true)
	const [tableReport, setTableReport] = useState(Array<Report>())

	const listColumns: Array<ListColumns> = ['category', 'color', 'country', 'customer', 'provider', 'variety']

	useEffect(() => {
		setIsLoading(true)
		const paramsReport: ParamsReport = {
			columns: columns,
			dateini: dateInit,
			datefin: dateEnd,
			value: valueType as ValueType
		}

		getReport(paramsReport)
			.then(data => {		
				setTableReport(data)
			})
			.finally(() => setIsLoading(false))

	}, [columns, dateInit, dateEnd, valueType])

	const handleChangeColumns = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newColumns: Array<ListColumns> = e.target.checked ?
			handleChecked(e.target.id as ListColumns) :
			handleUncheck(columns.filter(value => value !== e.target.id))
		setColumns(newColumns)
	}

	const handleChecked = (column: ListColumns): ListColumns[] => {
		let newColumns: Array<ListColumns>
		if (['color', 'variety', 'category'].includes(column)) {
			handleCheckCategory()
			newColumns = [...new Set([...columns, column, 'category' as ListColumns])]
		} else {
			newColumns = [...columns, column]
		}
		return newColumns
	}

	const handleCheckCategory = () => {
		const categoryCheck = document.querySelector('#category') as HTMLInputElement
		if (categoryCheck) {
			(categoryCheck).checked = true
		}
	}

	const handleUncheck = (newColumns: Array<ListColumns>): Array<ListColumns> => {
		if (!newColumns.includes('category')) {
			const variety = document.querySelector('#color') as HTMLInputElement
			const colorCheck = document.querySelector('#variety') as HTMLInputElement
			if (variety && colorCheck) {
				variety.checked = false
				colorCheck.checked = false
			}
			return newColumns.filter(value => value !== 'variety' && value !== 'color')
		}
		return newColumns
	}

	return (
		<>
			{isLoading && <Loader />}
			<main className="container mx-auto">
				<header className="bg-sky-200">
					<div className="mb-4 p-4 border-b border-b-sky-300">
						<h1 className="text-center text-3xl">📋 Report 📈</h1>
					</div>
					<div className="flex flex-wrap p-4 border-b border-b-sky-300">
						<div>
							<label htmlFor="dateInit" className="font-bold">From<span className="text-xs font-red">*</span>:</label>
							<input type="date" value="2023-10-01" className="ml-2 rounded-md px-3" name="Fecha de inicio" id="dateInit" onChange={e => setDateInit(e.target.value)} />
						</div>
						<div className="ml-8">
							<label htmlFor="dateInit"><span className="font-bold">To</span> (optional):</label>
							<input type="date" className="ml-2 rounded-md px-3" name="Fecha de inicio" id="dateInit" onChange={e => setDateEnd(e.target.value)} />
						</div>
					</div>
					<div className="p-4 border-b border-b-sky-300">
						<p className="text-xs mb-2 font-bold">Columns:</p>
						<div className="flex flex-wrap justify-between">
							{listColumns.map(column =>
								<div key={column}>
									<input type="checkbox" id={column} onChange={e => handleChangeColumns(e)} />
									<label htmlFor={column} className="capitalize ml-1">{column}</label>
								</div>
							)
							}
						</div>
					</div>
					<div className="flex flex-wrap p-4 border-b border-b-sky-300">
						<div>
							<input type="radio" id="stems" name="valueType" defaultChecked={valueType === 'stems'} onClick={() => setValueType('stems')} />
							<label htmlFor="stems" className="ml-1">By stems</label>
						</div>
						<div className='ml-2'>
							<input type="radio" id="price" name="valueType" defaultChecked={valueType === 'price'}  onClick={() => setValueType('price')}/>
							<label htmlFor="price" className="ml-1">By price</label>
						</div>
					</div>
				</header>
				<section>
					<TableReport data={tableReport}/>
				</section>
			</main>
		</>
	)
}

export default App
