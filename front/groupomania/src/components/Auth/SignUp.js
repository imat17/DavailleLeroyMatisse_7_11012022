import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [pseudo, setPseudo] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (e) => {
		e.preventDefault();
		const emailError = document.querySelector('.email__error');
		const pseudoError = document.querySelector('.email__error');
		const passwordError = document.querySelector('.password__error');

		axios({
			method: 'post',
			url: `${process.env.REACT_APP_API_URL}api/user/register`,
			withCredentials: true,
			data: {
				email,
				pseudo,
				password,
			},
		})
			.then((res) => {
				console.log(res);
				if (res.data.errors) {
					emailError.innerHTML = res.data.errors.email;
					passwordError.innerHTML = res.data.errors.password;
					pseudoError.innerHTML = res.data.errors.password;
				} else {
					window.location = '/home';
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<form action='' onSubmit={handleLogin} id='signIn__form'>
			<label htmlFor='email'>Email</label>
			<br />
			<input
				type='text'
				name='email'
				id='email'
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<div className='email__error'></div>
			<br />
			<label htmlFor='pseudo'>Pseudo</label>
			<br />
			<input
				type='text'
				name='pseudo'
				id='pseudo'
				onChange={(e) => setPseudo(e.target.value)}
				value={pseudo}
			/>
			<div className='pseudo__error'></div>
			<br />
			<label htmlFor='password'>Mot de passe</label>
			<br />
			<input
				type='password'
				name='password'
				id='password'
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<div className='password__error'></div>
			<input type='submit' className='submit__btn' value='Inscription' />
		</form>
	);
};

export default SignUp;
