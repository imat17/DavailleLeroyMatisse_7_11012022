import React from 'react';
import LogoutImg from '../media/icons/power-button.svg';
import axios from 'axios';
import cookie from 'js-cookie';
import { NavLink } from 'react-router-dom';

const Disconnect = () => {
	const removeCookie = (key) => {
		if (window !== undefined) {
			cookie.remove(key, { expire: 1 });
		}
	};

	const disconnectUser = async () => {
		await axios
			.get(`${process.env.REACT_APP_API_URL}api/user/logout`, { withCredentials: true })
			.then(() => removeCookie('jwt'))
			.catch((err) => console.log(err));
	};
	return (
		<NavLink to='/'>
			<div className='disconnect' onClick={disconnectUser}>
				<img src={LogoutImg} alt='deconnexion' />
			</div>
		</NavLink>
	);
};

export default Disconnect;
