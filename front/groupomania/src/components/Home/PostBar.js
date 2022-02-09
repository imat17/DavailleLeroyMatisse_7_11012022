// import React, { useState } from 'react';
// import axios from 'axios';
import imageLogo from '../../media/icons/image.svg'

const PostBar = () => {
	return (
		<div className='postbar__container'>
			<div className='profile__picture'>
				<img src='' alt='' />
			</div>
			<form action=''>
				<textarea className='input__post' type='text' placeholder='Exprimez-vous !' />
				<input className='input__submit' type='submit' />
			</form>
			<div className='add__image'>
				<img src={imageLogo} alt='inserez un fichier' />
			</div>
		</div>
	);
};

export default PostBar;
