import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../pages/Home';
import Profile from '../../pages/Profile';
import Connect from '../../pages/Auth';

// Configuration du router
const index = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Connect />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/home' element={<Home />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</BrowserRouter>
	);
};

export default index;
