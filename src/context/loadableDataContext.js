import React, { useState } from 'react'

export const LoadableDataContext = React.createContext()

export const LoadableDataProvider = (props) => {
	const loadableData = {
		small:
			'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
		big:
			'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
	}
	let [selectedLoadableDataType, selectLoadableDataType] = useState('')

	const getSelectedLoadableDataURL = () =>
		loadableData[selectedLoadableDataType]

	window.getSelectedLoadableDataURL = getSelectedLoadableDataURL
	return (
		<LoadableDataContext.Provider
			value={{ selectLoadableDataType, getSelectedLoadableDataURL }}
		>
			{props.children}
		</LoadableDataContext.Provider>
	)
}
