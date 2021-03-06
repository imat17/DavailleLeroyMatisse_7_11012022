import React from 'react';
import Logo from '../../media/icons/icon-left-font-min-nobg.png';
import LogoMobile from '../../media/icons/icon.png';
import ProfilePreview from './ProfilePreview';
import Disconnect from './Disconnect';
import Arrow from './Arrow';

const Header = (props) => {
	const { disconnectDisplay } = props;
	const { arrowDisplay } = props;
	const { profilePreviewDisplay } = props;
	return (
		<header>
			{arrowDisplay && <Arrow />}

			<div className='container__img'>
				<img src={Logo} alt='logo groupomania' />
				<img src={LogoMobile} alt='logo groupomania' />
			</div>

			{profilePreviewDisplay && <ProfilePreview />}
			{disconnectDisplay && <Disconnect />}
		</header>
	);
};

export default Header;
