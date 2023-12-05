import { useState } from 'react'
import { ListColumns } from '../../models/ParamsReport'
import './App.css'

function App() {
	const [columns, setColumns] = useState(Array<ListColumns>())

	const listColumns: Array<ListColumns> = ['category', 'color', 'country', 'customer', 'provider', 'variety']

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
				<header className="p-8">
					<div className="flex">
						<div>
							<label htmlFor="dateInit">Día a consultar*</label>
							<input type="date" name="Fecha de inicio" id="dateInit" onChange={e => console.log(e)} />
						</div>
						<div>
							<label htmlFor="dateInit">Hasta (opcional)</label>
							<input type="date" name="Fecha de inicio" id="dateInit" />
						</div>
					</div>
					<div className='flex justify-between'>
						{listColumns.map(column =>
							<div key={column}>
								<input type="checkbox" id={column} onChange={e => handleChangeColumns(e)} />
								<label htmlFor={column} className="capitalize">{column}</label>
							</div>
						)
						}
					</div>
				</header>
				<section>

				</section>
			</main>
		</>
	)
}

export default App
