import React from 'react';
import { NavLink } from 'react-router-dom';
import Profile from '../../media/icons/profil.png'

const ProfilePreview = () => {
	return (
		<NavLink to='/profile'>
			<div className='profile__preview'>
				<img src={Profile} alt="profile_icon" title="Voir mon profil" />
			</div>
		</NavLink>
	);
};

export default ProfilePreview;
