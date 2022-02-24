import React, { useState, useContext, useEffect, useRef } from 'react';
import { UidContext } from '../AppContext';
import axios from 'axios';

const AddComment = (props) => {
	const uid = useContext(UidContext);
	const [text, setText] = useState('');
	const [commentPseudo, setCommentPseudo] = useState('');
	// const form = useRef();
	const postInfo = props.postInfo;
	// console.log(props)

	useEffect(() => {
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
			withCredentials: true,
		})
			.then((res) => {
				setCommentPseudo(res.data.pseudo);
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [uid]);

	const addComment = (e) => {
		e.preventDefault();
		axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postInfo.id}`,
			withCredentials: true,
			data: {
				text: text,
				PostId: postInfo.id,
				commenterPseudo: commentPseudo,
				UserId: uid,
			},
		})
			.then((res) => {
				// form.current.reset()
				props.updatePost(res.data);
				setText('');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='add__comment'>
			<form action='' onSubmit={addComment} id='comment__form'>
				<textarea
					type='text'
					name='text'
					id='text'
					onChange={(e) => setText(e.target.value)}
					value={text}
					placeholder='Ajouter un commentaire'
				/>
				<input type='submit' value='Publier' />
			</form>
		</div>
	);
};

export default AddComment;
