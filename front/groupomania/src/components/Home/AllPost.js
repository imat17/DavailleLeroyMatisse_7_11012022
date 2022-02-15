import React, { useState, useEffect, useContext } from 'react';
import { UidContext } from '../AppContext';
import Trash from '../../media/icons/trash.png';
import axios from 'axios';
import Comment from '../Home/Comment';

const AllPost = () => {
	const [posts, setPosts] = useState(null);
	const uid = useContext(UidContext);
	console.log(posts);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}api/post`, { withCredentials: true })
			.then((response) => {
				setPosts(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (!posts) return null;

	return (
		<>
			{posts.map((post) => {
				const date = post.createdAt;

				const deletePost = () => {
					axios
						.delete(`${process.env.REACT_APP_API_URL}api/post/${post.id}`, {
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
					if (uid === post.UserId) {
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
					<>
					<li key={post.id}>
						<div className='about__post'>
							<div className='info__container'>
								<img src={post.User.picture} alt='' />
								<p className='user__id'>{post.User.pseudo}</p>
							</div>
							<div className='timestamp__container'>
								<p className='timestamp'>{date}</p>
								{trashDisplay()}
							</div>
						</div>
						<div className='content__container'>
							<p className='info__text'>{post.text}</p>
							<div className='pic__container'>
								<img src={post.picture} alt='' />
							</div>
						</div>
					</li>
						<Comment listComments={post.Comments} postId={post.id}/>
					</>
				);
			})}
		</>
	);
};
export default AllPost;
