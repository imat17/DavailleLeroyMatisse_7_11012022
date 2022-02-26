import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OnePost from './OnePost';
import { useStateValue } from '../AppContext';

const AllPost = () => {
	const [{ posts }, dispatch] = useStateValue();

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}api/post`, { withCredentials: true })
			.then((res) => {
				dispatch({ action: 'updatePosts', data: res.data });
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
