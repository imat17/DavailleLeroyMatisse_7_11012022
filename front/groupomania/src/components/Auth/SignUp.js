import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
	const initialValues = { pseudo: '', email: '', password: '' };
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

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
				url: `${process.env.REACT_APP_API_URL}api/user/register`,
				withCredentials: true,
				data: formValues,
			})
				.then((res) => {
					console.log(res.data);
					if (res.data.message) {
						alert(res.data.message);
					}
					alert(
						`Votre inscription à bien été prise en compte, vous pouvez maintenant vous connecter`
					);
					setFormValues(initialValues);
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
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.pseudo) {
			errors.pseudo = 'Pseudo requis';
		} else if (values.pseudo.length < 3) {
			errors.pseudo = 'Le pseudo doit faire au minimum 3 caractères';
		}
		if (!values.email) {
			errors.email = 'Email requis';
		} else if (!regex.test(values.email)) {
			errors.email = `Format de l'email invalide`;
		}
		if (!values.password) {
			errors.password = 'Mot de passe requis';
		} else if (values.password.length < 6) {
			errors.password = 'Le mot de passe doit faire au minimum 6 caractères';
		}
		return errors;
	};

	return (
		<form action='' onSubmit={handleSubmit} id='signIn__form' label='sign-up form'>
			<label htmlFor='email'>Email</label>
			<br />
			<input type='text' name='email' id='email' onChange={handleChange} value={formValues.email} />
			<div className='email__error'>{formErrors.email}</div>
			<br />
			<label htmlFor='pseudo'>Pseudo</label>
			<br />
			<input
				type='text'
				name='pseudo'
				id='pseudo'
				onChange={handleChange}
				value={formValues.pseudo}
			/>
			<div className='pseudo__error'>{formErrors.pseudo}</div>
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
			<div className='password__error'>{formErrors.password}</div>
			<input type='submit' className='submit__btn' value='Inscription' />
		</form>
	);
};

export default SignUp;
