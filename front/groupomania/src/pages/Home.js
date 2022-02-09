import React from 'react';
import Header from '../components/Header';
import PostBar from '../components/Home/PostBar';
import AllPost from '../components/Home/AllPost';
import Thread from '../components/Home/Thread';

const Home = () => {
	return (
		<>
			<Header />
			<PostBar />
			<Thread />
		</>
	);
};

export default Home;
