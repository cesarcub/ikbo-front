import { useState, useEffect } from 'react'
import { ListColumns, ParamsReport, ValueType } from '../../models/ParamsReport'
import { getReport } from '../../api/service'

function App() {
	const [columns, setColumns] = useState(Array<ListColumns>())
	const [dateInit, setDateInit] = useState('2023-10-01')
	const [dateEnd, setDateEnd] = useState('2023-10-01')
	const [valueType, setValueType] = useState('stems')

	const listColumns: Array<ListColumns> = ['category', 'color', 'country', 'customer', 'provider', 'variety']

	useEffect(() => {
		const paramsReport: ParamsReport = {
			columns: columns,
			dateini: dateInit,
			datefin: dateEnd,
			value: valueType as ValueType
		}
		getReport(paramsReport)
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
			<main className="container mx-auto">
				<header className="bg-sky-200">
					<div className="mb-4 p-4 border-b border-b-sky-300">
						<h1 className="text-center text-3xl">📋 Report 📈</h1>
					</div>
					<div className="flex flex-wrap p-4 border-b border-b-sky-300">
						<div>
							<label htmlFor="dateInit">From*:</label>
							<input type="date" value="2023-10-01" className="ml-2 rounded-md px-3" name="Fecha de inicio" id="dateInit" onChange={e =>setDateInit(e.target.value)} />
						</div>
						<div className="ml-8">
							<label htmlFor="dateInit">To (optional):</label>
							<input type="date" className="ml-2 rounded-md px-3" name="Fecha de inicio" id="dateInit" onChange={e =>setDateEnd(e.target.value)}/>
						</div>
					</div>
					<div className="flex flex-wrap justify-between p-4 border-b border-b-sky-300">
						{listColumns.map(column =>
							<div key={column}>
								<input type="checkbox" id={column} onChange={e => handleChangeColumns(e)} />
								<label htmlFor={column} className="capitalize ml-1">{column}</label>
							</div>
						)
						}
					</div>
					<div className="flex flex-wrap p-4 border-b border-b-sky-300">
						<div>
							<input type="radio" id="stems" name="valueType" checked onChange={() => setValueType('stems')}/>
							<label htmlFor="stems" className="ml-1">Stems</label>
						</div>
						<div className='ml-2'>
							<input type="radio" id="price" name="valueType" />
							<label htmlFor="price" className="ml-1" onChange={() => setValueType('price')}>Price</label>
						</div>
					</div>
				</header>
				<section>

				</section>
			</main>
		</>
	)
}

export default App
