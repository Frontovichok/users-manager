import React from 'react'
import './App.css'
import UsersTable from './Components/UsersTable/UsersTable'
import SelectLoadableDataModal from './Components/SelectLoadableDataModal/SelectLoadableDataModal'
import { LoadableDataProvider } from './context/loadableDataContext'
import { ConfigProvider } from 'antd'
import ruRu from 'antd/es/locale/ru_RU'

function App() {
	return (
		<ConfigProvider locale={ruRu}>
			<LoadableDataProvider>
				<div className="App">
					<SelectLoadableDataModal />
					<h1>Тестовое задание</h1>
					<div className="table-wrapper">
						<UsersTable />
					</div>
				</div>
			</LoadableDataProvider>
		</ConfigProvider>
	)
}

export default App
