import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UidContext } from '../AppContext';

const PostBar = () => {
	const [text, setText] = useState('');
	const [file, setFile] = useState(null);
	const uid = useContext(UidContext);

	const handleFile = (e) => {
		console.log(e.target.files[0].name);
		setFile(e.target.files[0]);
	};

	const handlePost = () => {
		const postFormData = new FormData();
		postFormData.append('text', text);
		postFormData.append('UserId', uid);
		postFormData.append('picture', file);

		axios({
			method: 'post',
			url: `${process.env.REACT_APP_API_URL}api/post`,
			withCredentials: true,
			data: postFormData,
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='postbar__container'>
			<div className='profile__picture'>
				<img src='' alt='' />
			</div>
			<form
				encType='multipart/form-data'
				onSubmit={handlePost}
				id='post__form'
			>
				<textarea
					className='input__post'
					type='text'
					name='text'
					id='text'
					onChange={(e) => setText(e.target.value)}
					value={text}
					placeholder='Exprimez-vous !'
				/>
				<input type='file' name='picture' onChange={handleFile} className='input__file' />
				<label htmlFor='file' className='label__file'></label>
				<input className='input__submit' type='submit' />
			</form>
		</div>
	);
};

export default PostBar;
