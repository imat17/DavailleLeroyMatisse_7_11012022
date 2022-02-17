import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OnePost from './OnePost';

const AllPost = () => {
	const [posts, setPosts] = useState(null);
	// console.log(posts);

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
				return <OnePost postInfo={post} key={post.id} />;
			})}
		</>
	);
};
export default AllPost;
