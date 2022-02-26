import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UidContext, useStateValue } from '../AppContext';

const PostBar = () => {
	const [text, setText] = useState('');
	const [file, setFile] = useState(null);
	const uid = useContext(UidContext);
	const [{ posts }, dispatch] = useStateValue();

	const handleFile = (e) => {
		setFile(e.target.files[0]);
	};

	const handlePost = (e) => {
		e.preventDefault();
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
				dispatch({ action: 'updatePosts', data: res.data });
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
			<form encType='' onSubmit={handlePost} id='post__form'>
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
