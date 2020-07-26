import React, { useState, useContext } from 'react'
import { Modal, Button, Radio } from 'antd'
import styles from './SelectLoadableDataModal.module.css'
import { LoadableDataContext } from '../../context/loadableDataContext'

const SelectLoadableDataModal = () => {
	let [modalVisibleState, setModalVisibleState] = useState(true)
	let [radioValue, setRadioValue] = useState('small')
	const { selectLoadableDataType } = useContext(LoadableDataContext)

	const onChange = (e) => {
		setRadioValue(e.target.value)
	}

	const handleOk = (e) => {
		selectLoadableDataType(radioValue)
		setModalVisibleState(false)
	}
	return (
		<>
			<Modal
				style={{ top: '30%' }}
				visible={modalVisibleState}
				maskClosable={false}
				closable={false}
				footer={[
					<Button key="submit" type="primary" onClick={handleOk}>
						Подтвердить
					</Button>,
				]}
				className={styles.modal}
			>
				<p className={styles.description}>Выберите набор данных:</p>
				<Radio.Group value={radioValue} onChange={onChange}>
					<Radio.Button value="small">Маленький</Radio.Button>
					<Radio.Button value="big">Большой</Radio.Button>
				</Radio.Group>
			</Modal>
		</>
	)
}

export default SelectLoadableDataModal
