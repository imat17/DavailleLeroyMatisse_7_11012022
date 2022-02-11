import React from 'react';
import { NavLink } from 'react-router-dom';

const ProfilePreview = () => {
	return (
		<div className='profile__preview'>
			<NavLink to='/profile'>
                <div className="preview__img">
                    <img src="" alt="" />
                </div>
                <div className="preview__content">
                    <p className="preview__user">JeanTest</p>
                    <p className="preview__link">Voir mon profil</p>
                </div>
            </NavLink>
		</div>
	);
};

export default ProfilePreview;
