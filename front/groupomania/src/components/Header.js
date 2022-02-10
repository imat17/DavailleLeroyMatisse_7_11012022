import React from 'react';
import Logo from '../media/icons/icon-left-font-min-nobg.png';
import Disconnect from '../components/Disconnect';

const Header = (props) => {
	const { disconnectDisplay } = props;
	return (
		<header>
			<div className='container__img'>
				<img src={Logo} alt='logo groupomania' />
			</div>
			{disconnectDisplay && <Disconnect />}
		</header>
	);
};

export default Header;
