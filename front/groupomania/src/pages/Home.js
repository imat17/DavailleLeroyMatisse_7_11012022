import React from 'react';
import Header from '../components/Header/Header';
import PostBar from '../components/Home/PostBar';
import Thread from '../components/Home/Thread';
import ProfilePreview from '../components/Home/ProfilePreview';

const Home = () => {
	return (
		<>
			<div className='container__global'>
				<Header disconnectDisplay={true} arrowDisplay={false}/>
			</div>
			<PostBar />
			<ProfilePreview />
			<Thread />
		</>
	);
};

export default Home;
