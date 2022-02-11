// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const GetId = () => {
// 	const [userId, setUserId] = useState();

// 	useEffect(() => {
// 		axios
// 			.get(`${process.env.REACT_APP_API_URL}jwtid`, { withCredentials: true })
// 			.then((response) => {
// 				console.log(response);
// 				setUserId(response);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}, []);

// 	if (!userId) return null;

// 	return <div></div>;
// };

// export default GetId;

// import React from 'react';
// import axios from 'axios';

// const getId = () => {
// 	axios
// 		.get(`${process.env.REACT_APP_API_URL}jwtid`, { withCredentials: true })
// 		.then((response) => {
// 			console.log(response);
// 			// setUserId(response);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});

// 	return <div></div>;
// };

// export default getId;
