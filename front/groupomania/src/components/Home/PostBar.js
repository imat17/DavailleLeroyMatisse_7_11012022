import React, { useState } from 'react';
import axios from 'axios';

const PostBar = () => {
	const [text, setText] = useState('');
	const [file, setFile] = useState(null);

	const UserId = 34;

	const handleFile = (e) => {
		console.log(e.target.files[0]);
		setFile(e.target.files[0]);
	};

	const handlePost = () => {
		const postFormData = new FormData();
		postFormData.append('text', text);
		postFormData.append('UserId', UserId);
		postFormData.append('file', file);

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
			<form action='' onSubmit={handlePost} id='post__form'>
				<textarea
					className='input__post'
					type='text'
					name='text'
					id='text'
					onChange={(e) => setText(e.target.value)}
					value={text}
					placeholder='Exprimez-vous !'
				/>
				<input type='file' onChange={handleFile} className='input__file' />
				<label htmlFor='file' className='label__file'></label>
				<input className='input__submit' type='submit' />
			</form>
		</div>
	);
};

export default PostBar;
