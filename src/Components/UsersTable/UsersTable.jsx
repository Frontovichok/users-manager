import React, { useState, useEffect, useContext } from 'react'
import axiosRetry from 'axios-retry'
import { Table, Input, Button, Space } from 'antd'
import 'antd/dist/antd.css'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import * as axios from 'axios'
import uniqBy from 'lodash/uniqBy'
import { LoadableDataContext } from '../../context/loadableDataContext'
import UserDetails from '../UserDetails/UserDetails'
import AddUserForm from '../AddUserForm/AddUserForm'
import styles from './UsersTable.module.css'

const UsersTable = () => {
	let searchInput = React.createRef()
	const { getSelectedLoadableDataURL } = useContext(LoadableDataContext)
	const selectedLoadableDataURL = getSelectedLoadableDataURL()
	let [searchText, setSearchText] = useState('')
	let [searchedColumn, setSearchedColumn] = useState('')
	let [loadingState, setLoadingState] = useState(false)
	let [usersList, setUsersList] = useState([])
	let [selectedUser, setSelectedUser] = useState({})

	useEffect(() => {
		if (selectedLoadableDataURL) {
			getUsersRequest(selectedLoadableDataURL)
		}
	}, [selectedLoadableDataURL])

	const getUsersRequest = async (url) => {
		setLoadingState(true)
		try {
			axiosRetry(axios, {
				retries: 3,
				retryDelay: (retryCount) => {
					return retryCount * 1000
				},
			})
			const { data: users } = await axios.get(url)
			// добавляем ключ key для каждого user'а(строка таблицы), т.к. этого требует компонент Table от antd
			let usersWithKeyProp = users.map((user) => ({ ...user, key: user.id }))
			// исключаем user'а с повторяющимся id
			let uniqueUsers = uniqBy(usersWithKeyProp, 'id')
			setLoadingState(false)
			setUsersList(uniqueUsers)
		} catch (e) {
			if (e.message === 'Network Error') {
				console.warn('Сервер упал!')
			} else {
				console.warn('error message: ', e.message)
			}
		}
	}

	const addUser = (user) => {
		setUsersList([{ ...user, key: user.id }, ...usersList])
	}
	const getUsersId = (users = usersList) => {
		return users.reduce((usersId, { id }) => [...usersId, id], [])
	}
	const generateUniqueId = (users = usersList) => {
		if (usersList.length === 0) return 1

		let usersId = getUsersId(users)

		for (let id = 1; id < usersId.length + 1; id++) {
			if (!usersId.includes(id)) {
				return id
			}
		}
	}

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						searchInput = node
					}}
					placeholder={`Найти в ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Найти
					</Button>
					<Button
						onClick={() => handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Сбросить
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.select())
			}
		},
		render: (text) => {
			return searchedColumn === dataIndex ? (
				<div>
					<Highlighter
						highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
						searchWords={[searchText]}
						autoEscape
						textToHighlight={text ? text.toString() : ''}
					/>
				</div>
			) : (
				text
			)
		},
	})

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}

	const handleReset = (clearFilters) => {
		clearFilters()
		setSearchText('')
	}

	const columns = [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
			width: '8%',
			sorter: {
				compare: (a, b) => a.id - b.id,
			},
			...getColumnSearchProps('id'),
		},
		{
			title: 'Имя',
			dataIndex: 'firstName',
			key: 'firstName',
			width: '22%',
			sorter: {
				compare: (a, b) =>
					a.firstName > b.firstName ? 1 : a.firstName < b.firstName ? -1 : 0,
			},
			...getColumnSearchProps('firstName'),
		},
		{
			title: 'Фамилия',
			dataIndex: 'lastName',
			key: 'lastName',
			width: '22%',
			sorter: {
				compare: (a, b) =>
					a.lastName > b.lastName ? 1 : a.lastName < b.lastName ? -1 : 0,
			},
			...getColumnSearchProps('lastName'),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			width: '28%',
			...getColumnSearchProps('email'),
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
			key: 'phone',
			width: '20%',
			...getColumnSearchProps('phone'),
		},
	]
	return (
		<>
			<AddUserForm
				addUser={addUser}
				getUsersId={getUsersId}
				generateUniqueId={generateUniqueId}
				isLoading={loadingState}
			/>
			<Table
				columns={columns}
				dataSource={usersList}
				onRow={(record, rowIndex) => {
					return {
						onClick: (event) => {
							if (record.id === selectedUser.id) {
								setSelectedUser({})
							} else {
								setSelectedUser(record)
							}
						},
					}
				}}
				rowClassName={(record, rowIndex) =>
					record.id === selectedUser.id
						? `${styles.rowCustomStyle} ${styles.active}`
						: `${styles.rowCustomStyle}`
				}
				loading={loadingState}
				pagination={{
					pageSizeOptions: ['10', '20', '30', '40', '50'],
					showSizeChanger: true,
				}}
				style={{
					border: '1px solid #f0f0f0',
				}}
			/>
			{selectedUser.name && <UserDetails user={selectedUser} />}
		</>
	)
}

export default UsersTable
