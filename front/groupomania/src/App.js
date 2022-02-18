import React, { useEffect, useState } from 'react';
import Routes from './components/Routes';
import { adminContext, UidContext } from './components/AppContext';
import axios from 'axios';

const App = () => {
	const [uid, setUid] = useState(null);
	const [admin, setAdmin] = useState(null);

	useEffect(() => {
		const getToken = async () => {
			await axios({
				method: 'get',
				url: `${process.env.REACT_APP_API_URL}jwtid`,
				withCredentials: true,
			})
				.then((res) => {
					setUid(res.data);
				})
				.catch();
		};
		getToken();
	}, [uid]);

	useEffect(() => {
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
			withCredentials: true,
		})
			.then((res) => {
				// console.log(res);
				setAdmin(res.data.isAdmin);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [admin, uid]);

	return (
		<UidContext.Provider value={uid}>
		<adminContext.Provider value={admin}>
			<Routes />
		</adminContext.Provider>
		</UidContext.Provider>
	);
};

export default App;
