import React, { useState, useContext } from 'react';
import { UidContext } from '../AppContext';
import Trash from '../../media/icons/trash.png';
import Edit from '../../media/icons/edit.png';
import axios from 'axios';
import dayjs from 'dayjs';
require('dayjs/locale/fr');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const Comment = (props) => {
	const comment = props.comment;
	const [newText, setNewText] = useState('');
	const uid = useContext(UidContext);
	// console.log(props)
	console.log(newText);

	const deleteComment = () => {
		axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${comment.id}`,
			withCredentials: true,
		})
			.then((res) => {
				console.log(res);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const editComment = () => {
		axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${comment.id}`,
			withCredentials: true,
			data: {
				text: newText,
			},
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const editDisplay = () => {
		if (uid === comment.UserId) {
			return (
				<div className='trash__container'>
					<img
						src={Trash}
						className='trash'
						alt='trash'
						title='Supprimer le commentaire'
						onClick={deleteComment}
					/>
				</div>
			);
		} else {
			return null;
		}
	};

	const displayText = () => {
		if (comment.UserId === uid) {
			return (
				<>
					<input
						type='text'
						name='text'
						id='text'
						className='new__value'
						onChange={(e) => setNewText(e.target.value)}
						onBlur={editComment}
						defaultValue={comment.text}
					/>
				</>
			);
		} else {
			return <p className='comment__text'>{comment.text}</p>;
		}
	};

	return (
		<div className='comment__container'>
			<div className='commenter__info'>
				<img src={comment.User.picture} className='profile__pic' alt='profile pic' />
				<p className='commenter__pseudo'>{comment.commenterPseudo}</p>
			</div>
			<div className='timestamp__container'>
				{dayjs(comment.createdAt).locale('fr').fromNow()}
				{editDisplay()}
			</div>
			<div className='comment__data'>{displayText()}</div>
		</div>
	);
};

export default Comment;
