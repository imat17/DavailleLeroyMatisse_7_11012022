import React from 'react';
import { NavLink } from 'react-router-dom';
import leftArrow from '../../media/icons/left-arrow.svg';

const Arrow = () => {
	return (
		<NavLink to='/home'>
			<div className='arrow'>
				<img src={leftArrow} alt='back to arrow' />
			</div>
		</NavLink>
	);
};

export default Arrow;
