import React from 'react';
import Logo from '../../media/icons/icon-left-font-min-nobg.png';
import Disconnect from './Disconnect';
import Arrow from './Arrow';

const Header = (props) => {
	const { disconnectDisplay } = props;
	const { arrowDisplay } = props;
	return (
		<header>
			{arrowDisplay && <Arrow />}
			<div className='container__img'>
				<img src={Logo} alt='logo groupomania' />
			</div>
			{disconnectDisplay && <Disconnect />}
		</header>
	);
};

export default Header;
