import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Formulaire de SignIn
const SignIn = () => {
	const initialValues = { email: '', password: '' };
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const emailError = document.querySelector('.email__error');
	const passwordError = document.querySelector('.password__error');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setIsSubmit(true);
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			axios({
				method: 'post',
				url: `${process.env.REACT_APP_API_URL}api/user/login`,
				withCredentials: true,
				data: formValues,
			})
				.then((res) => {
					// console.log(res.data);
					if (res.data.message) {
						if (res.data.message.includes('Mot de passe')) {
							passwordError.innerHTML = res.data.message;
						} else {
							passwordError.innerHTML = '';
						}
						if (res.data.message.includes('Email')) {
							emailError.innerHTML = res.data.message;
						} else {
							emailError.innerHTML = '';
						}
					} else {
						window.location = '/home';
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			// console.log(formValues);
		}
	}, [formErrors]);

	const validate = (values) => {
		const errors = {};
		if (!values.email) {
			errors.email = 'Email introuvable';
		}
		if (!values.password) {
			errors.password = 'Mot de passe requis';
		}
		return errors;
	};

	return (
		<form action='' onSubmit={handleSubmit} id='signUp__form'>
			<label htmlFor='email'>Email</label>
			<br />
			<input type='text' name='email' id='email' onChange={handleChange} value={formValues.email} />
			<div className='email__error'></div>
			<br />
			<label htmlFor='password'>Mot de passe</label>
			<br />
			<input
				type='password'
				name='password'
				id='password'
				onChange={handleChange}
				value={formValues.password}
			/>
			<div className='password__error'></div>
			<input type='submit' className='submit__btn' value='Connexion' />
		</form>
	);
};

export default SignIn;
