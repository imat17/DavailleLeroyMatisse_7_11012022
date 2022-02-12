import React from 'react';
import Header from '../components/Header/Header';
import ProfileForm from '../components/Profil/Profile';

const Profile = () => {
	return (
		<div className='profile__page'>
			<Header disconnectDisplay={true} arrowDisplay={true}/>
			<div className='profile__container'>
				<ProfileForm />
			</div>
		</div>
	);
};

export default Profile;
