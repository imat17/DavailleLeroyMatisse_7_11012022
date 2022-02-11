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
				const date = post.createdAt;
				return (
					<li key={post.id}>
						<div className='about__post'>
							<div className='info__container'>
								<img src={post.User.picture} alt='' />
								<p className='user__id'>{post.User.pseudo}</p>
							</div>
							<div className='timestamp__container'>
								<p className='timestamp'>{date}</p>
							</div>
						</div>
						<div className='content__container'>
							<p className='info__text'>{post.text}</p>
							<div className='pic__container'>
								<img src={post.picture} alt='' />
							</div>
						</div>
					</li>
				);
			})}
		</>
	);
};
export default AllPost;
