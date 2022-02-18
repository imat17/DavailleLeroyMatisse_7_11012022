import React, { useContext } from 'react';
import { UidContext, adminContext } from '../AppContext';
import axios from 'axios';
import Trash from '../../media/icons/trash-bin.png';
import Comment from './Comment';
import AddComment from './AddComment';
import dayjs from 'dayjs';
require('dayjs/locale/fr');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const OnePost = (props) => {
	const uid = useContext(UidContext);
	const admin = useContext(adminContext);

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

	const trashDisplay = () => {
		if (uid === props.postInfo.User.id || admin === true) {
			return (
				<div className='trash__container'>
					<img src={Trash} className='trash' alt='trash' onClick={deletePost} />
				</div>
			);
		} else {
			return null;
		}
	};

	const imgDisplay = () => {
		if (props.postInfo.picture === '') {
			return null;
		} else {
			return (
				<div className='pic__container'>
					<img src={props.postInfo.picture} alt='profile pic' />
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
					{trashDisplay()}
				</div>
			</div>
			<div className='content__container'>
				<p className='info__text'>{props.postInfo.text}</p>
				{imgDisplay()}
			</div>
			<AddComment postInfo={props.postInfo} />
			{props.postInfo.Comments.map((comment) => {
				return <Comment key={comment.id} comment={comment} />;
			})}
		</li>
	);
};

export default OnePost;
