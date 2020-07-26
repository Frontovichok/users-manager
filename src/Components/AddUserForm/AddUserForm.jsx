import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Transition } from 'react-transition-group'
import styles from './AddUserForm.module.scss'
import { Tooltip } from 'antd'

const AddUserForm = ({ addUser, getUsersId, generateUniqueId, isLoading }) => {
	const { handleSubmit, register, reset, errors } = useForm()
	let [openState, setOpenState] = useState(false)
	const onSubmit = (values) => {
		addUser({ ...values, id: +values.id })
		reset()
		hideForm()
	}
	const hideForm = () => {
		setOpenState(false)
	}
	const showForm = () => {
		reset()
		setOpenState(true)
	}
	return (
		<div className={styles.formContainer}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Transition
					in={openState}
					timeout={{
						appear: 200,
						enter: 200,
						exit: 300,
					}}
				>
					{(state) => (
						<div className={styles.fieldsContainer + ` ${styles[state]}`}>
							<div className={styles.fieldContainer}>
								<Tooltip
									title={errors.id?.message}
									visible={!!errors.id}
									color="#ff6d74"
								>
									<input
										name="id"
										type="number"
										min="1"
										placeholder="id"
										ref={register({
											required: 'Обязательное поле!',
											maxLength: 4,
											validate: (value) => {
												return (
													!getUsersId().includes(+value) ||
													`Введенный id уже существует! Попробуйте: ${generateUniqueId()}`
												)
											},
										})}
										className={
											styles.inputForm + (errors.id ? ` ${styles.error}` : '')
										}
									/>
								</Tooltip>
							</div>
							<div className={styles.fieldContainer}>
								<Tooltip
									title={errors.firstName?.message}
									visible={!!errors.firstName}
									color="#ff6d74"
								>
									<input
										name="firstName"
										placeholder="Имя"
										ref={register({
											required: 'Обязательное поле!',
										})}
										className={
											styles.inputForm +
											(errors.firstName ? ` ${styles.error}` : '')
										}
									/>
								</Tooltip>
							</div>

							<div className={styles.fieldContainer}>
								<Tooltip
									title={errors.lastName?.message}
									visible={!!errors.lastName}
									color="#ff6d74"
								>
									<input
										name="lastName"
										placeholder="Фамилия"
										ref={register({
											required: 'Обязательное поле!',
										})}
										className={
											styles.inputForm +
											(errors.lastName ? ` ${styles.error}` : '')
										}
									/>
								</Tooltip>
							</div>

							<div className={styles.fieldContainer}>
								<Tooltip
									title={errors.email?.message}
									visible={!!errors.email}
									color="#ff6d74"
								>
									<input
										name="email"
										placeholder="Email"
										ref={register({
											required: 'Обязательное поле!',
										})}
										className={
											styles.inputForm +
											(errors.email ? ` ${styles.error}` : '')
										}
									/>
								</Tooltip>
							</div>

							<div className={styles.fieldContainer}>
								<Tooltip
									title={errors.phone?.message}
									visible={!!errors.phone}
									color="#ff6d74"
								>
									<input
										name="phone"
										placeholder="Телефон"
										ref={register({
											required: 'Обязательное поле!',
										})}
										className={
											styles.inputForm +
											(errors.phone ? ` ${styles.error}` : '')
										}
									/>
								</Tooltip>
							</div>
						</div>
					)}
				</Transition>
				<div>
					{openState === true && (
						<>
							<button className={styles.outlineButton} onClick={hideForm}>
								Скрыть форму
							</button>
							<button type="submit" className={styles.submitButton}>
								Добавить в таблицу
							</button>
						</>
					)}
				</div>
			</form>
			{/* пришлось вынести за форму, т.к. при нажатии автоматически вызывался submit */}
			{openState === false && (
				<button
					className={styles.outlineButton}
					onClick={showForm}
					disabled={isLoading ? true : false}
				>
					Добавить
				</button>
			)}
		</div>
	)
}

export default AddUserForm
