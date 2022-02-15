import React, { useContext } from 'react';
import { UidContext } from '../AppContext';
import axios from 'axios';
import Trash from '../../media/icons/trash.png';
import Comment from './Comment';

const OnePost = (props) => {
	const uid = useContext(UidContext);
	// console.log(props);

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
		if (uid === props.postInfo.User.id) {
			return (
				<div className='trash__container'>
					<img src={Trash} className='trash' alt='trash' onClick={deletePost} />
				</div>
			);
		} else {
			return null;
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
					<p className='timestamp'>{props.postInfo.createdAt}</p>
					{trashDisplay()}
				</div>
			</div>
			<div className='content__container'>
				<p className='info__text'>{props.postInfo.text}</p>
				<div className='pic__container'>
					<img src={props.postInfo.picture} alt='profile pic' />
				</div>
			</div>
			<Comment
				listComments={props.postInfo.Comments}
				postId={props.postInfo.id}
				key={props.postInfo.Comments.id}
			/>
		</li>
	);
};

export default OnePost;
