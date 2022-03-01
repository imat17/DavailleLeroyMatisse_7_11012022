import React, { useContext, useState } from 'react';
import { UidContext, adminContext } from '../AppContext';
import { useStateValue } from '../AppContext';
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
	const [newFile, setNewFile] = useState(null);
	const [post, setPost] = useState(props.postInfo);
	const [{ posts }, dispatch] = useStateValue();

	const deletePost = () => {
		axios
			.delete(`${process.env.REACT_APP_API_URL}api/post/${post.id}`, {
				withCredentials: true,
			})
			.then((res) => {
				dispatch({
					action: 'updatePosts',
					data: posts.filter((el) => el.id !== post.id),
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const iconsDisplay = () => {
		if (uid === post.User.id) {
			return (
				<div className='trash__container'>
					<img
						src={Trash}
						className='trash'
						alt='trash'
						title='Supprimer le post'
						onClick={deletePost}
					/>
					<img
						src={Edit}
						className='edit'
						alt='edit'
						title='Editer le post'
						onClick={() => setToggle(!toggle)}
					/>
				</div>
			);
		} else if (uid === post.User.id || admin === true) {
			return (
				<div className='trash__container'>
					<img
						src={Trash}
						className='trash'
						alt='trash'
						title='Supprimer le post'
						onClick={deletePost}
					/>
				</div>
			);
		} else {
			return null;
		}
	};

	const imgDisplay = () => {
		if (post.picture === '') {
			return;
		} else {
			return (
				<div className='pic__container'>
					<img src={post.picture} alt='profile pic' />
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
			url: `${process.env.REACT_APP_API_URL}api/post/${post.id}`,
			withCredentials: true,
			data: editPostForm,
		})
			.then((res) => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handlePostChange = (e) => {
		if (newPost !== null || '') {
			setNewPost(e.target.value);
		}
	};

	const handleFileChange = (e) => {
		setNewFile(e.target.files[0]);
	};

	const editOrNot = () => {
		if (toggle === false) {
			return <div className='new__post'>{post.text}</div>;
		} else if (toggle === true) {
			return (
				<input
					type='text'
					name='text'
					className='new__post'
					onChange={handlePostChange}
					defaultValue={post.text}
				/>
			);
		}
	};

	const displayData = () => {
		if (post.UserId === uid) {
			return (
				<>
					<div className='content__container'>
						{editOrNot()}
						{imgDisplay()}
						{toggle && (
							<>
								<input type='file' name='file' onChange={handleFileChange} />
								<button onClick={editPost}>Sauvegarder</button>
							</>
						)}
					</div>
				</>
			);
		} else {
			return (
				<div className='content__container'>
					<p className='info__text'>{post.text}</p>
					{imgDisplay()}
				</div>
			);
		}
	};

	return (
		<li>
			<div className='about__post'>
				<div className='info__container'>
					<img src={post.User.picture} alt='profile pic' />
					<h3 className='user__id'>{post.User.pseudo}</h3>
				</div>
				<div className='timestamp__container'>
					<p className='timestamp'>{dayjs(post.createdAt).locale('fr').fromNow()}</p>
					{iconsDisplay()}
				</div>
			</div>
			{displayData()}
			<AddComment postInfo={post} updatePost={(post) => setPost(post)} />
			{post.Comments.map((comment) => {
				return <Comment key={comment.id} comment={comment} updatePost={(post) => setPost(post)} />;
			})}
		</li>
	);
};

export default OnePost;
