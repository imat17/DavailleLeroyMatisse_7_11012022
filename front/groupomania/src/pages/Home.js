import React from 'react';
import Header from '../components/Header';
import PostBar from '../components/Home/PostBar';
import Thread from '../components/Home/Thread';

const Home = () => {
	return (
		<>
			<Header disconnectDisplay = {true}/>
			<PostBar />
			<Thread />
		</>
	);
};

export default Home;
