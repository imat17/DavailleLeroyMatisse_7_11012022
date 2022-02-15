import React from 'react';
import Header from '../components/Header/Header';
import PostBar from '../components/Home/PostBar';
import Thread from '../components/Home/Thread';

const Home = () => {
	return (
		<>
			<div className='container__global'>
				<Header disconnectDisplay={true} arrowDisplay={false} profilePreviewDisplay={true} />
			</div>
			<PostBar />
			<Thread />
		</>
	);
};

export default Home;
