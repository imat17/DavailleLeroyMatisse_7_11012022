import React, { useState, useContext } from 'react';
import { UidContext } from '../AppContext';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
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
	// const [toggle, setToggle] = useState(false);
	const uid = useContext(UidContext);
	console.log(props)
	console.log(newText);

	const deleteComment = () => {
		axios
			.patch(`${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${comment.id}`, {
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
		axios
			.patch(`${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${comment.id}`, {
				withCredentials: true,
				data: {
					text: newText,
				},
			})
			.then((res) => {
				console.log(res);
				// window.location.reload();
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
					<img
						src={Edit}
						className='edit'
						alt='edit'
						title='Modifier le commentaire'
						// onClick={() => setToggle(!toggle)}
					/>
				</div>
			);
		} else {
			return null;
		}
	};

	const handleChange = (e) => {
		// let newValue = document.querySelector('.new__value').innerHTML;
		// console.log(newValue);
		// setNewText(newValue)
	};

	const displayText = () => {
		if (comment.UserId === uid) {
			return (
				<>
					<EditText className='new__value'
						defaultValue={comment.text}
						onChange={event => setNewText(event.target.value)}
						onSave={editComment}
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
			{displayText()}
		</div>
	);
};

export default Comment;
