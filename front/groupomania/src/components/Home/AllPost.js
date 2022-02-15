import React, { useState, useEffect, useContext } from 'react';
import { UidContext } from '../AppContext';
import axios from 'axios';
import OnePost from './OnePost';

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

	return <>
		{posts.map((post) => {
			return <OnePost postInfo={post} key={post.id}/>
		})}
		
	</>;
};
export default AllPost;
