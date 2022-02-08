import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';


const Auth = () => {
	// Utilisation des hooks pour les modals
	const [signUpModal, setSignUpModal] = useState(true);
	const [signInModal, setSignInModal] = useState(false);

	const handleModals = (e) => {
		if (e.target.id === 'register') {
			setSignInModal(false);
			setSignUpModal(true);
		} else if (e.target.id === 'login') {
			setSignUpModal(false);
			setSignInModal(true);
		}
	};

	return (
		<div className='auth__form'>
			<div className='form__container'>
				<ul>
					<li onClick={handleModals} id='register' className={signUpModal ? 'btn__active' : null}>
						S'inscrire
					</li>
					<li onClick={handleModals} id='login' className={signInModal ? 'btn__active' : null}>
						Se connecter
					</li>
				</ul>
				{/* Si sur true >> affichage*/}
				{signUpModal && <SignUp />}
				{signInModal && <SignIn />}
			</div>
		</div>
	);
};

export default Auth;
