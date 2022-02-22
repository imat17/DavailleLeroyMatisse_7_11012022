import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UidContext } from '../AppContext';
// import imageFile from '../../media/icons/file-image.png';

const ProfileForm = () => {
	const [pseudo, setPseudo] = useState('');
	const [email, setEmail] = useState('');
	const [file, setFile] = useState(null);

	const uid = useContext(UidContext);
	console.log(file);

	useEffect(() => {
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
			withCredentials: true,
		})
			.then((res) => {
				setPseudo(res.data.pseudo);
				setEmail(res.data.email);
				setFile(res.data.picture);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [uid]);

	const deleteProfile = () => {
		window.confirm(
			'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'
		);
		axios({
			method: 'delete',
			url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
			withCredentials: true,
		})
			.then((res) => {
				if (res.data.errors) {
					console.log(res.data.errors);
				} else {
					console.log(res);
					window.location = '/';
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const editProfile = () => {
		// const formPicture = new FormData();
		// formPicture.append('id', uid);
		// formPicture.append('email', email);
		// formPicture.append('pseudo', pseudo);
		axios({
			method: 'put',
			url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
			withCredentials: true,
			data: {
				email: email,
				pseudo: pseudo,
			},
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// const previewImage = (e) => {
	// 	setFile(URL.createObjectURL(e.target.files[0]));
	// };

	const editProfilePicture = () => {
		const formPicture = new FormData();
		formPicture.append('picture', file);
		formPicture.append('id', uid);
		axios({
			method: 'post',
			url: `${process.env.REACT_APP_API_URL}api/user/upload`,
			withCredentials: true,
			data: formPicture,
		})
			.then((res) => {
				console.log(res);
				setFile(res.data.picture);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const editData = (e) => {
		e.preventDefault();
		editProfile();
		editProfilePicture();
	};

	return (
		<>
			<form action='' onSubmit={editData} id='profile__form'>
				<div className='profile__pic'>
					<img src={file} alt='Profilepicture' />
					<input type='file' onChange={(e) => setFile(e.target.files[0])} />
					{/* <img src={imageFile} alt="" /> */}
				</div>
				<label htmlFor='email'>Email</label>
				<br />
				<input
					type='email'
					name='email'
					id='email'
					onChange={(e) => setEmail(e.target.value)}
					defaultValue={email}
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
					defaultValue={pseudo}
				/>
				<div className='pseudo__error'></div>
				<div className='profile__input'>
					<input type='submit' value='Sauvegarder' />
					<input type='' onClick={deleteProfile} defaultValue='Supprimer mon compte' />
				</div>
			</form>
		</>
	);
};

export default ProfileForm;
