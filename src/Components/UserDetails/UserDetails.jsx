import React from 'react'
import { Collapse, Row, Col } from 'antd'
import styles from './UserDetails.module.css'

const { Panel } = Collapse

const UserDetails = ({ user }) => {
	return (
		<div className={styles.usersContainer}>
			<h2 className={styles.title}>Детали</h2>
			<Row>
				<Col span={12}>
					<Collapse defaultActiveKey={['1']} ghost>
						<Panel header="Пользователь" key="1">
							<b className={styles.detailItem}>
								{user.firstName} {user.lastName}
							</b>
						</Panel>
						<Panel header="Описание" key="2">
							<textarea
								defaultValue={user.description}
								readOnly
								className={styles.descriptionTextarea}
							/>
						</Panel>
					</Collapse>
				</Col>
				<Col span={12}>
					<Collapse ghost>
						<Panel header="Адрес проживания" key="1">
							<b className={styles.detailItem}>{user.address?.streetAddress}</b>
						</Panel>
						<Panel header="Город" key="2">
							<b className={styles.detailItem}>{user.address?.city}</b>
						</Panel>
						<Panel header="Провинция/штат" key="3">
							<b className={styles.detailItem}>{user.address?.state}</b>
						</Panel>
						<Panel header="Индекс" key="4">
							<b className={styles.detailItem}>{user.address?.zip}</b>
						</Panel>
					</Collapse>
				</Col>
			</Row>
		</div>
	)
}

export default UserDetails
