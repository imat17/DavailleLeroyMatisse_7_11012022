import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllPost = () => {
	const [posts, setPosts] = useState(null);

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
				return (
					<li key={post.id}>
						<div className='profilepic__container'>
							<img src='' alt='' />
						</div>
						<p className='user__id'>{post.UserId}</p>
						<p className='timestamp'>{post.createdAt}</p>
						<div className='info__container'>
							<div className='pic__container'>
								<img src={post.picture} alt='' />
							</div>
							<p className='info__text'>{post.text}</p>
						</div>
					</li>
				);
			})}
		</>
	);
};
export default AllPost;
