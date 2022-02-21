import React, { useContext, useState } from 'react';
import { UidContext, adminContext } from '../AppContext';
import axios from 'axios';
import Trash from '../../media/icons/trash-bin.png';
import Edit from '../../media/icons/edit.png';
import Comment from './Comment';
import AddComment from './AddComment';
import dayjs from 'dayjs';
require('dayjs/locale/fr');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const OnePost = (props) => {
	const uid = useContext(UidContext);
	const admin = useContext(adminContext);
	const [toggle, setToggle] = useState(false);
	const [newPost, setNewPost] = useState(props.postInfo.text);
	const [newFile, setNewFile] = useState(props.postInfo.picture);
	// console.log(newPost);
	// console.log(newFile);

	const deletePost = () => {
		axios
			.delete(`${process.env.REACT_APP_API_URL}api/post/${props.postInfo.id}`, {
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

	const iconsDisplay = () => {
		if (uid === props.postInfo.User.id || admin === true) {
			return (
				<div className='trash__container'>
					<img
						src={Trash}
						className='trash'
						alt='trash'
						title='Supprimer le post'
						onClick={deletePost}
					/>
					<img src={Edit} className='edit' alt='edit' title='Editer le post' onClick={editMode} />
				</div>
			);
		} else {
			return null;
		}
	};

	const editMode = () => {};

	const imgDisplay = () => {
		if (props.postInfo.picture === '') {
			return;
		} else {
			return (
				<div className='pic__container'>
					<img src={props.postInfo.picture} alt='profile pic' />
				</div>
			);
		}
	};

	const editPost = () => {
		const editPostForm = new FormData();
		editPostForm.append('text', newPost);
		editPostForm.append('picture', newFile);
		editPostForm.append('UserId', uid);
		axios({
			method: 'put',
			url: `${process.env.REACT_APP_API_URL}api/post/${props.postInfo.id}`,
			withCredentials: true,
			data: editPostForm,
		})
			.then((res) => {
				console.log(res);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handlePostChange = (e) => {
		if (newPost !== null || '') {
			setNewPost(e.target.value);
			return;
		} else {
			return;
		}
	};

	const displayData = () => {
		if (props.postInfo.UserId === uid) {
			return (
				<>
					<div className='content__container'>
						<input
							type='text'
							name='text'
							className='new__post'
							onChange={handlePostChange}
							defaultValue={props.postInfo.text}
						/>
						{imgDisplay()}
						<input type='file' name='file' onChange={(e) => setNewFile(e.target.files[0])} />
						<button onClick={editPost}></button>
					</div>
				</>
			);
		} else {
			return (
				<div className='content__container'>
					<p className='info__text'>{props.postInfo.text}</p>
					{imgDisplay()}
				</div>
			);
		}
	};

	return (
		<li>
			<div className='about__post'>
				<div className='info__container'>
					<img src={props.postInfo.User.picture} alt='profile pic' />
					<p className='user__id'>{props.postInfo.User.pseudo}</p>
				</div>
				<div className='timestamp__container'>
					<p className='timestamp'>{dayjs(props.postInfo.createdAt).locale('fr').fromNow()}</p>
					{iconsDisplay()}
				</div>
			</div>
			{displayData()}
			<AddComment postInfo={props.postInfo} />
			{props.postInfo.Comments.map((comment) => {
				return <Comment key={comment.id} comment={comment} />;
			})}
		</li>
	);
};

export default OnePost;
